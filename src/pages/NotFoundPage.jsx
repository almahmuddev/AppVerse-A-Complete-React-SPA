import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="error-404-page">
        <div className="giant-404">404</div>
        <h2>Oops, page not found!</h2>
        <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('/')}>
            ← Go Home
          </button>
          <button className="btn-secondary" onClick={() => navigate('/apps')}>
            Browse Apps
          </button>
        </div>
      </div>
    </div>
  )
}
