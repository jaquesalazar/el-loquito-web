/* Gráfica SVG de seguidores del personaje con información accesible por día */

import { useState } from 'react'

const WIDTH = 480
const HEIGHT = 230
const LEFT = 58
const RIGHT = 18
const TOP = 22
const BOTTOM = 42
const MIN_Y = 10800
const MAX_Y = 12600

const formatNumber = (value) =>
  new Intl.NumberFormat('es-MX').format(value).replace(/,/g, '.')

function FollowersChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null)

  if (!data.length) {
    return (
      <div role="img" aria-label="No hay datos de seguidores disponibles">
        Sin datos disponibles
      </div>
    )
  }

  const plotWidth = WIDTH - LEFT - RIGHT
  const plotHeight = HEIGHT - TOP - BOTTOM

  const points = data.map((item, index) => {
    const x = LEFT + (index / Math.max(data.length - 1, 1)) * plotWidth
    const y = TOP + ((MAX_Y - item.value) / (MAX_Y - MIN_Y)) * plotHeight

    return { ...item, x, y }
  })

  const linePath = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`

    const previous = points[index - 1]
    const middleX = (previous.x + point.x) / 2

    return `${path} C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`
  }, '')

  const ticks = [10800, 11400, 12000, 12600]
  const activePoint = activeIndex === null ? null : points[activeIndex]

  const variation = activeIndex > 0
    ? points[activeIndex].value - points[activeIndex - 1].value
    : null

  return (
    <div className="followers-chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Evolución de seguidores de El loquito. Total actual: ${formatNumber(data[data.length - 1].value)} seguidores.`}
        className="stats-svg"
      >
        {ticks.map((tick) => {
          const y = TOP + ((MAX_Y - tick) / (MAX_Y - MIN_Y)) * plotHeight

          return (
            <g key={tick}>
              <line
                x1={LEFT}
                y1={y}
                x2={WIDTH - RIGHT}
                y2={y}
                stroke="#E8E8E8"
                strokeWidth="1"
              />
              <text
                x={LEFT - 10}
                y={y + 4}
                textAnchor="end"
                fill="#777"
                fontSize="12"
              >
                {(tick / 1000).toFixed(1).replace('.', ',')} mil
              </text>
            </g>
          )
        })}

        <path
          d={linePath}
          fill="none"
          stroke="#6E8B3E"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {points.map((point, index) => (
          <g key={`${point.date}-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#6E8B3E"
              stroke="#FFFFFF"
              strokeWidth="2"
              tabIndex="0"
              role="button"
              aria-label={`${point.date}: ${formatNumber(point.value)} seguidores`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            />
            <text
              x={point.x}
              y={HEIGHT - 12}
              textAnchor="middle"
              fill="#777"
              fontSize="12"
            >
              {point.date}
            </text>
          </g>
        ))}
      </svg>

      {activePoint && (
        <div className="stats-tooltip" role="status" aria-live="polite">
          <strong>{activePoint.date}</strong>
          <span>{formatNumber(activePoint.value)} seguidores</span>
          {variation !== null && (
            <span className={variation >= 0 ? 'stats-positive' : 'stats-negative'}>
              {variation > 0 ? '+' : ''}{formatNumber(variation)} respecto al día anterior
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default FollowersChart
