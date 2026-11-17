// Hook para detectar la disponibilidad del servidor de CatTube.

import { useEffect, useState } from 'react'
import { apiRequest } from '../services/apiClient'

function useBackendStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState(null)

  useEffect(() => {
    let cancelled = false
    let interval

    async function checkBackend() {
      if (!navigator.onLine) return

      try {
        const response = await apiRequest('/health')

        if (!cancelled) {
          setIsBackendOnline(response?.status === 'UP')
        }
      } catch {
        if (!cancelled && navigator.onLine) {
          setIsBackendOnline(false)
        }
      }
    }

    function handleOnline() {
      checkBackend()
      interval = setInterval(checkBackend, 5000)
    }

    function handleOffline() {
      clearInterval(interval)
    }

    if (navigator.onLine) {
      checkBackend()
      interval = setInterval(checkBackend, 5000)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      cancelled = true
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isBackendOnline
}

export default useBackendStatus
