// Service Worker de CatTube para almacenar recursos, videos y comprobar la conexión.

const CACHE_NAME = 'cattube-static-v1'
const VIDEO_CACHE_NAME = 'cattube-videos-v1'
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest'
]

const MAX_VIDEO_SIZE = 50 * 1024 * 1024

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      await Promise.all(
        cacheNames
          .filter((name) =>
            name.startsWith('cattube-static-') && name !== CACHE_NAME
          )
          .map((name) => caches.delete(name))
      )
      await self.clients.claim()
    })
  )
})

function createVideoResponse(response, range) {
  return response.arrayBuffer().then((buffer) => {
    const size = buffer.byteLength
    const headers = new Headers(response.headers)

    headers.delete('content-encoding')
    headers.delete('content-range')
    headers.set('accept-ranges', 'bytes')
    headers.set('content-length', String(size))

    if (!range) {
      return new Response(buffer, {
        status: 200,
        headers
      })
    }

    const match = range.match(/^bytes=(\d*)-(\d*)$/)

    if (!match) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${size}` }
      })
    }

    let start
    let end

    if (!match[1]) {
      const suffixLength = Number(match[2])
      start = Math.max(size - suffixLength, 0)
      end = size - 1
    } else {
      start = Number(match[1])
      end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
    }

    if (start >= size || start > end) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${size}` }
      })
    }

    const chunk = buffer.slice(start, end + 1)

    headers.set('content-range', `bytes ${start}-${end}/${size}`)
    headers.set('content-length', String(chunk.byteLength))

    return new Response(chunk, {
      status: 206,
      headers
    })
  })
}

async function handleVideoRequest(request) {
  const cache = await caches.open(VIDEO_CACHE_NAME)
  const cachedResponse = await cache.match(request.url)

  if (cachedResponse) {
    return createVideoResponse(
      cachedResponse,
      request.headers.get('range')
    )
  }

  try {
    const headers = new Headers(request.headers)
    headers.delete('range')

    const networkRequest = new Request(request.url, {
      method: 'GET',
      headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect
    })

    const response = await fetch(networkRequest)

    if (!response.ok || response.status !== 200 || response.type === 'opaque') {
      return response
    }

    const buffer = await response.arrayBuffer()

    if (buffer.byteLength > MAX_VIDEO_SIZE) {
      return new Response(buffer, {
        status: 200,
        headers: response.headers
      })
    }

    const fullHeaders = new Headers(response.headers)
    fullHeaders.delete('content-encoding')
    fullHeaders.delete('content-range')
    fullHeaders.set('content-length', String(buffer.byteLength))
    fullHeaders.set('accept-ranges', 'bytes')

    const fullResponse = new Response(buffer, {
      status: 200,
      headers: fullHeaders
    })

    await cache.put(request.url, fullResponse.clone())

    return createVideoResponse(
      fullResponse,
      request.headers.get('range')
    )
  } catch {
    return Response.error()
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  const isVideo =
    request.destination === 'video' ||
    /\.(mp4|webm|ogg)$/i.test(url.pathname)

  if (isVideo) {
    event.respondWith(handleVideoRequest(request))
    return
  }

  if (url.origin !== self.location.origin) return

  if (url.pathname === '/connection-check.txt') {
    event.respondWith(
      (async () => {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 4000)

        try {
          await fetch('https://connectivitycheck.gstatic.com/generate_204', {
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal
          })

          return new Response(null, { status: 204 })
        } catch {
          return new Response(null, { status: 503 })
        } finally {
          clearTimeout(timeout)
        }
      })()
    )
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request)

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME)
            await cache.put('/', response.clone())
          }

          return response
        } catch {
          const cache = await caches.open(CACHE_NAME)
          return (
            await cache.match('/') ||
            await cache.match('/index.html') ||
            await cache.match('/offline.html') ||
            Response.error()
          )
        }
      })()
    )
    return
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(request, {
        ignoreVary: true
      })

      if (cachedResponse) return cachedResponse

      try {
        return await fetch(request)
      } catch {
        return Response.error()
      }
    })()
  )
})
