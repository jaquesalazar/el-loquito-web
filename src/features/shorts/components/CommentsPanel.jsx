// Panel de comentarios reales y aleatorios de CatTube.

import { useEffect, useState } from 'react'
import { useRandomComments } from '../hooks/useRandomComments'
import { getComments, createComment, deleteComment } from '../commentsService'
import {
  getStoredComments,
  getPendingComments,
  saveStoredComments,
  addPendingComment,
  markCommentForDeletion,
  removeStoredComment,
  removePendingComment
} from '../commentsStorage'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'
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
  return {
    ...comment,
    id: `real-${idUsuario}-${comment.idComentario ?? comment.id}`,
    idComentario: comment.idComentario,
    idUsuario: comment.idUsuario,
    usuario: `@${(comment.username || 'jugador').replace(/^@/, '')}`,
    esCreador: Number(comment.idUsuario) === Number(idUsuario),
    avatar: Number(comment.idUsuario) === Number(idUsuario)
      ? '/images/Avatar.webp'
      : null,
    createdAt: comment.createdAt,
    tiempo: '',
    texto: comment.texto,
    likes: 0,
    pendiente: Boolean(comment.pendingCreate)
  }
}

function CommentsPanel({ shortId, idUsuario }) {
  const randomComments = useRandomComments(shortId)
  const isOnline = useOnlineStatus()

  const [savedComments, setSavedComments] = useState([])
  const [replyTo, setReplyTo] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCurrentTime(Date.now()), 0)
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000)

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
        const localComments = await getStoredComments(shortId, idUsuario)

        if (!active) return

        setSavedComments(
          localComments.map(comment => mapComment(comment, idUsuario))
        )
        if (!isOnline) {
          return
        }
        try {
          const response = await getComments(shortId, idUsuario)

          if (!active) return

          await saveStoredComments(shortId, idUsuario, response)

          const updatedLocalComments = await getStoredComments(shortId, idUsuario)

          if (!active) return

          setSavedComments(
            updatedLocalComments.map(comment => mapComment(comment, idUsuario))
          )
        } catch {
          if (active && localComments.length === 0) {
            setError('No se pudieron cargar los comentarios.')
          }
        }
      } catch {
        if (active) {
          setError('No se pudo acceder al almacenamiento local.')
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    if (idUsuario) loadComments()

    return () => {
      active = false
    }
  }, [shortId, idUsuario, isOnline])

  useEffect(() => {
    if (!isOnline || !idUsuario) return

    let active = true

    async function syncPendingComments() {
      try {
        const pendingComments = await getPendingComments(shortId, idUsuario)

        for (const comment of pendingComments) {
          if (!active) return

          if (comment.pendingCreate) {
            const response = await createComment(shortId, idUsuario, comment.texto)
            await removePendingComment(comment.id)
            await saveStoredComments(shortId, idUsuario, [response])
          } else if (comment.pendingDelete) {
            await deleteComment(shortId, comment.idComentario, idUsuario)
            await removeStoredComment(comment.idComentario, shortId, idUsuario)
          }
        }

        const response = await getComments(shortId, idUsuario)
        await saveStoredComments(shortId, idUsuario, response)

        const updated = await getStoredComments(shortId, idUsuario)

        if (active) {
          setSavedComments(
            updated.map(comment => mapComment(comment, idUsuario))
          )
        }
      } catch {
        if (active) {
          setError('Algunos cambios siguen pendientes de sincronización.')
        }
      }
    }

    syncPendingComments()

    return () => {
      active = false
    }
  }, [isOnline, shortId, idUsuario])

  const comments = [...savedComments, ...randomComments].map(comment => ({
    ...comment,
    tiempo: comment.createdAt && currentTime
      ? formatCommentTime(comment.createdAt, currentTime)
      : comment.tiempo
  }))

  async function handleAddComment(message) {
    setError('')

    const localComment = {
      idUsuario,
      username: 'jugador',
      texto: message,
      createdAt: new Date().toISOString(),
      likes: 0
    }

    try {
      if (isOnline) {
        try {
          const response = await createComment(shortId, idUsuario, message)
          await saveStoredComments(shortId, idUsuario, [response])
          setSavedComments(previous => [
            mapComment(response, idUsuario),
            ...previous
          ])
        } catch {
          await addPendingComment(shortId, idUsuario, localComment)
          const updated = await getStoredComments(shortId, idUsuario)
          setSavedComments(
            updated.map(comment => mapComment(comment, idUsuario))
          )
        }
      } else {
        await addPendingComment(shortId, idUsuario, localComment)
        const updated = await getStoredComments(shortId, idUsuario)
        setSavedComments(
          updated.map(comment => mapComment(comment, idUsuario))
        )
      }

      setReplyTo('')
      return true
    } catch {
      setError('No se pudo guardar el comentario.')
      return false
    }
  }

  async function handleDeleteComment() {
    if (!commentToDelete || isDeleting) return

    setIsDeleting(true)
    setError('')

    try {
      if (commentToDelete.pendiente) {
        await removePendingComment(commentToDelete.id)
      } else if (isOnline) {
        try {
          await deleteComment(shortId, commentToDelete.idComentario, idUsuario)
          await removeStoredComment(
            commentToDelete.idComentario,
            shortId,
            idUsuario
          )
        } catch {
          await markCommentForDeletion(
            commentToDelete.idComentario,
            shortId,
            idUsuario
          )
        }
      } else {
        await markCommentForDeletion(
          commentToDelete.idComentario,
          shortId,
          idUsuario
        )
      }

      const updated = await getStoredComments(shortId, idUsuario)
      setSavedComments(
        updated.map(comment => mapComment(comment, idUsuario))
      )
      setCommentToDelete(null)
    } catch {
      setError('No se pudo eliminar el comentario localmente.')
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
    <section className="comments-panel" aria-label="Comentarios del short">
      <header className="comments-panel-header">
        <h2>Comentarios</h2>
        <span className="comments-panel-count">{comments.length}</span>
      </header>

      {!idUsuario && <p role="alert">No se pudo identificar al jugador.</p>}

      {isLoading && idUsuario && <p>Cargando comentarios...</p>}

      {!isOnline && (
        <div className="comments-offline-alert" role="status">
          <span className="comments-offline-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 16.2A4.5 4.5 0 0 1 6.5 7.5 6 6 0 0 1 18 9.2a3.5 3.5 0 0 1 .5 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M4 4l16 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className="comments-offline-message">
            <strong>Estás sin conexión</strong>
            <span>Se muestran los comentarios guardados en tu dispositivo.</span>
          </span>
        </div>
      )}

      {error && <p role="alert">{error}</p>}

      <div className="comments-list">
        {comments.map(comment => (
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
          onClick={event => {
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
            <div className="delete-confirm-icon" aria-hidden="true">🐾</div>
            <h3 id="delete-confirm-title">¿Eliminar comentario?</h3>
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