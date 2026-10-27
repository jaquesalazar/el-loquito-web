/* Pantalla de perfil de CatTube con aviso de conexión. */

import { profileData } from './data'
import ShortsGrid from './components/ShortsGrid'
import OfflineBanner from '../../shared/components/OfflineBanner'
import useOnlineStatus from '../../shared/hooks/useOnlineStatus'
import useShorts from '../shorts/hooks/useShorts'
import './ProfilePage.css'

function ProfilePage() {
  const isOnline = useOnlineStatus()
  const { shorts, state, retry } = useShorts()

  return (
    <section className="profile-page">
      {!isOnline && <OfflineBanner variant="page" />}

      <div className="profile-cover">
        <img
          src="/images/portada.png"
          alt="Portada del canal El loquito"
          className="profile-cover-image"
        />
      </div>

      <header className="profile-header">
        <img
          className="profile-avatar"
          src="/images/Avatar.png"
          alt="Foto de perfil de El loquito"
        />

        <div className="profile-info">
          <h1>{profileData.nombre}</h1>

          <p className="profile-stats">
            {profileData.usuario}
            <span>•</span>
            {(profileData.suscriptores / 1000).toLocaleString('es-MX', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            })} mil suscriptores
            <span>•</span>
            {profileData.totalShorts} shorts
          </p>

          <p className="profile-bio">
            {profileData.biografia}
          </p>
        </div>
      </header>

      <hr className="profile-divider" />

      <ShortsGrid
        shorts={shorts}
        state={state}
        onRetry={retry}
      />
    </section>
  )
}

export default ProfilePage
