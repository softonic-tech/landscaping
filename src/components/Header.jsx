import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, site } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`aq-header${open ? ' is-open' : ''}`}>
        <Link to="/" className="aq-logo" aria-label="NAM Landscaping Dubai - Home">
          <img src="/assets/aqualina/logo.png" alt="NAM Landscaping" width={63} height={98} />
        </Link>

        <nav className="aq-nav-desktop" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="aq-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="aq-header-contacts">
          <a href={site.emailHref}>{site.email}</a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>

        <button
          className="aq-menu-btn"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="aq-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 32 32" width="21" height="21" aria-hidden="true">
            {open ? (
              <>
                <path
                  d="M6 6l20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M26 6L6 26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <path
                  d="M2 9h28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 23h28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="aq-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              id="aq-mobile-nav"
              className="aq-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="aq-drawer-top">
                <span className="aq-drawer-title">Menu</span>
                <button
                  type="button"
                  className="aq-drawer-close"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link className="aq-drawer-cta" to="/contact/" onClick={() => setOpen(false)}>
                Free Site Visit
              </Link>
              <div className="aq-drawer-contacts">
                <a href={site.emailHref}>{site.email}</a>
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
