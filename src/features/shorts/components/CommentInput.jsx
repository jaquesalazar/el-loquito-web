
import { useRef, useState } from 'react'
import './CommentInput.css'

function CommentInput({
  onAddComment,
  replyTo = '',
  onReplyHandled
}) {
  const [message, setMessage] = useState('')
  const inputRef = useRef(null)

  const displayMessage = replyTo
    ? `${replyTo} ${message}`
    : message

  function handleChange(event) {
    const newValue = event.target.value

    if (replyTo) {
      const prefix = `${replyTo} `

      if (newValue.startsWith(prefix)) {
        setMessage(newValue.slice(prefix.length))
      } else {
        setMessage(newValue)
        onReplyHandled?.()
      }
    } else {
      setMessage(newValue)
    }
  }


  function handleSubmit(event) {
    event.preventDefault()

    const cleanMessage = displayMessage.trim()

    if (!cleanMessage) return

    onAddComment?.(cleanMessage)

    setMessage('')
    onReplyHandled?.()

    inputRef.current?.focus()
  }

  return (
    <form
      className="comment-input-form"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        className="comment-input-field"
        placeholder="Añade un comentario..."
        aria-label="Escribe un comentario"
        value={displayMessage}
        onChange={handleChange}
        maxLength={300}
      />

      <button
        type="submit"
        className="comment-send-button"
        aria-label="Enviar comentario"
        disabled={!displayMessage.trim()}
      >
        <svg
          viewBox="0 0 24 24"
          width="21"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </form>
  )
}

export default CommentInput
