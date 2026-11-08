// Panel de comentarios reales y aleatorios de CatTube.

import { useEffect, useState } from 'react'
import { useRandomComments } from '../hooks/useRandomComments'
import { getComments, createComment } from '../commentsService'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import './CommentsPanel.css'

const CURRENT_USER_ID = 1

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

function mapComment(comment) {
  const isCreator = comment.idUsuario === CURRENT_USER_ID

  return {
    id: `db-${comment.idComentario}`,
    usuario: `@${comment.username.replace(/^@/, '')}`,
    esCreador: isCreator,
    avatar: isCreator ? '/images/Avatar.png' : null,
    createdAt: comment.createdAt,
    tiempo: '',
    texto: comment.texto,
    likes: 0
  }
}

function CommentsPanel({ shortId }) {
  const randomComments = useRandomComments(shortId)

  const [savedComments, setSavedComments] = useState([])
  const [replyTo, setReplyTo] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

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
        const response = await getComments(shortId)

        if (active) {
          setSavedComments(response.map(mapComment))
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

    loadComments()

    return () => {
      active = false
    }
  }, [shortId])

  const comments = [...savedComments, ...randomComments].map((comment) => ({
    ...comment,
    tiempo: comment.createdAt && currentTime
      ? formatCommentTime(comment.createdAt, currentTime)
      : comment.tiempo
  }))

  async function handleAddComment(message) {
    setError('')

    try {
      const response = await createComment(
        shortId,
        CURRENT_USER_ID,
        message
      )

      setSavedComments((previous) => [
        mapComment(response),
        ...previous
      ])

      setReplyTo('')
      return true
    } catch {
      setError('No se pudo publicar el comentario. Inténtalo nuevamente.')
      return false
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

      {isLoading && <p>Cargando comentarios...</p>}

      {error && <p role="alert">{error}</p>}

      <div className="comments-list">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>

      <CommentInput
        onAddComment={handleAddComment}
        replyTo={replyTo}
        onReplyHandled={handleReplyHandled}
      />
    </section>
  )
}

export default CommentsPanel
