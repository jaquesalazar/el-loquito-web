/* Pantalla de visualización y navegación de shorts*/

import { useCallback, useState } from 'react'
import { shortsData } from './data'
import { useShortsNavigation } from './hooks/useShortsNavigation'
import ShortPlayer from './components/ShortPlayer'
import ActionButtons from './components/ActionButtons'
import CommentsPanel from './components/CommentsPanel'
import ShortNavigator from './components/ShortNavigator'
import Toast from './components/Toast'
import './ShortsPage.css'

function ShortsPage({ onBackToProfile }) {
  const {
    currentIndex,
    direction,
    isFirst,
    isLast,
    nextShort,
    previousShort
  } = useShortsNavigation(shortsData.length)

  const [toastMessage, setToastMessage] = useState('')

  const currentShort = shortsData[currentIndex]

  const closeToast = useCallback(() => {
    setToastMessage('')
  }, [])

  function showToast(message) {
    setToastMessage(message)
  }

  function handleBackToProfile() {
    onBackToProfile?.()
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
          Short {currentIndex + 1} de {shortsData.length}
        </p>

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
