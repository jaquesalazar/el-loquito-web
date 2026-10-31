/* Pantalla de reproducción de Shorts con soporte para contenido guardado sin conexión. */

import { useCallback, useState } from 'react'
import { useShortsNavigation } from './hooks/useShortsNavigation'
import usePlayerShorts from './hooks/usePlayerShorts'
import ShortPlayer from './components/ShortPlayer'
import ActionButtons from './components/ActionButtons'
import CommentsPanel from './components/CommentsPanel'
import ShortNavigator from './components/ShortNavigator'
import ErrorState from '../../shared/components/ErrorState'
import OfflineBanner from '../../shared/components/OfflineBanner'
import Toast from './components/Toast'
import './ShortsPage.css'

function ShortsPage({ onBackToProfile }) {
  const { shorts, status, retry } = usePlayerShorts()

  const {
    currentIndex,
    direction,
    isFirst,
    isLast,
    nextShort,
    previousShort
  } = useShortsNavigation(shorts.length)

  const [toastMessage, setToastMessage] = useState('')

  const currentShort = shorts[currentIndex]

  const closeToast = useCallback(() => {
    setToastMessage('')
  }, [])

  function showToast(message) {
    setToastMessage(message)
  }

  function handleBackToProfile() {
    onBackToProfile?.()
  }

  function renderContent() {
    if (status === 'loading') {
      return (
        <div
          className="shorts-player-state"
          role="status"
          aria-live="polite"
        >
          <span
            className="shorts-loading-spinner"
            aria-hidden="true"
          ></span>
          <p>Cargando shorts...</p>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="shorts-player-state">
          <ErrorState
            title="No pudimos cargar los shorts"
            description="Ocurrió un problema al reproducir los videos. Inténtalo nuevamente."
            onRetry={retry}
          />
        </div>
      )
    }

    if (status === 'empty' || shorts.length === 0) {
      return (
        <div className="shorts-player-state">
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
          <p>Cuando se publiquen videos, aparecerán aquí.</p>
        </div>
      )
    }

    if (!currentShort) {
      return null
    }

    return (
      <>
        {status === 'offline' && (
          <div className="offline-banner-spacing">
            <OfflineBanner variant="inline" />
          </div>
        )}

        <div className="shorts-page-layout">
          <div
            key={currentShort.id}
            className={`shorts-video-column shorts-slide-${direction}`}
          >
            <ShortPlayer short={currentShort} />

            <ActionButtons
              short={currentShort}
              onToast={showToast}
            />
          </div>

          <div
            key={`comments-${currentShort.id}`}
            className="shorts-comments-column"
          >
            <CommentsPanel shortId={currentShort.id} />
          </div>

          <ShortNavigator
            onPrevious={previousShort}
            onNext={nextShort}
            isFirst={isFirst}
            isLast={isLast}
          />
        </div>

        <p className="shorts-page-counter">
          Short {currentIndex + 1} de {shorts.length}
        </p>
      </>
    )
  }

  return (
    <main className="shorts-page">
      <div className="shorts-page-container">
        <button
          type="button"
          className="shorts-back-button"
          onClick={handleBackToProfile}
        >
          <span aria-hidden="true">←</span>
          Volver al perfil
        </button>

        {renderContent()}
      </div>

      <Toast
        key={toastMessage || 'empty'}
        message={toastMessage}
        onClose={closeToast}
      />
    </main>
  )
}

export default ShortsPage
