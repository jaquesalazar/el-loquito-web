// Reproductor de videos de CatTube con barra de progreso y registro de vistas individuales.

import { useEffect, useRef, useState } from 'react'
import {
  registerVideoView,
  syncPendingViews,
  syncPendingLikes
} from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'
import './ShortPlayer.css'

function ShortPlayer({ short, idUsuario }) {
  const videoRef = useRef(null)
  const viewRegisteredRef = useRef(false)
  const isOnline = useOnlineStatus()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!isOnline || !idUsuario) return

    syncPendingViews(idUsuario).catch(() => {})
    syncPendingLikes(idUsuario).catch(() => {})
  }, [isOnline, idUsuario])

  async function handlePlay() {
    setIsPlaying(true)

    if (viewRegisteredRef.current || !idUsuario) return

    viewRegisteredRef.current = true

    try {
      await registerVideoView(idUsuario, short.id)
    } catch {
      viewRegisteredRef.current = false
    }
  }

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

  function handleSeek(event) {
    const video = videoRef.current

    if (!video) return

    const newTime = Number(event.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  function handleVideoChange() {
    viewRegisteredRef.current = false
    setIsPlaying(false)
    setHasError(false)
    setCurrentTime(0)
    setDuration(0)
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
            crossOrigin="anonymous"
            src={short.videoUrl}
            playsInline
            preload="metadata"
            onPlay={handlePlay}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onEnded={() => setIsPlaying(false)}
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
          <input
            type="range"
            className="short-player-progress"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
            disabled={!duration}
            aria-label="Progreso del video"
            style={{
              '--progress': `${duration ? (currentTime / duration) * 100 : 0}%`
            }}
          />
        )}

        {short.videoUrl && !hasError && !isPlaying && (
          <button
            type="button"
            className="short-player-play"
            onClick={togglePlay}
            aria-label="Reproducir video"
            aria-pressed={false}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5C7 3.7 7.9 3.2 8.6 3.6L20 10.8C20.8 11.3 20.8 12.7 20 13.2L8.6 20.4C7.9 20.8 7 20.3 7 19.5V4.5Z" />
            </svg>
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
