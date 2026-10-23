/* Menú lateral de CatTube con navegación y estado de conexión */

import './Sidebar.css'
import useOnlineStatus from '../hooks/useOnlineStatus'

function Sidebar({ currentPage, onNavigate }) {
  const isOnline = useOnlineStatus()

  return (
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

      <div className="sidebar-bottom">
        <button
          type="button"
          className="install-button"
          disabled
          title="Instalación disponible próximamente"
        >
          <span aria-hidden="true">↓</span>
          <span>Instalar app</span>
        </button>

        <div className="sidebar-divider"></div>

        <div className="sidebar-status" role="status" aria-live="polite">
          <span
            className={`status-dot ${isOnline ? '' : 'status-dot-offline'}`}
            aria-hidden="true"
          ></span>
          <span>{isOnline ? 'En línea' : 'Sin conexión'}</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
