/* Pantalla de Shorts con navegación y estados de carga, error y conexión. */

import { useCallback, useState } from 'react'
import { useShortsNavigation } from './hooks/useShortsNavigation'
import usePlayerShorts from './hooks/usePlayerShorts'
import ShortPlayer from './components/ShortPlayer'
import ActionButtons from './components/ActionButtons'
import CommentsPanel from './components/CommentsPanel'
import ShortNavigator from './components/ShortNavigator'
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
        <div className="shorts-player-state" role="status" aria-live="polite">
          <span className="shorts-loading-spinner" aria-hidden="true"></span>
          <p>Cargando shorts...</p>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="shorts-player-state" role="alert">
          <h2>No pudimos cargar los shorts</h2>
          <button
            type="button"
            className="shorts-player-retry"
            onClick={retry}
          >
            Reintentar
          </button>
        </div>
      )
    }

    if (status === 'offline') {
      return (
        <div className="shorts-player-state shorts-player-offline">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6E8B3E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h.01" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0" />
            <path d="M5 12.5a10 10 0 0 1 4-2" />
            <path d="M15 10.5a10 10 0 0 1 4 2" />
            <path d="M2 8.5a15 15 0 0 1 4-2.5" />
            <path d="M18 6a15 15 0 0 1 4 2.5" />
            <path d="M3 3 21 21" />
          </svg>

          <h2>Sin conexión a Internet</h2>
          <p>Comprueba tu conexión e inténtalo nuevamente.</p>

          <button
            type="button"
            className="shorts-player-retry"
            onClick={retry}
          >
            Reintentar
          </button>
        </div>
      )
    }

    if (status === 'empty' || !currentShort) {
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

    return (
      <>
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
