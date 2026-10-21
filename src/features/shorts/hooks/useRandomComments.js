import { useMemo } from 'react'
import { commentsPool } from '../commentsData'

// Mezcla los comentarios con el algoritmo Fisher-Yates
function shuffleComments(comments) {
  const shuffled = [...comments]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i]
    ]
  }

  return shuffled
}

// Selecciona 15 comentarios
export function useRandomComments(shortId) {
  const comments = useMemo(() => {
    const shuffled = shuffleComments(commentsPool)

    return shuffled.slice(0, 15).map((comment) => ({
      ...comment,
      liked: false
    }))
  }, [shortId])

  return comments
}