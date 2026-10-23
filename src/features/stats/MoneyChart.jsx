/* Gráfica SVG de ingresos diarios del personaje con moneda configurable */

import { useState } from 'react'
import { formatGameMoney } from './config'

const WIDTH = 480
const HEIGHT = 230
const LEFT = 58
const RIGHT = 18
const TOP = 22
const BOTTOM = 42
const MAX_Y = 60

function MoneyChart({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null)

  if (!data.length) {
    return (
      <div role="img" aria-label="No hay datos de ingresos disponibles">
        Sin datos disponibles
      </div>
    )
  }

  const plotWidth = WIDTH - LEFT - RIGHT
  const plotHeight = HEIGHT - TOP - BOTTOM
  const maxValue = Math.max(MAX_Y, ...data.map((item) => item.value))
  const axisMax = Math.ceil(maxValue / 20) * 20

  const points = data.map((item, index) => {
    const x = LEFT + (index / Math.max(data.length - 1, 1)) * plotWidth
    const y = TOP + plotHeight - (item.value / axisMax) * plotHeight

    return { ...item, x, y }
  })

  const linePath = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`

    const previous = points[index - 1]
    const middleX = (previous.x + point.x) / 2

    return `${path} C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`
  }, '')

  const baseline = TOP + plotHeight
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`

  const ticks = Array.from({ length: 4 }, (_, index) => (axisMax / 3) * index)
  const activePoint = activeIndex === null ? null : points[activeIndex]

  return (
    <div className="money-chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Ingresos diarios de El loquito. Total acumulado: ${formatGameMoney(data.reduce((sum, item) => sum + item.value, 0))}.`}
        className="stats-svg"
      >
        <defs>
          <linearGradient id="money-area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9A441" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D9A441" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {ticks.map((tick) => {
          const y = baseline - (tick / axisMax) * plotHeight

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
                {Math.round(tick)}
              </text>
            </g>
          )
        })}

        <path
          d={areaPath}
          fill="url(#money-area-gradient)"
        />

        <path
          d={linePath}
          fill="none"
          stroke="#D9A441"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {points.map((point, index) => (
          <g key={`${point.date}-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#D9A441"
              stroke="#FFFFFF"
              strokeWidth="2"
              tabIndex="0"
              role="button"
              aria-label={`${point.date}: ${formatGameMoney(point.value)} de ingresos`}
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
          <span>{formatGameMoney(activePoint.value)} de ingresos</span>
        </div>
      )}
    </div>
  )
}

export default MoneyChart
