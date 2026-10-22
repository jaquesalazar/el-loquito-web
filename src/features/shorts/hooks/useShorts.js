
/* Hook para gestionar los estados de Shorts y permitir pruebas desde la URL. */

import { useCallback, useEffect, useState } from 'react'
import { getShorts } from '../shortsService'
import useOnlineStatus from '../../../shared/hooks/useOnlineStatus'

const validStates = ['loading', 'ready', 'error', 'empty', 'offline']

function useShorts() {
  const isOnline = useOnlineStatus()
  const [shorts, setShorts] = useState([])
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
        setState('offline')
        return
      }

      setState('loading')

      try {
        const data = await getShorts()

        if (cancelled) return

        setShorts(data)
        setState(data.length > 0 ? 'ready' : 'empty')
      } catch {
        if (cancelled) return

        setState('error')
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
    retry,
  }
}

export default useShorts
