import { useEffect } from 'react'
import './Toast.css'

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return

    const timeout = setTimeout(() => {
      onClose?.()
    }, 2500)

    return () => clearTimeout(timeout)
  }, [message, onClose])

  if (!message) return null

  return (
    <div
      className="short-toast"
      role="status"
      aria-live="polite"
    >
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>

      <span>{message}</span>
    </div>
  )
}

export default Toast
