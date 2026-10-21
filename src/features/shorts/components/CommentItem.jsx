import { useState } from 'react'
import './CommentItem.css'

function CommentItem({ comment, onReply }) {
  const [liked, setLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const totalLikes = comment.likes + (liked ? 1 : 0)

  const initial = comment.usuario
    .replace('@', '')
    .charAt(0)
    .toUpperCase()

  function handleLike() {
    setLiked((previous) => !previous)
  }

  function handleReply() {
    onReply?.(comment.usuario)
  }

  return (
    <article className="comment-item">

      {}
      <div className="comment-avatar" aria-hidden="true">
        {initial}
      </div>

      {}
      <div className="comment-content">

        <div className="comment-header">
          <span className="comment-username">
            {comment.usuario}
          </span>

          <span className="comment-time">
            {comment.tiempo}
          </span>
        </div>

        <p className="comment-text">
          {comment.texto}
        </p>

        <div className="comment-footer">

          {}
          <button
            type="button"
            className="comment-reply-button"
            onClick={handleReply}
          >
            Responder
          </button>

          {}
          {comment.id === 1 && (
            <button
              type="button"
              className="comment-show-replies"
              onClick={() => setShowReplies((previous) => !previous)}
              aria-expanded={showReplies}
            >
              {showReplies
                ? 'Ocultar respuestas'
                : 'Ver 2 respuestas'}
            </button>
          )}
        </div>

        {}
        {comment.id === 1 && showReplies && (
          <div className="comment-replies">

            <div className="comment-reply">
              <strong>@miko</strong>
              <p>
                ¡Totalmente de acuerdo! 🐱
              </p>
            </div>

            <div className="comment-reply">
              <strong>@elloquito</strong>
              <p>
                Es el verdadero dueño de la casa.
              </p>
            </div>

          </div>
        )}
      </div>

      {}
      <div className="comment-like-container">
        <button
          type="button"
          className={`comment-like-button ${liked ? 'is-liked' : ''}`}
          onClick={handleLike}
          aria-label={
            liked
              ? `Quitar me gusta al comentario de ${comment.usuario}`
              : `Dar me gusta al comentario de ${comment.usuario}`
          }
          aria-pressed={liked}
        >
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
        </button>

        <span className="comment-like-count">
          {totalLikes}
        </span>
      </div>

    </article>
  )
}

export default CommentItem