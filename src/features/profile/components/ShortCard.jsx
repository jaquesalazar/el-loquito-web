import { useState } from 'react'
import './ShortCard.css'

function formatNumber(number) {
  if (number >= 1000) {
    return `${(number / 1000).toLocaleString('es-MX', {
      maximumFractionDigits: 1
    })} mil`
  }

  return number.toLocaleString('es-MX')
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function PawIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="5" cy="9" rx="2" ry="2.7" />
      <ellipse cx="10" cy="5.5" rx="2" ry="2.7" />
      <ellipse cx="15.5" cy="5.5" rx="2" ry="2.7" />
      <ellipse cx="20" cy="9" rx="2" ry="2.7" />
      <path d="M12 11c-2.2 0-3.5 1.6-4.8 3.2-1 1.2-2.4 2.3-2.4 4.1 0 1.7 1.4 2.7 3 2.7 1.5 0 2.7-.9 4.2-.9s2.7.9 4.2.9c1.6 0 3-1 3-2.7 0-1.8-1.4-2.9-2.4-4.1C15.5 12.6 14.2 11 12 11Z" />
    </svg>
  )
}

function ShortCard({ short }) {
  const [liked, setLiked] = useState(false)

  const totalLikes = short.likes + (liked ? 1 : 0)

  function handleLike() {
    setLiked((previousLiked) => !previousLiked)
  }

  return (
    <article className="short-card">
      <div className="short-thumbnail">
        <div
          className="short-placeholder"
          role="img"
          aria-label={`Miniatura provisional de ${short.titulo}`}
        >
          <span className="short-person-head"></span>
          <span className="short-person-body"></span>
        </div>

        <button
          type="button"
          className="short-play"
          aria-label={`Reproducir ${short.titulo}, próximamente`}
          disabled
        >
          ▶
        </button>

        <div className="short-metrics">
          <span className="short-views">
            <EyeIcon />
            {formatNumber(short.vistas)}
          </span>

          <button
            type="button"
            className={`short-like ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-pressed={liked}
            aria-label={
              liked
                ? `Quitar me gusta de ${short.titulo}`
                : `Dar me gusta a ${short.titulo}`
            }
          >
            <PawIcon />
            <span>{formatNumber(totalLikes)}</span>
          </button>
        </div>
      </div>

      <div className="short-details">
        <h3>{short.titulo}</h3>
        <p>{short.fechaTexto}</p>
      </div>
    </article>
  )
}

export default ShortCard