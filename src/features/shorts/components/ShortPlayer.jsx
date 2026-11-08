/* Reproductor de videos de CatTube. */

import { useRef, useState } from 'react'
import './ShortPlayer.css'

function ShortPlayer({ short }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  async function togglePlay() {
    const video = videoRef.current

    if (!video || hasError) return

    if (video.paused) {
      try {
        await video.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      video.pause()
    }
  }

  function handleVideoChange() {
    setIsPlaying(false)
    setHasError(false)
  }

  return (
    <section
      className="short-player"
      aria-label={`Reproductor de ${short.titulo}`}
    >
      <div className="short-player-video">
        {short.videoUrl && (
          <video
            key={short.videoUrl}
            ref={videoRef}
            className="short-player-media"
            src={short.videoUrl}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setHasError(true)
              setIsPlaying(false)
            }}
            onLoadStart={handleVideoChange}
          />
        )}

        {hasError && (
          <p className="short-player-error">
            No se pudo cargar este video.
          </p>
        )}

        {!short.videoUrl && (
          <p className="short-player-error">
            Este video no tiene una dirección disponible.
          </p>
        )}

        {short.videoUrl && !hasError && (
          <button
            type="button"
            className="short-player-play"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            aria-pressed={isPlaying}
          >
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5C7 3.7 7.9 3.2 8.6 3.6L20 10.8C20.8 11.3 20.8 12.7 20 13.2L8.6 20.4C7.9 20.8 7 20.3 7 19.5V4.5Z" />
              </svg>
            )}
          </button>
        )}

        <div className="short-player-info">
          <p className="short-player-user">{short.usuario}</p>

          <h2 className="short-player-title">{short.titulo}</h2>

          <p className="short-player-description">{short.descripcion}</p>

          <div className="short-player-hashtags">
            {short.hashtags.map((hashtag) => (
              <span key={hashtag}>{hashtag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShortPlayer
