import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function PageHero({
  title,
  subtitle,
  image = '/assets/garden.png',
  ctaLabel = 'Free Site Visit',
  ctaTo = '/contact/',
  showCta = true,
}) {
  return (
    <section className="aq-hero aq-hero--page" aria-label={title}>
      <motion.div
        className="aq-hero-media"
        initial={{ scale: 1.06, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <img src={image} alt="" className="aq-hero-image" />
        <div className="aq-hero-overlay" aria-hidden="true" />
      </motion.div>

      <div className="aq-hero-content">
        <motion.h1
          className="aq-hero-title aq-hero-title--page"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.15 }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="aq-hero-subtitle aq-hero-subtitle--page"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.28 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
        {showCta ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.42 }}
          >
            <Link className="aq-hero-cta" to={ctaTo}>
              {ctaLabel}
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
