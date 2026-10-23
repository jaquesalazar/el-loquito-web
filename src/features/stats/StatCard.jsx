/* Tarjeta reutilizable para mostrar estadísticas del videojuego El loquito */

function StatCard({
  title,
  value,
  badge,
  children,
  legend,
  className = '',
}) {
  return (
    <article className={`stat-card ${className}`.trim()}>
      <div className="stat-card-header">
        <h2 className="stat-card-title">{title}</h2>
        {badge && (
          <span className="stat-card-badge">{badge}</span>
        )}
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-chart">
        {children}
      </div>

      <p className="stat-card-legend">{legend}</p>
    </article>
  )
}

export default StatCard
