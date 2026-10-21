import { useState } from 'react'
import './ActionButtons.css'

function formatNumber(number) {
  if (number >= 1000) {
    return `${(number / 1000).toLocaleString('es-MX', {
      maximumFractionDigits: 1
    })} mil`
  }

  return number.toLocaleString('es-MX')
}

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="5" cy="9" rx="2" ry="2.7" />
      <ellipse cx="10" cy="5.5" rx="2" ry="2.7" />
      <ellipse cx="15.5" cy="5.5" rx="2" ry="2.7" />
      <ellipse cx="20" cy="9" rx="2" ry="2.7" />
      <path d="M12 11c-2.2 0-3.5 1.6-4.8 3.2-1 1.2-2.4 2.3-2.4 4.1 0 1.7 1.4 2.7 3 2.7 1.5 0 2.7-.9 4.2-.9s2.7.9 4.2.9c1.6 0 3-1 3-2.7 0-1.8-1.4-2.9-2.4-4.1C15.5 12.6 14.2 11 12 11Z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4" />
    </svg>
  )
}


function BookmarkIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-5-7 5V4a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

function ActionButtons({ short, onToast }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const totalLikes = short.likes + (liked ? 1 : 0)

  function handleLike() {
    setLiked((previous) => !previous)
  }

  function handleSave() {
    const nextSaved = !saved

    setSaved(nextSaved)
    onToast?.(nextSaved ? 'Guardado' : 'Quitado de guardados')
  }

  async function handleShare() {
    const url = `${window.location.origin}/?short=${short.id}`

    try {
      await navigator.clipboard.writeText(url)
      onToast?.('Enlace copiado')
    } catch {
      onToast?.('No se pudo copiar el enlace')
    }
  }

  return (
    <div className="short-actions" aria-label="Acciones del short">

      {/* Like */}
      <div className="short-action-group">
        <button
          type="button"
          className={`short-action-button ${liked ? 'is-liked' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Quitar me gusta' : 'Dar me gusta'}
          aria-pressed={liked}
        >
          <PawIcon />
        </button>

        <span className="short-action-count">
          {formatNumber(totalLikes)}
        </span>
      </div>

      {/* Compartir */}
      <div className="short-action-group">
        <button
          type="button"
          className="short-action-button"
          onClick={handleShare}
          aria-label="Compartir short"
        >
          <ShareIcon />
        </button>

        <span className="short-action-label">
          Compartir
        </span>
      </div>

      {/* Guardar */}
      <div className="short-action-group">
        <button
          type="button"
          className={`short-action-button ${saved ? 'is-saved' : ''}`}
          onClick={handleSave}
          aria-label={saved ? 'Quitar de guardados' : 'Guardar short'}
          aria-pressed={saved}
        >
          <BookmarkIcon filled={saved} />
        </button>

        <span className="short-action-label">
          Guardar
        </span>
      </div>

    </div>
  )
}

export default ActionButtons