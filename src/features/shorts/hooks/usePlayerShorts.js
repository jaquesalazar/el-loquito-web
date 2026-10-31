/* Hook para cargar y conservar los metadatos de Shorts sin conexión. */

import { useCallback, useEffect, useState } from 'react'
import { getPlayerShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const CACHE_KEY = 'cattube-shorts-metadata'
const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function getForcedState() {
  const testState = new URLSearchParams(window.location.search).get('state')
  return validStates.includes(testState) ? testState : null
}

function readShortsCache() {
  try {
    const saved = localStorage.getItem(CACHE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveShortsCache(shorts) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(shorts))
  } catch {
    return
  }
}

function usePlayerShorts() {
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
      if (forcedState && forcedState !== 'ready') {
        if (forcedState === 'offline') {
          setShorts(readShortsCache())
        }

        setStatus(forcedState)
        return
      }

      if (!isOnline) {
        setShorts(readShortsCache())
        setStatus('offline')
        return
      }

      setStatus('loading')

      try {
        const data = await getPlayerShorts()

        if (cancelled) return

        setShorts(data)
        saveShortsCache(data)
        setStatus(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        const cachedShorts = readShortsCache()
        setShorts(cachedShorts)
        setStatus(cachedShorts.length > 0 ? 'offline' : 'error')
      }
    }

    loadShorts()

    return () => {
      cancelled = true
    }
  }, [isOnline, forcedState, retryCount])

  return { shorts, status, retry }
}

export default usePlayerShorts