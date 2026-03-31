import React, { useState, useMemo, useEffect, useRef } from 'react'
import AppCard from '../components/AppCard'
import PageLoader from '../components/PageLoader'
import { useInstalledApps } from '../hooks/useInstalledApps'
import apps from '../data/apps'

const DEBOUNCE_MS = 350

function getSortedApps(list, sortOption) {
  if (sortOption === 'high-low') {
    return [...list].sort((a, b) => b.downloads - a.downloads)
  }
  if (sortOption === 'low-high') {
    return [...list].sort((a, b) => a.downloads - b.downloads)
  }
  return list
}

export default function AppsPage() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [initialLoad, setInitialLoad] = useState(true)
  const { isInstalled } = useInstalledApps()
  const debounceRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase())
    }, DEBOUNCE_MS)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  // useMemo so filtering only re-runs when the search or sort actually changes
  const displayedApps = useMemo(() => {
    const filtered = debouncedQuery
      ? apps.filter((a) => a.title.toLowerCase().includes(debouncedQuery))
      : apps
    return getSortedApps(filtered, sort)
  }, [debouncedQuery, sort])

  if (initialLoad) return <PageLoader />

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Our All Applications</h1>
        <p>Explore {apps.length} top-tier apps developed by us — find yours today.</p>
      </div>

      {/*  search & sort controls  */}
      <div className="apps-controls">
        <p className="apps-found">
          <strong>{displayedApps.length}</strong> Apps Found
        </p>
        <div className="controls-right">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search apps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="high-low">Downloads: High → Low</option>
            <option value="low-high">Downloads: Low → High</option>
          </select>
        </div>
      </div>

      {/* app grid or empty state */}
      {displayedApps.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No App Found</h3>
          <p>No apps match &quot;{query}&quot;. Try a different search term.</p>
        </div>
      ) : (
        <div className="apps-grid" style={{ marginBottom: '3rem' }}>
          {displayedApps.map((app) => (
            <AppCard key={app.id} app={app} installed={isInstalled(app.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
