/* Hook para gestionar los Shorts y conservar sus datos sin conexión. */

import { useCallback, useEffect, useState } from 'react'
import { getShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']
const STORAGE_KEY = 'cattube-profile-shorts'

function useShorts() {
  const isOnline = useOnlineStatus()
  const [shorts, setShorts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
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
      if (forcedState && forcedState !== 'ready') {
        setState(forcedState)
        return
      }

      if (!isOnline) {
        setState(shorts.length > 0 ? 'ready' : 'offline')
        return
      }

      setState('loading')

      try {
        const data = await getShorts()

        if (cancelled) return

        setShorts(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        setState(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        setState(shorts.length > 0 ? 'ready' : 'error')
      }
    }

    loadShorts()

    return () => {
      cancelled = true
    }
  }, [isOnline, forcedState, retryCount])

  return {
    shorts,
    state,
    retry
  }
}

export default useShorts
