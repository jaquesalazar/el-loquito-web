/* Gráfica de cohesión de la comunidad con porcentajes calculados automáticamente */

const GREEN = '#6E8B3E'
const GOLD = '#D9A441'
const RADIUS = 66
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CohesionChart({ inFavor = 0, against = 0 }) {
  const total = inFavor + against

  const favorPercentage = total > 0
    ? (inFavor / total) * 100
    : 0

  const againstPercentage = total > 0
    ? (against / total) * 100
    : 0

  const formatPercentage = (value) =>
    `${new Intl.NumberFormat('es-MX', {
      maximumFractionDigits: 1,
    }).format(value)} %`

  const favorLength = (favorPercentage / 100) * CIRCUMFERENCE

  return (
    <div className="cohesion-chart">
      <div className="cohesion-chart-content">
        <svg
          className="cohesion-chart-svg"
          viewBox="0 0 200 200"
          role="img"
          aria-label={`Cohesión de la comunidad de El loquito: ${formatPercentage(favorPercentage)} a favor y ${formatPercentage(againstPercentage)} en contra.`}
        >
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={GOLD}
            strokeWidth="24"
          />

          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke={GREEN}
            strokeWidth="24"
            strokeDasharray={`${favorLength} ${CIRCUMFERENCE}`}
            transform="rotate(-90 100 100)"
          />

          <text
            x="100"
            y="98"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#44581F"
          >
            {formatPercentage(favorPercentage)}
          </text>

          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontSize="14"
            fill="#6B5335"
          >
            activos
          </text>
        </svg>

        <div className="cohesion-chart-legend">
          <div className="cohesion-legend-item">
            <span
              className="cohesion-legend-dot"
              style={{ backgroundColor: GREEN }}
              aria-hidden="true"
            ></span>

            <span>A favor</span>

            <strong>{formatPercentage(favorPercentage)}</strong>
          </div>

          <div className="cohesion-legend-item">
            <span
              className="cohesion-legend-dot"
              style={{ backgroundColor: GOLD }}
              aria-hidden="true"
            ></span>

            <span>En contra</span>

            <strong>{formatPercentage(againstPercentage)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CohesionChart
