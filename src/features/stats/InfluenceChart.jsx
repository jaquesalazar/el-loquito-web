/* Gráfica SVG de influencia del personaje con barras y valores accesibles */

import { useState } from 'react'

const WIDTH = 480
const HEIGHT = 230
const LEFT = 58
const RIGHT = 18
const TOP = 22
const BOTTOM = 42
const MAX_Y = 18000

const formatNumber = (value) =>
  new Intl.NumberFormat('es-MX').format(value).replace(/,/g, '.')

function InfluenceChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null)

  if (!data.length) {
    return (
      <div role="img" aria-label="No hay datos de influencia disponibles">
        Sin datos disponibles
      </div>
    )
  }

  const plotWidth = WIDTH - LEFT - RIGHT
  const plotHeight = HEIGHT - TOP - BOTTOM
  const slotWidth = plotWidth / data.length
  const barWidth = Math.min(slotWidth * 0.5, 54)

  const bars = data.map((item, index) => {
    const height = Math.max(0, Math.min(item.value / MAX_Y, 1)) * plotHeight
    const x = LEFT + index * slotWidth + (slotWidth - barWidth) / 2
    const y = TOP + plotHeight - height

    return { ...item, x, y, height }
  })

  const ticks = [0, 6000, 12000, 18000]
  const activeBar = activeIndex === null ? null : bars[activeIndex]

  return (
    <div className="influence-chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Influencia de El loquito durante ${data.length} días. Influencia acumulada: ${formatNumber(data.reduce((total, item) => total + item.value, 0))}.`}
        className="stats-svg"
      >
        {ticks.map((tick) => {
          const y = TOP + plotHeight - (tick / MAX_Y) * plotHeight

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
                {tick === 0 ? '0' : `${tick / 1000} mil`}
              </text>
            </g>
          )
        })}

        {bars.map((bar, index) => (
          <g key={`${bar.day}-${index}`}>
            <rect
              x={bar.x}
              y={bar.y}
              width={barWidth}
              height={bar.height}
              rx="4"
              fill={index === bars.length - 1 ? '#44581F' : '#6E8B3E'}
              tabIndex="0"
              role="button"
              aria-label={`${bar.day}: ${formatNumber(bar.value)} puntos de influencia`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            />
            <text
              x={bar.x + barWidth / 2}
              y={HEIGHT - 12}
              textAnchor="middle"
              fill="#777"
              fontSize="12"
            >
              {bar.day}
            </text>
          </g>
        ))}
      </svg>

      {activeBar && (
        <div className="stats-tooltip" role="status" aria-live="polite">
          <strong>{activeBar.day}</strong>
          <span>{formatNumber(activeBar.value)} puntos de influencia</span>
        </div>
      )}
    </div>
  )
}

export default InfluenceChart
