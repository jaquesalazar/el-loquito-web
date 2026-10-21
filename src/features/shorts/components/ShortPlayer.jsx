import { useState } from 'react'
import './ShortPlayer.css'

function ShortPlayer({ short }) {
  const [isPlaying, setIsPlaying] = useState(false)

  function togglePlay() {
    setIsPlaying((previous) => !previous)
  }

  return (
    <section
      className="short-player"
      aria-label={`Reproductor de ${short.titulo}`}
    >
      <div className="short-player-video">

        {/* Botón central de reproducción */}
        <button
          type="button"
          className="short-player-play"
          onClick={togglePlay}
          aria-label={
            isPlaying ? 'Pausar short' : 'Reproducir short'
          }
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="5" y="3" width="5" height="18" rx="1" />
              <rect x="14" y="3" width="5" height="18" rx="1" />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 4.5C7 3.7 7.9 3.2 8.6 3.6L20 10.8C20.8 11.3 20.8 12.7 20 13.2L8.6 20.4C7.9 20.8 7 20.3 7 19.5V4.5Z" />
            </svg>
          )}
        </button>

        {/* Información del short */}
        <div className="short-player-info">
          <p className="short-player-user">
            {short.usuario}
          </p>

          <h2 className="short-player-title">
            {short.titulo}
          </h2>

          <p className="short-player-description">
            {short.descripcion}
          </p>

          <div className="short-player-hashtags">
            {short.hashtags.map((hashtag) => (
              <span key={hashtag}>
                {hashtag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ShortPlayer