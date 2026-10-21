import './ShortNavigator.css'

function ShortNavigator({
  onPrevious,
  onNext,
  isFirst,
  isLast
}) {
  return (
    <nav
      className="short-navigator"
      aria-label="Navegación entre shorts"
    >
      <button
        type="button"
        className="short-nav-button"
        onClick={onPrevious}
        disabled={isFirst}
        aria-label="Ver short anterior"
        title="Short anterior"
      >
        <svg
          viewBox="0 0 24 24"
          width="25"
          height="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        className="short-nav-button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Ver siguiente short"
        title="Siguiente short"
      >
        <svg
          viewBox="0 0 24 24"
          width="25"
          height="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </nav>
  )
}

export default ShortNavigator
