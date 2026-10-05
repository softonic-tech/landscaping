import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, site } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

const mobileLinks = [{ to: '/', label: 'Home' }, ...navLinks]

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.18 },
  },
}

function isActive(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to.replace(/\/$/, '')) || pathname.startsWith(to)
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('nav-open')
      document.body.style.removeProperty('top')
      return undefined
    }

    const scrollY = window.scrollY
    document.body.classList.add('nav-open')
    document.body.style.top = `-${scrollY}px`

    return () => {
      document.body.classList.remove('nav-open')
      document.body.style.removeProperty('top')
      window.scrollTo(0, scrollY)
    }
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
        <Link to="/" className="aq-logo" aria-label={`${site.name} - Home`}>
          <img
            className="aq-logo__light"
            src={site.logo}
            alt={site.name}
            width={168}
            height={78}
          />
          <img
            className="aq-logo__dark"
            src={site.logoDark}
            alt=""
            aria-hidden="true"
            width={168}
            height={78}
          />
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
          <a href={site.phoneSecondaryHref}>{site.phoneSecondary}</a>
        </div>

        <button
          className={`aq-menu-btn${open ? ' is-active' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="aq-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="aq-menu-btn__ring" aria-hidden="true" />
          <span className="aq-burger" aria-hidden="true">
            <span className="aq-burger__line aq-burger__line--top" />
            <span className="aq-burger__line aq-burger__line--mid" />
            <span className="aq-burger__line aq-burger__line--bot" />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="aq-mobile-nav"
            id="aq-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <motion.div
              className="aq-mobile-nav__bg"
              aria-hidden="true"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.04, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            />

            <div className="aq-mobile-nav__inner">
              <motion.nav
                className="aq-mobile-nav__links"
                aria-label="Mobile"
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {mobileLinks.map((link) => {
                  const active = isActive(location.pathname, link.to)
                  return (
                    <motion.div key={link.to} variants={itemVariants}>
                      <Link
                        to={link.to}
                        className={`aq-mobile-nav__link${active ? ' is-active' : ''}`}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="aq-mobile-nav__label">{link.label}</span>
                        <span className="aq-mobile-nav__arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.nav>

              <motion.div
                className="aq-mobile-nav__foot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease, delay: 0.28 }}
              >
                <Link
                  className="aq-mobile-nav__cta"
                  to="/contact/"
                  onClick={() => setOpen(false)}
                >
                  Free Site Visit
                </Link>

                <div className="aq-mobile-nav__actions">
                  {site.contacts.map((contact) => (
                    <a
                      key={contact.name}
                      className="aq-mobile-nav__action"
                      href={contact.phoneHref}
                    >
                      <span className="aq-mobile-nav__action-label">Call {contact.name}</span>
                      <span className="aq-mobile-nav__action-value">{contact.phone}</span>
                    </a>
                  ))}
                  <a className="aq-mobile-nav__action" href={site.whatsapp} target="_blank" rel="noreferrer">
                    <span className="aq-mobile-nav__action-label">WhatsApp</span>
                    <span className="aq-mobile-nav__action-value">Chat now</span>
                  </a>
                  <a className="aq-mobile-nav__action" href={site.emailHref}>
                    <span className="aq-mobile-nav__action-label">Email</span>
                    <span className="aq-mobile-nav__action-value">{site.email}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
