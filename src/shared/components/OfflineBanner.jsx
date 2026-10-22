/* Aviso reutilizable para los estados sin conexión de CatTube. */

import './OfflineBanner.css'

function OfflineBanner({
  message,
  variant = 'page',
}) {
  const isInline = variant === 'inline'

  const defaultMessage = isInline
    ? 'Sin conexión. Comprueba tu conexión a internet.'
    : 'Sin conexión'

  return (
    <div
      className={`offline-banner offline-banner--${isInline ? 'inline' : 'page'}`}
      role="status"
      aria-live="polite"
    >
      {isInline && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.86a10 10 0 0 1 14 0" />
          <path d="M8.5 16.43a5 5 0 0 1 7 0" />
          <path d="M12 20h.01" />
          <path d="M2 2l20 20" />
        </svg>
      )}

      <span>{message ?? defaultMessage}</span>
    </div>
  )
}

export default OfflineBanner
