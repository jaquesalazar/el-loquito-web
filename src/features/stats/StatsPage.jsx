/* Pantalla de estadísticas del videojuego con gráficas y estados de carga */

import StatCard from './StatCard'
import FollowersChart from './FollowersChart'
import InfluenceChart from './InfluenceChart'
import MoneyChart from './MoneyChart'
import CohesionChart from './CohesionChart'
import useStats from './useStats'
import { formatGameMoney, getMoneyLegend } from './config'
import OfflineBanner from '../../shared/components/OfflineBanner'
import './StatsPage.css'

const formatNumber = (value) =>
  new Intl.NumberFormat('es-MX').format(value).replace(/,/g, '.')

function StatsPage({ onBackToProfile }) {
  const { stats, state, retry } = useStats()

  const isLoading = state === 'loading'
  const isOffline = state === 'offline'
  const hasData = stats !== null

  function renderContent() {
    if (isLoading) {
      return (
        <div className="stats-grid" aria-label="Cargando estadísticas">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="stat-card stat-card-skeleton" key={index}>
              <div className="stats-skeleton stats-skeleton-title"></div>
              <div className="stats-skeleton stats-skeleton-value"></div>
              <div className="stats-skeleton stats-skeleton-chart"></div>
              <div className="stats-skeleton stats-skeleton-legend"></div>
            </div>
          ))}
        </div>
      )
    }

    if (state === 'error') {
      return (
        <div className="stats-feedback" role="alert">
          <h2>No pudimos cargar las estadísticas</h2>
          <p>Ocurrió un problema al consultar los datos del juego.</p>
          <button type="button" onClick={retry}>
            Reintentar
          </button>
        </div>
      )
    }

    if (state === 'empty' || !hasData) {
  return (
    <div className="stats-feedback">
      <svg
        width="52"
        height="52"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 27 15 8l13 11h8L49 8l3 19v12c0 12-9 19-20 19S12 51 12 39V27Z"
          fill="#6E8B3E"
        />
        <path
          d="m22 33 5 3m15-3-5 3M29 43l3 3 3-3"
          stroke="#ECE5D3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h2>
        {isOffline
          ? 'No hay estadísticas guardadas'
          : 'Aún no hay estadísticas'}
      </h2>

      <p>
        {isOffline
          ? 'Conéctate a internet para consultar las estadísticas por primera vez.'
          : 'Los datos aparecerán cuando haya actividad dentro del juego.'}
      </p>
    </div>
  )
}
    const followers = stats.followers
    const influence = stats.influence
    const money = stats.money
    const cohesion = stats.cohesion

    const communityTotal = cohesion.inFavor + cohesion.against
    const favorPercentage = communityTotal > 0
      ? (cohesion.inFavor / communityTotal) * 100
      : 0

    const percentageChange = favorPercentage - cohesion.previousPercentage
    const changeIsPositive = percentageChange >= 0

    const changeBadge = (
      <span
        className={
          changeIsPositive
            ? 'stats-change-positive'
            : 'stats-change-negative'
        }
      >
        {changeIsPositive ? '↗' : '↘'}{' '}
        {Math.abs(percentageChange).toLocaleString('es-MX', {
          maximumFractionDigits: 1,
        })}{' '}
        p. p.
      </span>
    )

    return (
      <div className="stats-grid">
        <StatCard
          title="Seguidores"
          value={formatNumber(followers.total)}
          legend="Seguidores totales"
        >
          <FollowersChart data={followers.history} />
        </StatCard>

        <StatCard
          title="Influencia"
         
            value={`${(influence.total / 1000).toLocaleString('es-ES', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
            })} mil`}

          legend="Influencia acumulada"
        >
          <InfluenceChart data={influence.history} />
        </StatCard>

        <StatCard
          title="Dinero"
          value={formatGameMoney(money.total)}
          legend={getMoneyLegend()}
        >
          <MoneyChart data={money.history} />
        </StatCard>

        <StatCard
          title="Cohesión de la comunidad"
          value={`${favorPercentage.toLocaleString('es-MX', {
            maximumFractionDigits: 1,
          })} %`}
          badge={changeBadge}
          legend="Miembros a favor y en contra"
        >
          <CohesionChart
            inFavor={cohesion.inFavor}
            against={cohesion.against}
          />
        </StatCard>
      </div>
    )
  }

  return (
    <section className="stats-page">
      {isOffline && (
        <OfflineBanner
          variant="page"
          message="Sin conexión. Mostrando las últimas estadísticas guardadas."
        />
      )}

      <div className="stats-page-heading">
        <button
          type="button"
          className="stats-back-link"
          onClick={onBackToProfile}
        >
          ← Volver al perfil
        </button>

        <h1>Estadísticas</h1>
        <p>Así crece tu comunidad.</p>
      </div>

      {renderContent()}
    </section>
  )
}

export default StatsPage
