
// Servicio para consultar las estadísticas actuales y el historial de cada jugador.

import { apiRequest } from '../../shared/services/apiClient'

function formatDate(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  })
}

export async function getStats(idUsuario) {
  if (!idUsuario) {
    throw new Error('Se necesita el ID del jugador.')
  }

  const usuarios = await apiRequest('/usuarios')
  const jugador = usuarios.find(
    (usuario) => usuario.idUsuario === idUsuario
  )

  if (!jugador) {
    throw new Error('No se encontró al jugador.')
  }

  const historial = await apiRequest(
    `/usuarios/${idUsuario}/historial`
  )

  if (historial.length === 0) {
    return null
  }

  const history = historial.map((registro) => ({
    date: formatDate(registro.fecha),
    value: registro.seguidores,
  }))

  const moneyHistory = historial.map((registro) => ({
    date: formatDate(registro.fecha),
    value: registro.dinero,
  }))

  const cohesionHistory = historial.map((registro) => ({
    date: formatDate(registro.fecha),
    value: registro.cohesion,
  }))

  const latest = historial[historial.length - 1]
  const previous = historial.length > 1
    ? historial[historial.length - 2]
    : null

  return {
    followers: {
      total: jugador.seguidores,
      history,
    },
    money: {
      total: jugador.dinero,
      history: moneyHistory,
    },
    cohesion: {
      inFavor: latest.cohesion,
      against: 100 - latest.cohesion,
      previousPercentage: previous
        ? previous.cohesion
        : latest.cohesion,
      history: cohesionHistory,
    },
  }
}
