import { useState } from 'react'
import { useRandomComments } from '../hooks/useRandomComments'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import './CommentsPanel.css'

function CommentsPanel({ shortId }) {
  const randomComments = useRandomComments(shortId)

  const [addedComments, setAddedComments] = useState([])
  const [replyTo, setReplyTo] = useState('')

  const comments = [...addedComments, ...randomComments]

  function handleAddComment(message) {
    const newComment = {
      id: `new-${Date.now()}-${Math.random()}`,
      usuario: '@elloquito',
      tiempo: 'ahora',
      texto: message,
      likes: 0
    }

    setAddedComments((previous) => [
      newComment,
      ...previous
    ])

    setReplyTo('')
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
