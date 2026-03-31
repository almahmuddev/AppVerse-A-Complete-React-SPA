import React from 'react'

//  a row of filled, half, and empty stars based on an average rating
export default function StarRating({ avg, size = '1rem' }) {
  const fullCount = Math.floor(avg)
  const hasHalf = avg - fullCount >= 0.5
  const emptyCount = 5 - fullCount - (hasHalf ? 1 : 0)

  return (
    <div className="stars-row">
      {Array.from({ length: fullCount }).map((_, i) => (
        <span key={`full-${i}`} className="star" style={{ fontSize: size }}>★</span>
      ))}
      {hasHalf && (
        <span className="star" style={{ fontSize: size }}>⭑</span>
      )}
      {Array.from({ length: emptyCount }).map((_, i) => (
        <span key={`empty-${i}`} className="star empty" style={{ fontSize: size }}>☆</span>
      ))}
    </div>
  )
}
