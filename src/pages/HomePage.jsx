import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppCard from '../components/AppCard'
import PageLoader from '../components/PageLoader'
import { useInstalledApps } from '../hooks/useInstalledApps'
import apps from '../data/apps'

// show only the first 8 apps in the "Trending" section
const TRENDING_COUNT = 8
const trendingApps = apps.slice(0, TRENDING_COUNT)

// stats shown below the hero banner
const STATS = [
  { icon: '📱', value: '29.6M', label: 'Total Downloads' },
  { icon: '⭐', value: '906K', label: 'Active Reviews' },
  { icon: '🏆', value: '132+', label: 'Top Applications' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { isInstalled } = useInstalledApps()

//  short  animation for betterness lookings
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <PageLoader />

  return (
    <div>
      {/* hero part */}
      <div className="home-hero">
        <div className="hero-badge">🚀 Discover Amazing Apps</div>
        <h1 className="hero-title">
          We Build <span>Productive</span>
          <br />
          Apps For You
        </h1>
        <p className="hero-desc">
          Explore thousands of handpicked applications for productivity, creativity,
          and entertainment. Your next favourite app is just a tap away.
        </p>
        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() => window.open('https://play.google.com/store/apps', '_blank')}
          >
            ▶ &nbsp;Play Store
          </button>
          <button
            className="btn-secondary"
            onClick={() => window.open('https://apps.apple.com', '_blank')}
          >
            🍎 &nbsp;App Store
          </button>
        </div>
      </div>

      <div className="container">
        {/* stats part */}
        <div className="stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-icon">{s.icon}</span>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/*  trending apps */}
        <div className="section">
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">Trending Apps</h2>
              <p className="section-subtitle">
                Explore top trending apps on the AppVerse marketplace
              </p>
            </div>
            <button className="btn-ghost" onClick={() => navigate('/apps')}>
              Show All →
            </button>
          </div>

          <div className="apps-grid">
            {trendingApps.map((app) => (
              <AppCard key={app.id} app={app} installed={isInstalled(app.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
