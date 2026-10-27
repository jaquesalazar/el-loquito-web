
/* Hook para gestionar los estados del reproductor de Shorts y permitir pruebas desde la URL. */

import { useCallback, useEffect, useState } from 'react'
import { getPlayerShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function getForcedState() {
  const testState = new URLSearchParams(window.location.search).get('state')
  return validStates.includes(testState) ? testState : null
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
      if (!isOnline) {
        setStatus('offline')
        return
      }

      if (forcedState && forcedState !== 'ready') {
        setStatus(forcedState)
        return
      }

      setStatus('loading')

      try {
        const data = await getPlayerShorts()

        if (cancelled) return

        setShorts(data)
        setStatus(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        setStatus('error')
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
