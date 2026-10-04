import { motion } from 'framer-motion'
import Reveal, { fadeUp, staggerContainer } from './Reveal'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

const features = [
  'Built for the Dubai climate',
  'In-house teams, never subcontracted',
  'Transparent written quotes',
  'Reports after every visit',
]

export default function Team() {
  return (
    <section className="aq-team" aria-label="Our Team">
      <motion.div
        className="aq-team-inner"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="aq-team-media" variants={fadeUp}>
          <img src="/assets/area-green.webp" alt="NAM Landscaping in-house Dubai team" />
          <span className="aq-team-label">50+ In-house team</span>
        </motion.div>

        <Reveal className="aq-team-content" delay={0.08}>
          <h2 className="aq-team-title">One Company. One Standard.</h2>
          <p className="aq-team-copy">
            Most Dubai homeowners juggle a gardener, a pool company and a handyman. We replace them
            all with one trained, accountable team.
          </p>

          <h3 className="aq-team-sub">How we work</h3>
          <p className="aq-team-copy aq-team-copy--hosp">
            Heat-tolerant planting, water-wise irrigation and summer-proof pool chemistry — with
            clear scope, clear price, and no surprises mid-project.
          </p>

          <ul className="aq-team-features">
            {features.map((feature) => (
              <li key={feature}>
                <span className="aq-product-check">
                  <CheckIcon />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </motion.div>
    </section>
  )
}
