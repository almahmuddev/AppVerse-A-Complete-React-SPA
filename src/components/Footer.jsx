import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Internal nav links for footer columns
const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'All Apps', to: '/apps' },
  { label: 'My Installation', to: '/installation' },
]

const categoryLinks = ['Productivity', 'Entertainment', 'Finance', 'Health & Fitness', 'Travel']

const companyLinks = [
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Contact Us', href: '#' },
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand column */}
          <div>
            <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
              <div className="nav-logo-icon">A</div>
              <span className="nav-logo-text">AppVerse</span>
            </Link>
            <p className="footer-brand-desc">
              Discover and install the best mobile applications curated for
              productivity, creativity, and entertainment. Your next favourite
              app is waiting for you.
            </p>
            <div className="footer-socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                title="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="social-btn" title="Twitter / X">𝕏</a>
              <a href="#" className="social-btn" title="LinkedIn">in</a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-col">
            <h4>Navigation</h4>
            {navigationLinks.map((link) => (
              <a key={link.label} onClick={() => navigate(link.to)} role="button">
                {link.label}
              </a>
            ))}
          </div>

          {/* Categories column */}
          <div className="footer-col">
            <h4>Categories</h4>
            {categoryLinks.map((name) => (
              <a key={name} href="#">{name}</a>
            ))}
          </div>

          {/* Company column */}
          <div className="footer-col">
            <h4>Company</h4>
            {companyLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AppVerse. Built with ❤️ for your digital lifestyle.</span>
          <span>React · React Router · Recharts · LocalStorage</span>
        </div>
      </div>
    </footer>
  )
}
