
/* Hook para detectar la disponibilidad real de conexión a Internet. */

import { useCallback, useEffect, useState } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(false)

  const checkConnection = useCallback(async () => {
    if (!navigator.onLine) {
      setIsOnline(false)
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1500)

    try {
      const response = await fetch('/connection-check.txt', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      })

      setIsOnline(response.status === 204)
    } catch {
      setIsOnline(false)
    } finally {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const handleOnline = () => checkConnection()
    const handleOffline = () => setIsOnline(false)

    const initialCheck = setTimeout(checkConnection, 0)
    const interval = setInterval(checkConnection, 2000)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      clearTimeout(initialCheck)
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [checkConnection])

  return isOnline
}

export default useOnlineStatus
