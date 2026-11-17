// Hook para detectar la disponibilidad del servidor de CatTube.

import { useEffect, useState } from 'react'
import { apiRequest } from '../services/apiClient'

function useBackendStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function checkBackend() {
      try {
        const response = await apiRequest('/health')

        if (!cancelled) {
          setIsBackendOnline(response?.status === 'UP')
        }
      } catch {
        if (!cancelled) {
          setIsBackendOnline(false)
        }
      }
    }

    checkBackend()

    const interval = setInterval(checkBackend, 5000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return isBackendOnline
}

export default useBackendStatus
