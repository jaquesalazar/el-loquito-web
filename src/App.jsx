/* Componente principal de CatTube y navegación */

import { useState } from 'react'
import Sidebar from './shared/components/Sidebar'
import ProfilePage from './features/profile/ProfilePage'
import ShortsPage from './features/shorts/ShortsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('profile')

  function goToProfile() {
    setCurrentPage('profile')
  }

  function handleNavigate(page) {
    setCurrentPage(page)
  }

  return (
    <>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {currentPage === 'profile' ? (
          <ProfilePage />
        ) : (
          <ShortsPage onBackToProfile={goToProfile} />
        )}
      </main>
    </>
  )
}

export default App
