import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useInstalledApps } from '../hooks/useInstalledApps'
import PageLoader from '../components/PageLoader'
import { formatNum } from '../utils/formatNum'
import apps from '../data/apps'

// Toast style for the uninstall action (uses the red palette)
const uninstallToastStyle = {
  background: '#1E1535',
  color: '#FCA5A5',
  border: '1px solid rgba(239,68,68,0.35)',
  borderRadius: '10px',
  fontFamily: "'DM Sans', sans-serif",
}

export default function InstallationPage() {
  const navigate = useNavigate()
  const { installed, uninstall } = useInstalledApps()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter the full apps list to only those the user has installed
  const installedApps = apps.filter((a) => installed.includes(a.id))

  function handleUninstall(app) {
    uninstall(app.id)
    toast(`🗑️ ${app.title} removed from installations.`, {
      icon: '🗑️',
      style: uninstallToastStyle,
    })
  }

  if (loading) return <PageLoader />

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Your Installed Apps</h1>
        <p>
          {installedApps.length} app{installedApps.length !== 1 ? 's' : ''} installed
          — manage them all in one place.
        </p>
      </div>

      {installedApps.length === 0 ? (
        <div className="empty-state" style={{ padding: '5rem 1rem' }}>
          <span className="empty-icon">📦</span>
          <h3>No Installed Apps Yet</h3>
          <p>Apps you install will appear here. Browse our collection to get started!</p>
          <button
            className="btn-primary"
            style={{ margin: '1.5rem auto 0', display: 'inline-flex' }}
            onClick={() => navigate('/apps')}
          >
            Browse Apps →
          </button>
        </div>
      ) : (
        <div className="apps-grid" style={{ marginBottom: '3rem' }}>
          {installedApps.map((app) => (
            <InstalledAppCard
              key={app.id}
              app={app}
              onView={() => navigate(`/apps/${app.id}`)}
              onUninstall={() => handleUninstall(app)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Separate small component so InstallationPage's JSX stays clean
function InstalledAppCard({ app, onView, onUninstall }) {
  return (
    <div className="app-card" style={{ cursor: 'default' }}>
      <div className="installed-ribbon">✓ Installed</div>

      <div className="app-card-img" style={{ cursor: 'pointer' }} onClick={onView}>
        <span style={{ fontSize: '1.9rem' }}>{app.image}</span>
      </div>

      <h3 style={{ cursor: 'pointer' }} onClick={onView}>
        {app.title}
      </h3>
      <p className="company-name">{app.companyName}</p>

      <div className="app-card-meta">
        <div className="rating-pill">
          <span>★</span>
          <span>{app.ratingAvg}</span>
        </div>
        <span className="downloads-label">↓ {formatNum(app.downloads)}</span>
      </div>

      <button className="uninstall-btn" onClick={onUninstall}>
        Uninstall
      </button>
    </div>
  )
}
