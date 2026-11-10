// Servicios para consultar los videos asignados y su progreso en CatTube.

import { apiRequest } from '../../shared/services/apiClient'

function mapVideo(video, progress) {
  return {
    id: video.idVideo,
    usuario: '@elloquito',
    titulo: video.titulo,
    descripcion: video.caption,
    hashtags: (video.hashtags || '')
      .split(/\s+/)
      .filter(Boolean)
      .map((hashtag) => hashtag.startsWith('#') ? hashtag : `#${hashtag}`),
    likes: progress.likesAutomaticos ?? 0,
    liked: progress.liked,
    totalLikes: progress.totalLikes ?? (
      (progress.likesAutomaticos ?? 0) + (progress.liked ? 1 : 0)
    ),
    vistas: progress.vistas ?? 0,
    videoUrl: video.videoUrl,
    comments: 0,
    shares: 0,
    tag: video.tag
  }
}

export async function getPlayerShorts(idUsuario) {
  if (!idUsuario) {
    throw new Error('Se necesita el ID del jugador.')
  }

  const videos = await apiRequest(`/usuarios/${idUsuario}/videos`)

  return Promise.all(
    videos.map(async (video) => {
      const progress = await apiRequest(
        `/usuarios/${idUsuario}/videos/${video.idVideo}/progreso`
      )

      return mapVideo(video, progress)
    })
  )
}

export async function getShorts(idUsuario) {
  return getPlayerShorts(idUsuario)
}

export async function updateVideoLike(idUsuario, idVideo, liked) {
  return apiRequest(
    `/usuarios/${idUsuario}/videos/${idVideo}/progreso/like`,
    {
      method: 'POST',
      body: JSON.stringify({ liked })
    }
  )
}

export async function registerVideoView(idUsuario, idVideo) {
  return apiRequest(
    `/usuarios/${idUsuario}/videos/${idVideo}/progreso/vistas`,
    {
      method: 'POST',
      body: JSON.stringify({ cantidad: 1 })
    }
  )
}
