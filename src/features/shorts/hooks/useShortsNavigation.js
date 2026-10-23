/* Hook para navegar entre Shorts mediante botones, teclado y rueda del mouse. */

import { useCallback, useEffect, useRef, useState } from 'react'

export function useShortsNavigation(totalShorts) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  const lastNavigationRef = useRef(0)

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
        const previousSafeIndex = Math.min(
          previousIndex,
          Math.max(0, totalShorts - 1)
        )

        if (newIndex === previousSafeIndex) {
          return previousSafeIndex
        }

        setDirection(newIndex > previousSafeIndex ? 'down' : 'up')

        return newIndex
      })
    },
    [totalShorts]
  )

  const nextShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      const previousSafeIndex = Math.min(
        previousIndex,
        Math.max(0, totalShorts - 1)
      )

      if (totalShorts === 0 || previousSafeIndex >= totalShorts - 1) {
        return previousSafeIndex
      }

      setDirection('down')
      return previousSafeIndex + 1
    })
  }, [totalShorts])

  const previousShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      const previousSafeIndex = Math.min(
        previousIndex,
        Math.max(0, totalShorts - 1)
      )

      if (previousSafeIndex <= 0) {
        return 0
      }

      setDirection('up')
      return previousSafeIndex - 1
    })
  }, [totalShorts])

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

  useEffect(() => {
    function handleWheel(event) {
      if (event.target instanceof Element) {
        if (event.target.closest('.comments-list')) {
          return
        }
      }

      if (Math.abs(event.deltaY) < 15) {
        return
      }

      const now = Date.now()

      if (now - lastNavigationRef.current < 650) {
        return
      }

      lastNavigationRef.current = now

      event.preventDefault()

      if (event.deltaY > 0) {
        nextShort()
      } else {
        previousShort()
      }
    }

    window.addEventListener('wheel', handleWheel, {
      passive: false
    })

    return () => {
      window.removeEventListener('wheel', handleWheel)
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
