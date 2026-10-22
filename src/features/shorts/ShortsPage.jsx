/* Pantalla de Shorts con navegación y estados de carga, error y conexión. */

import { useCallback, useState } from 'react'
import { useShortsNavigation } from './hooks/useShortsNavigation'
import usePlayerShorts from './hooks/usePlayerShorts'
import ShortPlayer from './components/ShortPlayer'
import ActionButtons from './components/ActionButtons'
import CommentsPanel from './components/CommentsPanel'
import ShortNavigator from './components/ShortNavigator'
import Toast from './components/Toast'
import OfflineBanner from '../../shared/components/OfflineBanner'
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
        <div className="shorts-player-state">
          <OfflineBanner variant="inline" />
          <p>Los shorts no están disponibles sin conexión.</p>
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
