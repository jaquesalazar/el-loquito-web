// Servicios para consultar los videos asignados y su progreso en CatTube.

import { apiRequest } from '../../shared/services/apiClient'
import {
  addPendingView,
  getPendingViews,
  removePendingView
} from './viewsStorage'

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

function getShortsCacheKey(idUsuario) {
  return `cattube-shorts-metadata-${idUsuario}`
}

function getPendingLikesKey(idUsuario) {
  return `cattube-pending-likes-${idUsuario}`
}

function updateCachedLike(idUsuario, idVideo, liked) {
  try {
    const key = getShortsCacheKey(idUsuario)
    const shorts = JSON.parse(localStorage.getItem(key) || '[]')
    const updatedShorts = shorts.map((short) =>
      short.id === idVideo ? { ...short, liked } : short
    )

    localStorage.setItem(key, JSON.stringify(updatedShorts))
  } catch {
    return
  }
}

function savePendingLike(idUsuario, idVideo, liked) {
  try {
    const key = getPendingLikesKey(idUsuario)
    const pendingLikes = JSON.parse(localStorage.getItem(key) || '{}')

    pendingLikes[idVideo] = liked
    localStorage.setItem(key, JSON.stringify(pendingLikes))
    updateCachedLike(idUsuario, idVideo, liked)
  } catch {
    throw new Error('No se pudo guardar el me gusta pendiente.')
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
  try {
    const progress = await apiRequest(
      `/usuarios/${idUsuario}/videos/${idVideo}/progreso/like`,
      {
        method: 'POST',
        body: JSON.stringify({ liked })
      }
    )

    updateCachedLike(idUsuario, idVideo, progress.liked)
    return progress
  } catch (error) {
    if (!navigator.onLine || error instanceof TypeError) {
      savePendingLike(idUsuario, idVideo, liked)
      return { liked }
    }

    throw error
  }
}

export async function syncPendingLikes(idUsuario) {
  if (!idUsuario || !navigator.onLine) return

  const key = getPendingLikesKey(idUsuario)
  let pendingLikes

  try {
    pendingLikes = JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return
  }

  for (const [idVideo, liked] of Object.entries(pendingLikes)) {
    if (!navigator.onLine) return

    await apiRequest(
      `/usuarios/${idUsuario}/videos/${idVideo}/progreso/like`,
      {
        method: 'POST',
        body: JSON.stringify({ liked })
      }
    )

    updateCachedLike(idUsuario, Number(idVideo), liked)

    try {
      const currentPendingLikes = JSON.parse(localStorage.getItem(key) || '{}')

      if (currentPendingLikes[idVideo] === liked) {
        delete currentPendingLikes[idVideo]
        localStorage.setItem(key, JSON.stringify(currentPendingLikes))
      }
    } catch {
      return
    }
  }
}

export async function registerVideoView(idUsuario, idVideo) {
  try {
    return await apiRequest(
      `/usuarios/${idUsuario}/videos/${idVideo}/progreso/vistas`,
      {
        method: 'POST',
        body: JSON.stringify({ cantidad: 1 })
      }
    )
  } catch (error) {
    if (!navigator.onLine || error instanceof TypeError) {
      await addPendingView(idUsuario, idVideo)
      return null
    }

    throw error
  }
}

export async function syncPendingViews(idUsuario) {
  if (!idUsuario || !navigator.onLine) return

  const pendingViews = await getPendingViews(idUsuario)

  for (const view of pendingViews) {
    if (!navigator.onLine) return

    await apiRequest(
      `/usuarios/${view.userId}/videos/${view.videoId}/progreso/vistas`,
      {
        method: 'POST',
        body: JSON.stringify({ cantidad: 1 })
      }
    )

    await removePendingView(view.id)
  }
}
