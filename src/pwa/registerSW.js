/* Registro del Service Worker para habilitar las funciones PWA de CatTube. */

export function registerSW() {
  if (!('serviceWorker' in navigator)) {
    return
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js',
        {
          scope: '/'
        }
      )

      console.info(
        'Service Worker de CatTube registrado correctamente:',
        registration.scope
      )
    } catch (error) {
      console.error(
        'No se pudo registrar el Service Worker de CatTube:',
        error
      )
    }
  })
}
