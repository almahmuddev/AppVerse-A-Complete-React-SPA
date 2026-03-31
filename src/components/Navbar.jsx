import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

function navLinkClass({ isActive }) {
  return 'nav-link' + (isActive ? ' active' : '')
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-icon">A</div>
          <span className="nav-logo-text">AppVerse</span>
        </Link>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/apps" className={navLinkClass} onClick={closeMenu}>
            Apps
          </NavLink>
          <NavLink to="/installation" className={navLinkClass} onClick={closeMenu}>
            My Installation
          </NavLink>
        </div>

        <div className="nav-right">
          <a
            href="https://github.com/almahmuddev"
            target="_blank"
            rel="noreferrer"
            className="nav-contribute-btn"
          >
            Contribution →
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
