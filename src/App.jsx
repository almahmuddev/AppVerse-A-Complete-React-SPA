import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

// Lazy-load pages so each route only loads its code when visited
const HomePage = React.lazy(() => import('./pages/HomePage'))
const AppsPage = React.lazy(() => import('./pages/AppsPage'))
const AppDetailsPage = React.lazy(() => import('./pages/AppDetailsPage'))
const InstallationPage = React.lazy(() => import('./pages/InstallationPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

const toastStyle = {
  background: '#1E1535',
  color: '#F8F5FF',
  border: '1px solid rgba(124,58,237,0.4)',
  borderRadius: '10px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.875rem',
}

export default function App() {
  return (
    <div className="app-wrapper">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: toastStyle,
          success: { iconTheme: { primary: '#10B981', secondary: '#1E1535' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#1E1535' } },
        }}
      />

      <Navbar />

      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/apps/:id" element={<AppDetailsPage />} />
            <Route path="/installation" element={<InstallationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
