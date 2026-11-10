// Panel de comentarios reales y aleatorios de CatTube.

import { useEffect, useState } from 'react'
import { useRandomComments } from '../hooks/useRandomComments'
import { getComments, createComment, deleteComment } from '../commentsService'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import './CommentsPanel.css'

function formatCommentTime(createdAt, currentTime) {
  const date = new Date(createdAt)

  if (Number.isNaN(date.getTime())) return ''

  const difference = currentTime - date.getTime()
  const minutes = Math.floor(difference / 60000)
  const hours = Math.floor(difference / 3600000)
  const days = Math.floor(difference / 86400000)

  if (minutes < 1) return 'ahora'
  if (minutes < 60) return `hace ${minutes} min`
  if (hours < 24) return `hace ${hours} h`
  if (days < 7) return days === 1 ? 'hace 1 día' : `hace ${days} días`

  return date.toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function mapComment(comment, idUsuario) {
  const isCreator = comment.idUsuario === idUsuario

  return {
    id: `db-${comment.idComentario}`,
    idComentario: comment.idComentario,
    idUsuario: comment.idUsuario,
    usuario: `@${comment.username.replace(/^@/, '')}`,
    esCreador: isCreator,
    avatar: isCreator ? '/images/Avatar.png' : null,
    createdAt: comment.createdAt,
    tiempo: '',
    texto: comment.texto,
    likes: 0
  }
}

function CommentsPanel({ shortId, idUsuario }) {
  const randomComments = useRandomComments(shortId)

  const [savedComments, setSavedComments] = useState([])
  const [replyTo, setReplyTo] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentTime(Date.now())
    }, 0)

    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadComments() {
      setIsLoading(true)
      setError('')

      try {
        const response = await getComments(shortId, idUsuario)

        if (active) {
          setSavedComments(response.map((comment) => mapComment(comment, idUsuario)))
        }
      } catch {
        if (active) {
          setError('No se pudieron cargar los comentarios guardados.')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    if (idUsuario) {
      loadComments()
    }

    return () => {
      active = false
    }
  }, [shortId, idUsuario])

  const comments = [...savedComments, ...randomComments].map((comment) => ({
    ...comment,
    tiempo: comment.createdAt && currentTime
      ? formatCommentTime(comment.createdAt, currentTime)
      : comment.tiempo
  }))

  async function handleAddComment(message) {
    setError('')

    try {
      const response = await createComment(shortId, idUsuario, message)

      setSavedComments((previous) => [
        mapComment(response, idUsuario),
        ...previous
      ])

      setReplyTo('')
      return true
    } catch {
      setError('No se pudo publicar el comentario. Inténtalo nuevamente.')
      return false
    }
  }

  async function handleDeleteComment() {
    if (!commentToDelete || isDeleting) return

    setIsDeleting(true)
    setError('')

    try {
      await deleteComment(shortId, commentToDelete.idComentario, idUsuario)

      setSavedComments((previous) =>
        previous.filter((comment) =>
          comment.idComentario !== commentToDelete.idComentario
        )
      )

      setCommentToDelete(null)
    } catch {
      setError('No se pudo eliminar el comentario.')
    } finally {
      setIsDeleting(false)
    }
  }

  function handleReply(username) {
    setReplyTo(username)
  }

  function handleReplyHandled() {
    setReplyTo('')
  }

  return (
    <section
      className="comments-panel"
      aria-label="Comentarios del short"
    >
      <header className="comments-panel-header">
        <h2>Comentarios</h2>

        <span className="comments-panel-count">
          {comments.length}
        </span>
      </header>

      {!idUsuario && <p role="alert">No se pudo identificar al jugador.</p>}

      {isLoading && idUsuario && <p>Cargando comentarios...</p>}

      {error && <p role="alert">{error}</p>}

      <div className="comments-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={setCommentToDelete}
          />
        ))}
      </div>

      <CommentInput
        onAddComment={handleAddComment}
        replyTo={replyTo}
        onReplyHandled={handleReplyHandled}
      />

      {commentToDelete && (
        <div
          className="delete-confirm-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setCommentToDelete(null)
            }
          }}
        >
          <div
            className="delete-confirm-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
            aria-describedby="delete-confirm-description"
          >
            <div className="delete-confirm-icon" aria-hidden="true">
              🐾
            </div>

            <h3 id="delete-confirm-title">
              ¿Eliminar comentario?
            </h3>

            <p id="delete-confirm-description">
              ¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.
            </p>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="delete-confirm-cancel"
                onClick={() => setCommentToDelete(null)}
                disabled={isDeleting}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="delete-confirm-accept"
                onClick={handleDeleteComment}
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CommentsPanel
