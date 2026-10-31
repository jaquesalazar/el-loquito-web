
/* Service Worker de CatTube para almacenar recursos y comprobar la conexión. */

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

async function cacheVideo(request, response) {
  const contentLength = Number(response.headers.get('content-length') || 0)

  if (
    !response.ok ||
    response.status === 206 ||
    response.type === 'opaque' ||
    (contentLength && contentLength > MAX_VIDEO_SIZE)
  ) {
    return response
  }

  const cache = await caches.open(VIDEO_CACHE_NAME)
  await cache.put(request, response.clone())

  return response
}

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (url.origin !== self.location.origin) return

  if (url.pathname === '/connection-check.txt') {
  event.respondWith(
    (async () => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 1500)

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

  if (request.method !== 'GET') return

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

  if (request.destination === 'video') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(VIDEO_CACHE_NAME)
        const cachedResponse = await cache.match(request)

        if (cachedResponse) return cachedResponse

        try {
          const response = await fetch(request)
          return await cacheVideo(request, response)
        } catch {
          return Response.error()
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
