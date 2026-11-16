// Componente principal de CatTube, sesión y navegación entre pantallas.

import { useEffect, useState } from 'react'
import Sidebar from './shared/components/Sidebar'
import UsernamePage from './features/username/UsernamePage'
import ProfilePage from './features/profile/ProfilePage'
import ShortsPage from './features/shorts/ShortsPage'
import StatsPage from './features/stats/StatsPage'
import './App.css'

function App() {
  const [player, setPlayer] = useState(() => {
    try {
      const savedPlayer = JSON.parse(localStorage.getItem('cattube-player'))

      return savedPlayer?.idUsuario && savedPlayer?.username
        ? savedPlayer
        : null
    } catch {
      return null
    }
  })

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('cattube-current-page')

    return ['profile', 'shorts', 'statistics'].includes(savedPage)
      ? savedPage
      : 'profile'
  })

  const [selectedShortId, setSelectedShortId] = useState(null)

  useEffect(() => {
    if (player) {
      localStorage.setItem('cattube-player', JSON.stringify(player))
    } else {
      localStorage.removeItem('cattube-player')
    }
  }, [player])

  useEffect(() => {
    sessionStorage.setItem('cattube-current-page', currentPage)
  }, [currentPage])

  function handleLogin(playerData) {
    setPlayer(playerData)
    setCurrentPage('profile')
  }

  function handleLogout() {
    setPlayer(null)
    setCurrentPage('profile')
    setSelectedShortId(null)
    localStorage.removeItem('cattube-player')
    sessionStorage.removeItem('cattube-current-page')
  }

  function goToProfile() {
    setCurrentPage('profile')
  }

  function handleNavigate(page) {
    setCurrentPage(page)
  }

  function handleOpenShort(shortId) {
    setSelectedShortId(shortId)
    setCurrentPage('shorts')
  }

  function renderPage() {
    if (currentPage === 'profile') {
      return (
        <ProfilePage
          player={player}
          onOpenShort={handleOpenShort}
        />
      )
    }

    if (currentPage === 'shorts') {
      return (
        <ShortsPage
          idUsuario={player.idUsuario}
          initialShortId={selectedShortId}
          onBackToProfile={goToProfile}
        />
      )
    }

    if (currentPage === 'statistics') {
    return (
      <StatsPage
        idUsuario={player.idUsuario}
        onBackToProfile={goToProfile}
      />
    )
  }

    return (
      <ProfilePage
        player={player}
        onOpenShort={handleOpenShort}
      />
    )
  }

  if (!player) {
    return <UsernamePage onLogin={handleLogin} />
  }

  return (
    <>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        username={player.username}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {renderPage()}
      </main>
    </>
  )
}

export default App
