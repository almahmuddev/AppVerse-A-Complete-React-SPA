import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useInstalledApps } from '../hooks/useInstalledApps'
import PageLoader from '../components/PageLoader'
import StarRating from '../components/StarRating'
import RatingChart from '../components/RatingChart'
import { formatNum } from '../utils/formatNum'
import apps from '../data/apps'

// Build the four stat boxes for the app header
function buildStats(app) {
  return [
    { value: formatNum(app.downloads), label: 'Downloads' },
    { value: app.ratingAvg, label: 'Avg Rating' },
    { value: formatNum(app.reviews), label: 'Reviews' },
    { value: `${app.size} MB`, label: 'Size' },
  ]
}

export default function AppDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInstalled, install, uninstall } = useInstalledApps()
  const [loading, setLoading] = useState(true)

  const app = apps.find((a) => a.id === Number(id))
  const installed = app ? isInstalled(app.id) : false

  // Show a loading spinner on each page change
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [id])

  if (loading) return <PageLoader />

  if (!app) {
    return (
      <div className="container">
        <div className="app-not-found" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
          <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1.25rem' }}>😿</span>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            App Not Found
          </h2>
          <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>
            The app you are looking for doesn&apos;t exist or may have been removed.
          </p>
          <button className="btn-primary" onClick={() => navigate('/apps')}>
            ← Browse Apps
          </button>
        </div>
      </div>
    )
  }

  const totalReviews = app.ratings.reduce((sum, r) => sum + r.count, 0)
  const maxCount = Math.max(...app.ratings.map((r) => r.count))

  function handleInstall() {
    install(app.id)
    toast.success(`✓ ${app.title} installed successfully!`)
  }

  function handleUninstall() {
    uninstall(app.id)
    toast.error(`${app.title} has been uninstalled.`)
  }

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate('/apps')}>
        ← Back to Apps
      </button>

      {/* ── APP HEADER ── */}
      <div className="details-header">
        <div className="details-app-img">
          <span style={{ fontSize: '3rem' }}>{app.image}</span>
        </div>

        <div className="details-info">
          <h1>{app.title}</h1>
          <p className="details-developer">Developed by {app.companyName}</p>

          <div className="details-stats-row">
            {buildStats(app).map((stat) => (
              <div key={stat.label} className="detail-stat">
                <span className="detail-stat-val">{stat.value}</span>
                <span className="detail-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="details-action-row">
            <button
              className="btn-install"
              disabled={installed}
              onClick={handleInstall}
            >
              {installed ? '✓ Installed' : 'Install Now'}
            </button>
            {installed && (
              <button className="btn-uninstall" onClick={handleUninstall}>
                Uninstall
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY: Description + Ratings ── */}
      <div className="details-body">
        {/* Left: Description */}
        <div className="detail-card">
          <h3>App Description</h3>
          <p className="app-description">{app.description}</p>
        </div>

        {/* Right: Rating breakdown + Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="detail-card">
            <h3>Ratings & Reviews</h3>

            <div className="rating-overview">
              <div className="rating-big">{app.ratingAvg}</div>
              <div className="rating-overview-right">
                <StarRating avg={app.ratingAvg} size="1.1rem" />
                <div className="total-reviews">{formatNum(totalReviews)} total reviews</div>
              </div>
            </div>

            {/* Rating bars — shown from 5 stars down to 1 star */}
            <div className="rating-bars">
              {[...app.ratings].reverse().map((r) => (
                <div key={r.name} className="rating-row">
                  <span className="star-label">{r.name.split(' ')[0]}★</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{
                        width: maxCount > 0
                          ? `${Math.round((r.count / maxCount) * 100)}%`
                          : '0%',
                      }}
                    />
                  </div>
                  <span className="count-label">{formatNum(r.count)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3>Review Distribution</h3>
            <RatingChart ratings={app.ratings} />
          </div>
        </div>
      </div>
    </div>
  )
}
