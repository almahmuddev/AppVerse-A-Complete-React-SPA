import React from 'react'

// Simple centered spinner shown 
export default function PageLoader({ text = 'Loading...' }) {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <span className="loader-text">{text}</span>
    </div>
  )
}
