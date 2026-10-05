import { Link } from 'react-router-dom'
import useLiteMotion from '../hooks/useLiteMotion'
import ProgressiveImage from './ProgressiveImage'
import Reveal, { InViewGroup, InViewItem, fadeUp } from './Reveal'
import { motion } from 'framer-motion'

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
    title: 'Design & Installation',
    description: 'Full landscaping design and installation — lawns, planting, shade and hardscape.',
    features: ['Garden design & install', 'Planting plans', 'Hardscape finishes'],
  },
  {
    to: '/services/',
    image: '/assets/garden.png',
    title: 'Garden Maintenance',
    description: 'Scheduled visits that keep gardens healthy, tidy and ready to enjoy.',
    features: ['Weekly visits', 'Lawn care', 'Seasonal planting'],
  },
  {
    to: '/services/',
    image: '/assets/irrigation.webp',
    title: 'Irrigation Systems',
    description: 'Smart drip and sprinkler systems that keep gardens thriving with less water.',
    features: ['Smart drip systems', 'Sprinkler repair', 'Water-wise zoning'],
  },
  {
    to: '/services/',
    image: '/assets/area-urban.webp',
    title: 'Hardscaping',
    description: 'Pavers, pathways and walls built for everyday outdoor living.',
    features: ['Pavers & pathways', 'Retaining walls', 'Outdoor upgrades'],
  },
]

const MotionLink = motion.create(Link)

function ProductCard({ item }) {
  const lite = useLiteMotion()
  const body = (
    <>
      <div className="aq-product-media">
        <ProgressiveImage src={item.image} alt="" loading="lazy" />
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
    </>
  )

  if (lite) {
    return (
      <Link to={item.to} className="aq-product-card">
        {body}
      </Link>
    )
  }

  return (
    <MotionLink to={item.to} className="aq-product-card" variants={fadeUp}>
      {body}
    </MotionLink>
  )
}

export default function Products() {
  return (
    <section className="aq-products" aria-label="Outdoor services">
      <div className="aq-products-inner">
        <Reveal className="aq-products-head">
          <h2 className="aq-products-title">Our Landscaping Services</h2>
          <p className="aq-products-copy">
            Your vision, our landscaping — design, maintenance, irrigation, hardscaping and more,
            by one accountable Dubai team.
          </p>
        </Reveal>

        <InViewGroup className="aq-products-grid" amount={0.15}>
          {products.map((item) => (
            <ProductCard key={item.title} item={item} />
          ))}
        </InViewGroup>
      </div>
    </section>
  )
}
