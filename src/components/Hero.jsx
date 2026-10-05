import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProgressiveImage from './ProgressiveImage'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="aq-hero" aria-label="Hero">
      <motion.div
        className="aq-hero-media"
        initial={{ scale: 1.06, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <ProgressiveImage
          src="/assets/garden.png"
          alt=""
          className="aq-hero-image"
          loading="eager"
          fetchPriority="high"
        />
        <div className="aq-hero-overlay" aria-hidden="true" />
      </motion.div>

      <div className="aq-hero-content">
        <motion.h1
          className="aq-hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.15 }}
        >
          Landscaping &amp; Pool Care in Dubai
        </motion.h1>
        <motion.p
          className="aq-hero-subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
        >
          Premium garden landscaping, maintenance and swimming pool care, by one trusted team.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.42 }}
        >
          <Link className="aq-hero-cta" to="/contact/">
            Free Site Visit
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
