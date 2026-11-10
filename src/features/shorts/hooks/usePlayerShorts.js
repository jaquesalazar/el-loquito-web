
// Hook para cargar y conservar los Shorts asignados a cada jugador sin conexión.

import { useCallback, useEffect, useState } from 'react'
import { getPlayerShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function getForcedState() {
  const testState = new URLSearchParams(window.location.search).get('state')
  return validStates.includes(testState) ? testState : null
}

function getCacheKey(idUsuario) {
  return `cattube-shorts-metadata-${idUsuario}`
}

function readShortsCache(idUsuario) {
  try {
    const saved = localStorage.getItem(getCacheKey(idUsuario))
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveShortsCache(idUsuario, shorts) {
  try {
    localStorage.setItem(getCacheKey(idUsuario), JSON.stringify(shorts))
  } catch {
    return
  }
}

function usePlayerShorts(idUsuario) {
  const isOnline = useOnlineStatus()
  const [shorts, setShorts] = useState([])
  const [status, setStatus] = useState('loading')
  const [retryCount, setRetryCount] = useState(0)
  const [forcedState, setForcedState] = useState(getForcedState)

  const retry = useCallback(() => {
    if (forcedState === 'error' || forcedState === 'offline') {
      const url = new URL(window.location.href)
      url.searchParams.delete('state')
      window.history.replaceState({}, '', url)
      setForcedState(null)
    }

    setRetryCount((count) => count + 1)
  }, [forcedState])

  useEffect(() => {
    let cancelled = false

    async function loadShorts() {
      if (!idUsuario) {
        setStatus('error')
        return
      }

      if (forcedState && forcedState !== 'ready') {
        if (forcedState === 'offline') {
          setShorts(readShortsCache(idUsuario))
        }

        setStatus(forcedState)
        return
      }

      if (!isOnline) {
        const cachedShorts = readShortsCache(idUsuario)
        setShorts(cachedShorts)
        setStatus(cachedShorts.length > 0 ? 'offline' : 'offline')
        return
      }

      setStatus('loading')

      try {
        const data = await getPlayerShorts(idUsuario)

        if (cancelled) return

        setShorts(data)
        saveShortsCache(idUsuario, data)
        setStatus(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        const cachedShorts = readShortsCache(idUsuario)
        setShorts(cachedShorts)
        setStatus(cachedShorts.length > 0 ? 'offline' : 'error')
      }
    }

    loadShorts()

    return () => {
      cancelled = true
    }
  }, [idUsuario, isOnline, forcedState, retryCount])

  return { shorts, status, retry }
}

export default usePlayerShorts
