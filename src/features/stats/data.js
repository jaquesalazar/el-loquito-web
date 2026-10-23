/* Datos simulados del progreso de El loquito con estructura de respuesta de API */

export const mockStats = {
  followers: {
    total: 12480,
    history: [
      { date: '25 nov.', value: 10800 },
      { date: '26 nov.', value: 11350 },
      { date: '27 nov.', value: 11920 },
      { date: '28 nov.', value: 12480 },
    ],
  },

  influence: {
    total: 48600,
    history: [
      { day: 'Día 1', value: 8100 },
      { day: 'Día 2', value: 10500 },
      { day: 'Día 3', value: 13100 },
      { day: 'Día 4', value: 16900 },
    ],
  },

  money: {
    total: 864,
    history: [
      { date: '25 nov.', value: 144 },
      { date: '26 nov.', value: 192 },
      { date: '27 nov.', value: 240 },
      { date: '28 nov.', value: 288 },
    ],
  },

  cohesion: {
    inFavor: 680,
    against: 320,
    previousPercentage: 63.8,
  },
}

export async function getStats() {
  return structuredClone(mockStats)
}
