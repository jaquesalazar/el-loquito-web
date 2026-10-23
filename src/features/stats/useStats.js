/* Hook para cargar, almacenar y gestionar los estados de las estadísticas de CatTube */

import { useCallback, useEffect, useState } from 'react'
import { getStats } from './data'
import useOnlineStatus from '../../shared/hooks/useOnlineStatus'

const CACHE_KEY = 'cattube-stats-cache'
const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function readCache() {
  try {
    const saved = localStorage.getItem(CACHE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function saveCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    return
  }
}

function useStats() {
  const isOnline = useOnlineStatus()
  const [stats, setStats] = useState(readCache)
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
        setStats(readCache())
        setState('offline')
        return
      }

      setState('loading')

      try {
        const data = await getStats()

        if (cancelled) return

        if (!data) {
          setStats(null)
          setState('empty')
          return
        }

        setStats(data)
        saveCache(data)
        setState('ready')
      } catch {
        if (cancelled) return

        setStats(readCache())
        setState(isOnline ? 'error' : 'offline')
      }
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [isOnline, forcedState, retryCount])

  return {
    stats,
    state,
    retry,
  }
}

export default useStats
