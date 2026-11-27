// Cliente HTTP para comunicarse con el backend de CatTube.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Error HTTP: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}
