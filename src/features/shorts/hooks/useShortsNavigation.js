import { useCallback, useEffect, useRef, useState } from 'react'

export function useShortsNavigation(totalShorts) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  const lastNavigationRef = useRef(0)

  const isFirst = currentIndex === 0
  const isLast = currentIndex >= totalShorts - 1

  // Cambiar al short indicado
  const goToShort = useCallback(
    (newIndex) => {
      if (newIndex < 0 || newIndex >= totalShorts) {
        return
      }

      setCurrentIndex((previousIndex) => {
        if (newIndex === previousIndex) {
          return previousIndex
        }

        setDirection(
          newIndex > previousIndex ? 'down' : 'up'
        )

        return newIndex
      })
    },
    [totalShorts]
  )

  // Ir al siguiente short
  const nextShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex >= totalShorts - 1) {
        return previousIndex
      }

      setDirection('down')
      return previousIndex + 1
    })
  }, [totalShorts])

  // Regresar al short anterior
  const previousShort = useCallback(() => {
    setCurrentIndex((previousIndex) => {
      if (previousIndex <= 0) {
        return previousIndex
      }

      setDirection('up')
      return previousIndex - 1
    })
  }, [])

  // Navegación mediante teclado
  useEffect(() => {
    function handleKeyDown(event) {
      const element = event.target

      // No interferir mientras alguien escribe
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

  // Navegación mediante rueda del mouse
  useEffect(() => {
    function handleWheel(event) {
      // Permitir el scroll dentro del panel de comentarios
      if (event.target instanceof Element) {
        if (event.target.closest('.comments-list')) {
          return
        }
      }

      if (Math.abs(event.deltaY) < 15) {
        return
      }

      const now = Date.now()

      // Evita saltar varios shorts con un solo movimiento
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
    currentIndex,
    direction,
    isFirst,
    isLast,
    goToShort,
    nextShort,
    previousShort
  }
}