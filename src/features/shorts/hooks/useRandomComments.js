
/* Hook para seleccionar 15 comentarios de forma estable según el Short actual. */

import { useMemo } from 'react'
import { commentsPool } from '../commentsData'

function getCommentScore(shortId, commentId) {
  const text = `${shortId}-${commentId}`
  let hash = 2166136261

  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

export function useRandomComments(shortId) {
  const comments = useMemo(() => {
    const shuffled = [...commentsPool].sort((a, b) => {
      return (
        getCommentScore(shortId, a.id) -
        getCommentScore(shortId, b.id)
      )
    })

    return shuffled.slice(0, 15).map((comment) => ({
      ...comment,
      liked: false
    }))
  }, [shortId])

  return comments
}
