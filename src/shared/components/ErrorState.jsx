import './ErrorState.css'

function ErrorState({ title, description, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon" aria-hidden="true">
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <h2 className="error-state-title">{title}</h2>

      <p className="error-state-description">
        {description}
      </p>

      <button
        type="button"
        className="error-state-button"
        onClick={onRetry}
      >
        Reintentar
      </button>
    </div>
  )
}

export default ErrorState
