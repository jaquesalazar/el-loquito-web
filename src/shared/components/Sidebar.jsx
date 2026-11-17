/* Menú lateral de CatTube con navegación, estados de conexión y modal de descarga. */

import { useEffect, useState } from 'react'
import './Sidebar.css'
import useOnlineStatus from '../hooks/useOnlineStatus'
import useBackendStatus from '../hooks/useBackendStatus'

function Sidebar({ currentPage, onNavigate, username, onLogout }) {
  const isOnline = useOnlineStatus()
  const isBackendOnline = useBackendStatus()
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false)

  useEffect(() => {
    if (!isInstallModalOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsInstallModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isInstallModalOpen])

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <svg
              className="logo-cat"
              width="38"
              height="38"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 27L15 8L28 19H36L49 8L52 27V39C52 51 43 58 32 58C21 58 12 51 12 39V27Z"
                fill="#6E8B3E"
              />
              <path
                d="M22 33L27 36M42 33L37 36"
                stroke="#ECE5D3"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M29 43L32 46L35 43"
                stroke="#ECE5D3"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 45L10 43M20 49L10 50M44 45L54 43M44 49L54 50"
                stroke="#ECE5D3"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span className="logo-text">CatTube</span>
          </div>

          <div className="sidebar-player">
            <span className="sidebar-player-label">JUGADOR CONECTADO</span>
            <span className="sidebar-player-name" title={username}>
              {username}
            </span>
          </div>

          <nav className="sidebar-menu" aria-label="Menú principal">
            <button
              type="button"
              className={`menu-item ${currentPage === 'profile' ? 'active' : ''}`}
              aria-current={currentPage === 'profile' ? 'page' : undefined}
              onClick={() => onNavigate?.('profile')}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>
              <span>Perfil</span>
            </button>

            <button
              type="button"
              className={`menu-item ${currentPage === 'shorts' ? 'active' : ''}`}
              aria-current={currentPage === 'shorts' ? 'page' : undefined}
              onClick={() => onNavigate?.('shorts')}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="m10 8 6 4-6 4V8Z" />
              </svg>
              <span>Shorts</span>
            </button>

            <button
              type="button"
              className={`menu-item ${currentPage === 'statistics' ? 'active' : ''}`}
              aria-current={currentPage === 'statistics' ? 'page' : undefined}
              onClick={() => onNavigate?.('statistics')}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 20V11" />
                <path d="M10 20V4" />
                <path d="M16 20v-8" />
                <path d="M22 20V7" />
              </svg>
              <span>Estadísticas</span>
            </button>
          </nav>
        </div>

        <div className="mobile-account-tools">
          <div className="mobile-account-info">
            <span className="mobile-brand">CatTube</span>
            <span className="mobile-player-name" title={username}>
              {username}
            </span>

            <span className="mobile-player-status">
              <span
                className={`status-dot ${isOnline ? '' : 'status-dot-offline'}`}
                aria-hidden="true"
              ></span>
              {isOnline ? 'Internet conectado' : 'Sin Internet'}
            </span>

            <span className="mobile-player-status">
              <span
                className={`status-dot ${isBackendOnline ? '' : 'status-dot-offline'}`}
                aria-hidden="true"
              ></span>
              {isBackendOnline ? 'Servidor conectado' : 'Servidor desconectado'}
            </span>
          </div>

          <div className="mobile-account-actions">
            <button
              type="button"
              className="mobile-install-button"
              onClick={() => setIsInstallModalOpen(true)}
              aria-label="Instalar aplicación"
              title="Instalar aplicación"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 19h14" />
              </svg>
            </button>

            <button
              type="button"
              className="mobile-logout-button"
              onClick={onLogout}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2v10" />
                <path d="M6.2 5.8a9 9 0 1 0 11.6 0" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="install-button"
            onClick={() => setIsInstallModalOpen(true)}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">↓</span>
            <span>Instalar app</span>
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={onLogout}
          >
            <span aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v10" />
                <path d="M6.2 5.8a9 9 0 1 0 11.6 0" />
              </svg>
            </span>
            <span>Cerrar sesión</span>
          </button>

          <div className="sidebar-divider"></div>

          <div className="sidebar-status" role="status" aria-live="polite">
            <span
              className={`status-dot ${isOnline ? '' : 'status-dot-offline'}`}
              aria-hidden="true"
            ></span>
            <span>{isOnline ? 'Internet conectado' : 'Sin Internet'}</span>
          </div>

          <div className="sidebar-status" role="status" aria-live="polite">
            <span
              className={`status-dot ${isBackendOnline ? '' : 'status-dot-offline'}`}
              aria-hidden="true"
            ></span>
            <span>{isBackendOnline ? 'Servidor conectado' : 'Servidor desconectado'}</span>
          </div>
        </div>
      </aside>

      {isInstallModalOpen && (
        <div
          className="install-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsInstallModalOpen(false)
            }
          }}
        >
          <section
            className="install-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-modal-title"
            aria-describedby="install-modal-description"
          >
            <button
              type="button"
              className="install-modal-close"
              onClick={() => setIsInstallModalOpen(false)}
              aria-label="Cerrar ventana"
            >
              ×
            </button>

            <div className="install-modal-icon" aria-hidden="true">
              <svg
                viewBox="0 0 64 64"
                width="64"
                height="64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 27L15 8L28 19H36L49 8L52 27V39C52 51 43 58 32 58C21 58 12 51 12 39V27Z"
                  fill="#6E8B3E"
                />
                <path
                  d="M22 33L27 36M42 33L37 36"
                  stroke="#ECE5D3"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M29 43L32 46L35 43"
                  stroke="#ECE5D3"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="install-modal-eyebrow">CAT TUBE PARA ANDROID</span>

            <h2 id="install-modal-title">
              ¡Nuestra app ya está disponible!
            </h2>

            <p id="install-modal-description" className="install-modal-description">
              ¡El loquito también te acompaña en tu celular! Ya puedes descargar
              nuestra aplicación para Android.
            </p>

            <a
              className="install-modal-download"
              href="/downloads/app-release.apk"
              download="app-release.apk"
            >
              <span aria-hidden="true">↓</span>
              Descargar aplicación
            </a>

            <span className="install-modal-availability">
              Disponible para Android · Archivo APK
            </span>

            <div className="install-modal-warning">
              <span className="install-modal-warning-icon" aria-hidden="true">
                !
              </span>
              <p>
                Android podría solicitarte permiso para instalar aplicaciones
                descargadas fuera de Play Store. Esto es normal al instalar un
                archivo APK.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Sidebar
