/* Service Worker de CatTube para almacenar recursos básicos y responder sin conexión. */

const CACHE_NAME = 'cattube-static-v1'

const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL)
    })
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith('cattube-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )

      await self.clients.claim()
    })
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request

  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request)
        } catch {
          const cachedPage = await caches.match(request)

          if (cachedPage) {
            return cachedPage
          }

          return (
            await caches.match('/offline.html') ||
            Response.error()
          )
        }
      })()
    )

    return
  }

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(request)

      if (cachedResponse) {
        return cachedResponse
      }

      try {
        return await fetch(request)
      } catch {
        return Response.error()
      }
    })()
  )
})
