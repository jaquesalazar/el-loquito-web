/* Componente principal de CatTube y navegación entre pantallas */

import { useState } from 'react'
import Sidebar from './shared/components/Sidebar'
import ProfilePage from './features/profile/ProfilePage'
import ShortsPage from './features/shorts/ShortsPage'
import StatsPage from './features/stats/StatsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('profile')

  function goToProfile() {
    setCurrentPage('profile')
  }

  function handleNavigate(page) {
    setCurrentPage(page)
  }

  function renderPage() {
    if (currentPage === 'profile') {
      return <ProfilePage />
    }

    if (currentPage === 'shorts') {
      return <ShortsPage onBackToProfile={goToProfile} />
    }

    if (currentPage === 'statistics') {
      return <StatsPage onBackToProfile={goToProfile} />
    }

    return <ProfilePage />
  }

  return (
    <>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {renderPage()}
      </main>
    </>
  )
}

export default App
