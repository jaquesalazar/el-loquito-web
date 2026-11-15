// Hook para navegar entre Shorts mediante botones y teclado.

import { useCallback, useEffect, useState } from 'react'

export function useShortsNavigation(totalShorts, initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(0, totalShorts - 1))
  )
  const [direction, setDirection] = useState('down')

  const safeIndex = Math.min(
    currentIndex,
    Math.max(0, totalShorts - 1)
  )

  const isFirst = safeIndex === 0
  const isLast = totalShorts === 0 || safeIndex >= totalShorts - 1

  const goToShort = useCallback(
    (newIndex) => {
      if (newIndex < 0 || newIndex >= totalShorts) {
        return
      }

      setCurrentIndex((previousIndex) => {
        if (newIndex === previousIndex) {
          return previousIndex
        }

        setDirection(newIndex > previousIndex ? 'down' : 'up')
        return newIndex
      })
    },
    [totalShorts]
  )

  const nextShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      if (totalShorts === 0 || previousIndex >= totalShorts - 1) {
        return previousIndex
      }

      setDirection('down')
      return previousIndex + 1
    })
  }, [totalShorts])

  const previousShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex <= 0) {
        return 0
      }

      setDirection('up')
      return previousIndex - 1
    })
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      const element = event.target

      if (
        element instanceof HTMLElement &&
        (
          element.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)
        )
      ) {
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        nextShort()
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        previousShort()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextShort, previousShort])

  return {
    currentIndex: safeIndex,
    direction,
    isFirst,
    isLast,
    goToShort,
    nextShort,
    previousShort
  }
}
