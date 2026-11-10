// Hook para gestionar los Shorts de cada jugador y conservarlos sin conexión.

import { useCallback, useEffect, useState } from 'react'
import { getShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function getStorageKey(idUsuario) {
  return `cattube-profile-shorts-${idUsuario}`
}

function readShortsCache(idUsuario) {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey(idUsuario))) || []
  } catch {
    return []
  }
}

function useShorts(idUsuario) {
  const isOnline = useOnlineStatus()
  const [shorts, setShorts] = useState(() => readShortsCache(idUsuario))
  const [state, setState] = useState('loading')
  const [retryCount, setRetryCount] = useState(0)

  const testState = new URLSearchParams(window.location.search).get('state')
  const forcedState = validStates.includes(testState) ? testState : null

  const retry = useCallback(() => {
    if (forcedState === 'error') {
      const url = new URL(window.location.href)
      url.searchParams.delete('state')
      window.history.replaceState({}, '', url)
    }

    setRetryCount((count) => count + 1)
  }, [forcedState])

  useEffect(() => {
    let cancelled = false

    async function loadShorts() {
      if (!idUsuario) {
        setState('error')
        return
      }

      if (forcedState && forcedState !== 'ready') {
        setState(forcedState)
        return
      }

      if (!isOnline) {
        const cachedShorts = readShortsCache(idUsuario)
        setShorts(cachedShorts)
        setState(cachedShorts.length > 0 ? 'ready' : 'offline')
        return
      }

      setState('loading')

      try {
        const data = await getShorts(idUsuario)

        if (cancelled) return

        setShorts(data)
        localStorage.setItem(getStorageKey(idUsuario), JSON.stringify(data))
        setState(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        const cachedShorts = readShortsCache(idUsuario)
        setShorts(cachedShorts)
        setState(cachedShorts.length > 0 ? 'ready' : 'error')
      }
    }

    loadShorts()

    return () => {
      cancelled = true
    }
  }, [idUsuario, isOnline, forcedState, retryCount])

  return {
    shorts,
    state,
    retry
  }
}

export default useShorts
