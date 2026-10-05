import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProgressiveImage from '../components/ProgressiveImage'
import Reveal, { InViewGroup } from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

const services = [
  {
    title: 'Landscaping',
    text: 'Complete garden design and build — planting, hardscape, shade and lighting.',
    image: '/assets/area-green.webp',
    features: ['Concept to build', 'Planting & hardscape', 'Shade & lighting'],
  },
  {
    title: 'Garden Maintenance',
    text: 'Weekly or bi-weekly visits with a report after every visit.',
    image: '/assets/garden.png',
    features: ['Weekly visits', 'Seasonal planting', 'Visit reports'],
  },
  {
    title: 'Pool Maintenance',
    text: 'Water testing, chemical balancing and equipment checks on schedule.',
    image: '/assets/pool.png',
    features: ['Water testing', 'Chemical balancing', 'Equipment checks'],
  },
  {
    title: 'Pool Cleaning',
    text: 'Vacuuming, brushing, skimming and deep cleans after sandstorms.',
    image: '/assets/pool.png',
    features: ['Vacuuming & brushing', 'Filter care', 'Deep cleans'],
  },
  {
    title: 'Pool Repair',
    text: 'Pumps, filters, leaks and tiling — diagnosed honestly, fixed fast.',
    image: '/assets/pool.png',
    features: ['Leak detection', 'Equipment repair', 'Tiling & lighting'],
  },
  {
    title: 'Pool Construction',
    text: 'New villa pools — structure, finishes, equipment and clean handover.',
    image: '/assets/pool.png',
    features: ['Villa pool design', 'Premium finishes', 'Care plan handover'],
  },
  {
    title: 'Irrigation Systems',
    text: 'Smart drip and sprinkler systems that cut water waste.',
    image: '/assets/irrigation.webp',
    features: ['Smart drip systems', 'Sprinkler repair', 'Water-wise zoning'],
  },
  {
    title: 'Artificial Grass',
    text: 'Premium, pet-friendly turf with proper base preparation.',
    image: '/assets/turf.webp',
    features: ['UV-stable turf', 'Pet-friendly', 'Proper base prep'],
  },
  {
    title: 'Pergolas & Shade',
    text: 'Aluminium and timber pergolas that make terraces usable in summer.',
    image: '/assets/pergola.webp',
    features: ['Aluminium & timber', 'Canopies & sails', 'Summer-ready shade'],
  },
  {
    title: 'Landscape Lighting',
    text: 'Warm path lights, uplights and feature lighting for evenings outdoors.',
    image: '/assets/lighting.webp',
    features: ['Path lights', 'Uplights', 'Feature lighting'],
  },
  {
    title: 'Hardscaping',
    text: 'Pathways, decking and seating built for the Gulf climate.',
    image: '/assets/area-urban.webp',
    features: ['Pathways & decking', 'Seating areas', 'Gulf-ready materials'],
  },
  {
    title: 'Annual Contracts',
    text: 'One contract for garden and pool — scheduled visits and priority call-outs.',
    image: '/assets/area-villa.webp',
    features: ['Garden + pool', 'Priority call-outs', 'Consistent quality'],
  },
]

export default function Services() {
  useDocumentTitle(
    'Landscaping & Pool Services in Dubai | NAM Landscaping',
    'Twelve specialist services, one accountable team — landscaping, pools and outdoor living in Dubai.',
  )

  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Landscaping and pool care under one roof"
        image="/assets/pool.png"
      />

      <section className="aq-products" aria-label="Service list">
        <div className="aq-products-inner">
          <Reveal className="aq-products-head">
            <h2 className="aq-products-title">Services Under One Roof</h2>
            <p className="aq-products-copy">
              Garden landscaping, maintenance, swimming pool care, irrigation, artificial grass,
              pergolas and hardscaping — one accountable Dubai team.
            </p>
          </Reveal>

          <InViewGroup className="aq-products-grid" amount={0.1}>
            {services.map((item) => (
              <Link key={item.title} to="/contact/" className="aq-product-card">
                <div className="aq-product-media">
                  <ProgressiveImage src={item.image} alt="" loading="lazy" />
                </div>
                <div className="aq-product-body">
                  <h3 className="aq-product-name">{item.title}</h3>
                  <p className="aq-product-desc">{item.text}</p>
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
              </Link>
            ))}
          </InViewGroup>
        </div>
      </section>
    </main>
  )
}
