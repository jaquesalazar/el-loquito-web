// Hook para cargar y conservar las estadísticas de cada jugador.

import { useCallback, useEffect, useState } from 'react'
import { getStats } from './statsService'
import useOnlineStatus from '../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function getCacheKey(idUsuario) {
  return `cattube-stats-cache-${idUsuario}`
}

function readCache(idUsuario) {
  try {
    const saved = localStorage.getItem(getCacheKey(idUsuario))
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function saveCache(idUsuario, data) {
  try {
    localStorage.setItem(getCacheKey(idUsuario), JSON.stringify(data))
  } catch {
    return
  }
}

function useStats(idUsuario) {
  const isOnline = useOnlineStatus()
  const [stats, setStats] = useState(() => readCache(idUsuario))
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

    async function loadStats() {
      if (!idUsuario) {
        setStats(null)
        setState('empty')
        return
      }

      if (forcedState === 'loading') {
        setState('loading')
        return
      }

      if (forcedState === 'error') {
        setState('error')
        return
      }

      if (forcedState === 'empty') {
        setStats(null)
        setState('empty')
        return
      }

      if (forcedState === 'offline' || !isOnline) {
        setStats(readCache(idUsuario))
        setState('offline')
        return
      }

      setStats(readCache(idUsuario))
      setState('loading')

      try {
        const data = await getStats(idUsuario)

        if (cancelled) return

        if (!data) {
          setStats(null)
          setState('empty')
          return
        }

        setStats(data)
        saveCache(idUsuario, data)
        setState('ready')
           } catch {
            if (cancelled) return

            const cachedStats = readCache(idUsuario)

            setStats(cachedStats)
            setState(cachedStats ? 'offline' : 'error')
          }
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [idUsuario, isOnline, forcedState, retryCount])

  return {
    stats,
    state,
    retry,
  }
}

export default useStats
