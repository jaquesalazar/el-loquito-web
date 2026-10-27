/* Cuadrícula de Shorts con estados de carga, error, vacío y conexión. */

import ShortCard from './ShortCard'
import OfflineBanner from '../../../shared/components/OfflineBanner'
import ErrorState from '../../../shared/components/ErrorState'
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
      <section className="shorts-section">
        <ErrorState
          title="No pudimos cargar la página"
          description="Ocurrió un problema al cargar el perfil. Inténtalo nuevamente."
          onRetry={onRetry}
        />
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
