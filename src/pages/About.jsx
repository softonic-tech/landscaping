import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Reveal, { fadeUp, staggerContainer } from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

const points = [
  'Honesty before revenue',
  'In-house people, properly trained',
  'Proof, not promises',
  'Built for this climate',
]

export default function About() {
  useDocumentTitle(
    'About Us | NAM Landscaping Dubai',
    'NAM Landscaping — the one-team outdoor company Dubai was missing.',
  )

  return (
    <main>
      <PageHero
        title="About Us"
        subtitle="The one-team outdoor company Dubai was missing"
        image="/assets/area-green.webp"
      />

      <section className="aq-team" aria-label="About NAM Landscaping">
        <motion.div
          className="aq-team-inner"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="aq-team-media" variants={fadeUp}>
            <img src="/assets/garden.png" alt="NAM Landscaping Dubai team" />
            <span className="aq-team-label">50+ In-house team</span>
          </motion.div>

          <Reveal className="aq-team-content" delay={0.08}>
            <h2 className="aq-team-title">Built Around a Simple Frustration</h2>
            <p className="aq-team-copy">
              Every villa owner in Dubai knows the routine: three invoices, three schedules, nobody
              accountable for the outdoor space as a whole.
            </p>

            <h3 className="aq-team-sub">One company for garden and pool</h3>
            <p className="aq-team-copy aq-team-copy--hosp">
              NAM Landscaping — Noor Al Madeena Landscaping — has delivered 1,000+ projects with a
              50-plus in-house team. Around 80% of clients renew every year.
            </p>

            <ul className="aq-team-features">
              {points.map((point) => (
                <li key={point}>
                  <span className="aq-product-check">
                    <CheckIcon />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 28 }}>
              <Link className="aq-listing-cta" to="/contact/">
                Free Site Visit
              </Link>
            </div>
          </Reveal>
        </motion.div>
      </section>
    </main>
  )
}
