/* Cuadrícula de Shorts con estados de carga, error, vacío y conexión. */

import ShortCard from './ShortCard'
import OfflineBanner from '../../../shared/components/OfflineBanner'
import './ShortsGrid.css'

function ShortsGrid({ shorts = [], state = 'ready', onRetry }) {
  if (state === 'loading') {
    return (
      <section className="shorts-section" aria-label="Cargando shorts" aria-busy="true">
        <div className="shorts-grid">
          {[1, 2, 3].map((item) => (
            <div className="shorts-skeleton" key={item} aria-hidden="true">
              <div className="shorts-skeleton-image"></div>
              <div className="shorts-skeleton-line"></div>
              <div className="shorts-skeleton-line shorts-skeleton-line--short"></div>
            </div>
          ))}
        </div>
        <span className="shorts-sr-only" role="status">
          Cargando shorts
        </span>
      </section>
    )
  }

  if (state === 'error') {
    return (
      <section className="shorts-section shorts-state" role="alert">
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#DC4545"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <h2>No pudimos cargar los shorts</h2>
        <button type="button" className="shorts-retry-button" onClick={onRetry}>
          Reintentar
        </button>
      </section>
    )
  }

  if (state === 'empty' || (state === 'ready' && shorts.length === 0)) {
    return (
      <section className="shorts-section shorts-state">
        <svg
          width="52"
          height="52"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 27 15 8l13 11h8L49 8l3 19v12c0 12-9 19-20 19S12 51 12 39V27Z"
            fill="#6E8B3E"
          />
          <path
            d="m22 33 5 3m15-3-5 3M29 43l3 3 3-3"
            stroke="#ECE5D3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2>Aún no hay shorts</h2>
        <p>Cuando publique shorts, aparecerán aquí.</p>
      </section>
    )
  }

  if (state === 'offline') {
    return (
      <section className="shorts-section" aria-label="Shorts sin conexión">
        <OfflineBanner variant="inline" />
        <div className="shorts-offline-message">
          <p>Los shorts no están disponibles sin conexión.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="shorts-section" aria-label="Shorts del perfil">
      <div className="shorts-grid">
        {shorts.map((short) => (
          <ShortCard key={short.idVideo} short={short} />
        ))}
      </div>
    </section>
  )
}

export default ShortsGrid
