// Servicio para identificar o registrar jugadores de CatTube.

import { apiRequest } from '../../shared/services/apiClient'

export async function loginPlayer(username) {
  return apiRequest('/usuarios/acceso', {
    method: 'POST',
    body: JSON.stringify({ username })
  })
}
