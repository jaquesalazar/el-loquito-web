// Pantalla inicial para identificar al jugador de CatTube.

import { useState } from 'react'
import { loginPlayer } from './usernameService'
import './UsernamePage.css'
import LegalDocuments from '../../shared/components/LegalDocuments'

// Solicita permiso para mostrar notificaciones.
async function requestNotificationPermission() {
  if (
    !('Notification' in window) ||
    !('serviceWorker' in navigator)
  ) {
    return false
  }

  try {
    let permission = Notification.permission

    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }

    return permission === 'granted'
  } catch {
    return false
  }
}

// Muestra la notificación de bienvenida mediante el Service Worker existente.
async function showWelcomeNotification() {
  try {
    const registration = await navigator.serviceWorker.ready

    await registration.showNotification('¡Bienvenido a CatTube!', {
      body: 'Se ha iniciado sesión correctamente.',
      tag: 'cattube-welcome'
    })
  } catch (error) {
    console.warn('No se pudo mostrar la notificación:', error)
  }
}

// Genera una vibración cuando el inicio de sesión es exitoso.
function vibrateOnLogin() {
  if ('vibrate' in navigator) {
    navigator.vibrate(200)
  }
}

function UsernamePage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanUsername = username.trim()

    if (!cleanUsername) {
      setError('Escribe tu username para continuar.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const notificationAllowed = await requestNotificationPermission()
      const player = await loginPlayer(cleanUsername)

      if (notificationAllowed) {
        await showWelcomeNotification()
      }

      vibrateOnLogin()

      onLogin(player)
    } catch {
      setError('No se pudo iniciar sesión. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="username-page">
      <video
        className="username-background"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/video/wallpaper2.mp4" type="video/mp4" />
      </video>

      <div className="username-mobile-background" aria-hidden="true"></div>
      <div className="username-overlay" aria-hidden="true"></div>

      <section className="username-content">
        <div className="username-title">
          <span>They Are Not</span>
          <span>Pigeons</span>
        </div>

        <p className="username-subtitle">
          Tu historia comienza aquí
        </p>

        <form className="username-form" onSubmit={handleSubmit}>
          <label htmlFor="player-username">USERNAME</label>

          <input
            id="player-username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            maxLength={50}
            autoComplete="username"
            disabled={isLoading}
          />

          {error && (
            <p className="username-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <LegalDocuments />

        <span className="username-footer">
          EL LOQUITO · CAT TUBE
        </span>
      </section>
    </main>
  )
}

export default UsernamePage
