import React from 'react'
import { useNavigate } from 'react-router-dom'

// A single app card shown in grids across the app.
export default function AppCard({ app, installed = false }) {
  const navigate = useNavigate()

  return (
    <div className="app-card" onClick={() => navigate(`/apps/${app.id}`)}>
      {installed && <div className="installed-ribbon">✓ Installed</div>}

      <div className="app-card-img">
        <span style={{ fontSize: '1.9rem' }}>{app.image}</span>
      </div>

      <h3>{app.title}</h3>
      <p className="company-name">{app.companyName}</p>

      <div className="app-card-meta">
        <div className="rating-pill">
          <span>★</span>
          <span>{app.ratingAvg}</span>
        </div>
        <span className="downloads-label">↓ {app.downloads}</span>
      </div>
    </div>
  )
}
