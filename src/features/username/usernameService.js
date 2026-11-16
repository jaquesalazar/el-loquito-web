// Servicio para identificar, registrar y recuperar jugadores de CatTube.

import { apiRequest } from '../../shared/services/apiClient'

const PLAYERS_STORAGE_KEY = 'cattube-players'

function getSavedPlayers() {
  try {
    return JSON.parse(localStorage.getItem(PLAYERS_STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function savePlayer(player) {
  const players = getSavedPlayers()

  players[player.username.toLowerCase()] = player

  localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players))
}

export async function loginPlayer(username) {
  const cleanUsername = username.trim()

  try {
    const player = await apiRequest('/usuarios/acceso', {
      method: 'POST',
      body: JSON.stringify({ username: cleanUsername })
    })

    savePlayer(player)

    return player
  } catch (error) {
    const savedPlayers = getSavedPlayers()
    const savedPlayer = savedPlayers[cleanUsername.toLowerCase()]

   if ((!navigator.onLine || error instanceof TypeError) && savedPlayer) {
      return savedPlayer
    }

    throw error
  }
}
