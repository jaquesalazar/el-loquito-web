import ShortCard from './ShortCard'
import './ShortsGrid.css'

function ShortsGrid({ shorts }) {
  if (!shorts || shorts.length === 0) {
    return (
      <p className="shorts-empty">
        Aún no hay shorts.
      </p>
    )
  }

  return (
    <section className="shorts-section" aria-label="Shorts del perfil">
      <div className="shorts-grid">
        {shorts.map((short) => (
          <ShortCard
            key={short.idVideo}
            short={short}
          />
        ))}
      </div>
    </section>
  )
}

export default ShortsGrid