// Pantalla inicial para identificar al jugador de CatTube.

import { useState } from 'react'
import { loginPlayer } from './usernameService'
import './UsernamePage.css'

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
      const player = await loginPlayer(cleanUsername)
      onLogin(player)
    } catch {
      setError('No se pudo iniciar sesión. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="username-page">
      <div className="username-background" aria-hidden="true"></div>
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

        <span className="username-footer">
          EL LOQUITO · CAT TUBE
        </span>
      </section>
    </main>
  )
}

export default UsernamePage
