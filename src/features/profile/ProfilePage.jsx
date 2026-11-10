// Pantalla de perfil de CatTube con datos reales del jugador.

import ShortsGrid from './components/ShortsGrid'
import OfflineBanner from '../../shared/components/OfflineBanner'
import useOnlineStatus from '../../shared/hooks/useOnlineStatus'
import useShorts from '../shorts/hooks/useShorts'
import './ProfilePage.css'

function ProfilePage({ player, onOpenShort }) {
  const isOnline = useOnlineStatus()
  const { shorts, state, retry } = useShorts(player?.idUsuario)

  const username = player?.username || ''
  const seguidores = player?.seguidores ?? 0

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
          <h1>El loquito</h1>

          <p className="profile-stats">
            @{username}
            <span>•</span>
            {seguidores.toLocaleString('es-MX')} suscriptores
            <span>•</span>
            {shorts.length.toLocaleString('es-MX')} shorts
          </p>

          <p className="profile-bio">
            Las palomas no son lo que paresen... los gatos trabajan para el
            govierno y la luna me manda señales por el microondas. No estoy
            loco, tengo pruevas.
          </p>
        </div>
      </header>

      <hr className="profile-divider" />

      <ShortsGrid
        shorts={shorts}
        state={!isOnline && shorts.length > 0 ? 'ready' : state}
        onRetry={retry}
        onOpenShort={onOpenShort}
      />
    </section>
  )
}

export default ProfilePage
