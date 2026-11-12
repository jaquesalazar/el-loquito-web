// Servicio para identificar o registrar jugadores de CatTube.

import { apiRequest } from '../../shared/services/apiClient'

export async function loginPlayer(username) {
  console.log(JSON.stringify({ username }))
  return apiRequest('/usuarios/acceso', {
    method: 'POST',
    body: JSON.stringify({ username })
  })
}
