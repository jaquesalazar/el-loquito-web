// Servicios para consultar los videos de CatTube.

import { apiRequest } from '../../shared/services/apiClient'

function mapVideo(video) {
  return {
    id: video.idVideo,
    usuario: '@elloquito',
    titulo: video.titulo,
    descripcion: video.caption,
    hashtags: (video.hashtags || '')
      .split(/\s+/)
      .filter(Boolean)
      .map((hashtag) => hashtag.startsWith('#') ? hashtag : `#${hashtag}`),
    likes: video.likes ?? 0,
    vistas: video.vistas ?? 0,
    videoUrl: video.videoUrl,
    comments: video.comments ?? 0,
    shares: video.shares ?? 0,
    tag: video.tag
  }
}

export async function getShorts() {
  const videos = await apiRequest('/videos')
  return videos.map(mapVideo)
}

export async function getPlayerShorts() {
  return getShorts()
}
