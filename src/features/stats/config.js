
/* Configuración y formato de la moneda del videojuego El loquito */

export const CURRENCY = ''

export function formatGameMoney(value) {
  const amount = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return CURRENCY ? `${CURRENCY} ${amount}` : amount
}

export function getMoneyLegend() {
  return CURRENCY
    ? `Ingresos diarios en ${CURRENCY}`
    : 'Ingresos diarios (moneda del juego)'
}
