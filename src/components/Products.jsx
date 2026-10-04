import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal, { fadeUp, staggerContainer } from './Reveal'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

const products = [
  {
    to: '/services/',
    image: '/assets/area-green.webp',
    title: 'Landscaping',
    description: 'Full villa garden design and build — lawns, planting, shade and hardscape.',
    features: ['Garden design & build', 'Shade & lighting', 'Hardscape finishes'],
  },
  {
    to: '/services/',
    image: '/assets/garden.png',
    title: 'Garden Maintenance',
    description: 'Scheduled visits that keep lawns green and irrigation tuned for Dubai heat.',
    features: ['Weekly visits', 'Irrigation checks', 'Seasonal planting'],
  },
  {
    to: '/services/',
    image: '/assets/pool.png',
    title: 'Pool Maintenance',
    description: 'Weekly testing, balancing and equipment checks for a clear, swim-ready pool.',
    features: ['Water testing', 'Chemical balancing', 'Equipment checks'],
  },
  {
    to: '/services/',
    image: '/assets/irrigation.webp',
    title: 'Irrigation Systems',
    description: 'Smart drip and sprinkler systems that keep gardens thriving with less water.',
    features: ['Smart drip systems', 'Sprinkler repair', 'Water-wise zoning'],
  },
]

const MotionLink = motion.create(Link)

export default function Products() {
  return (
    <section className="aq-products" aria-label="Outdoor services">
      <div className="aq-products-inner">
        <Reveal className="aq-products-head">
          <h2 className="aq-products-title">Complete Outdoor Services</h2>
          <p className="aq-products-copy">
            Design, build and care — every outdoor service your Dubai property needs, by one
            accountable team.
          </p>
        </Reveal>

        <motion.div
          className="aq-products-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {products.map((item) => (
            <MotionLink
              key={item.title}
              to={item.to}
              className="aq-product-card"
              variants={fadeUp}
            >
              <div className="aq-product-media">
                <img src={item.image} alt="" />
              </div>
              <div className="aq-product-body">
                <h3 className="aq-product-name">{item.title}</h3>
                <p className="aq-product-desc">{item.description}</p>
                <ul className="aq-product-features">
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <span className="aq-product-check">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
