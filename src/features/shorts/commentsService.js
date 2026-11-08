// Servicios para consultar, publicar y eliminar comentarios de CatTube.

import { apiRequest } from '../../shared/services/apiClient'

export function getComments(videoId) {
  return apiRequest(`/videos/${videoId}/comentarios`)
}

export function createComment(videoId, idUsuario, texto) {
  return apiRequest(`/videos/${videoId}/comentarios`, {
    method: 'POST',
    body: JSON.stringify({ idUsuario, texto })
  })
}

export function deleteComment(videoId, commentId, userId) {
  return apiRequest(
    `/videos/${videoId}/comentarios/${commentId}?idUsuario=${userId}`,
    { method: 'DELETE' }
  )
}
