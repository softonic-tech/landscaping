import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProgressiveImage from './ProgressiveImage'
import Reveal, { fadeUp, staggerContainer } from './Reveal'

export default function Intro() {
  return (
    <section className="aq-intro" aria-label="Welcome to Dubai">
      <div className="aq-intro-inner">
        <Reveal className="aq-intro-top">
          <div className="aq-intro-heading">
            <span className="aq-label">Dubai</span>
            <h2 className="aq-intro-title">Complete Outdoor Services</h2>
          </div>
          <p className="aq-intro-copy">
            Design, build and care — every outdoor service your Dubai property needs, delivered by
            one accountable team.
          </p>
        </Reveal>

        <motion.div
          className="aq-intro-collage"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="aq-intro-main" variants={fadeUp}>
            <ProgressiveImage
              src="/assets/garden.png"
              alt="Premium villa garden landscaping in Dubai"
              loading="lazy"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link to="/projects/" className="aq-stat-card aq-stat-card--listings">
              <span className="aq-stat-value">1,000+</span>
              <span className="aq-stat-label">Projects across Dubai</span>
            </Link>
          </motion.div>

          <motion.div className="aq-intro-side" variants={fadeUp}>
            <ProgressiveImage
              src="/assets/area-villa.webp"
              alt="Dubai villa outdoor living"
              loading="lazy"
            />
          </motion.div>

          <motion.div className="aq-intro-bottom" variants={fadeUp}>
            <ProgressiveImage
              src="/assets/pool.png"
              alt="Swimming pool maintenance in Dubai"
              loading="lazy"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <button type="button" className="aq-stat-card aq-stat-card--branded">
              <span className="aq-stat-value">10+ yrs</span>
              <span className="aq-stat-label">Serving Dubai outdoors</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
