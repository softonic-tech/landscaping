import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProgressiveImage from '../components/ProgressiveImage'
import Reveal, { InViewGroup } from '../components/Reveal'
import { site } from '../data/content'
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
    title: 'Landscaping Design & Installation',
    text: 'Complete garden design and build — planting, hardscape, shade and finishing touches.',
    image: '/assets/area-green.webp',
    features: ['Concept to install', 'Planting plans', 'Full outdoor build'],
  },
  {
    title: 'Garden Maintenance',
    text: 'Scheduled visits that keep gardens healthy, tidy and ready to enjoy.',
    image: '/assets/garden.png',
    features: ['Weekly visits', 'Seasonal care', 'Visit reports'],
  },
  {
    title: 'Lawn Care & Grass Cutting',
    text: 'Regular lawn care, grass cutting and turf health for a clean, green finish.',
    image: '/assets/turf.webp',
    features: ['Grass cutting', 'Lawn recovery', 'Turf health'],
  },
  {
    title: 'Irrigation Systems',
    text: 'Smart drip and sprinkler systems that keep gardens thriving with less water waste.',
    image: '/assets/irrigation.webp',
    features: ['Smart drip systems', 'Sprinkler repair', 'Water-wise zoning'],
  },
  {
    title: 'Hardscaping',
    text: 'Pavers, pathways and walls built for everyday outdoor living in the Gulf climate.',
    image: '/assets/area-urban.webp',
    features: ['Pavers & pathways', 'Retaining walls', 'Gulf-ready materials'],
  },
  {
    title: 'Tree & Planting Services',
    text: 'Tree planting, shrubs and layered planting that look good and suit local conditions.',
    image: '/assets/area-villa.webp',
    features: ['Tree planting', 'Shrubs & borders', 'Seasonal colour'],
  },
  {
    title: 'Renovation & Makeover',
    text: 'Refresh tired outdoor spaces with a full landscaping renovation and makeover.',
    image: '/assets/area-waterfront.webp',
    features: ['Garden makeovers', 'Outdoor refresh', 'Before & after impact'],
  },
  {
    title: 'All Kinds of Landscaping Works',
    text: 'From small gardens to big spaces — one team for every landscaping need.',
    image: '/assets/pergola.webp',
    features: ['Residential gardens', 'Villa outdoors', 'Custom landscaping'],
  },
]

export default function Services() {
  useDocumentTitle(
    `Our Landscaping Services | ${site.name}`,
    `${site.tagline}. Design, maintenance, irrigation, hardscaping and more across Dubai.`,
  )

  return (
    <main>
      <PageHero
        title="Our Landscaping Services"
        subtitle={site.commitment}
        image="/assets/area-green.webp"
      />

      <section className="aq-products" aria-label="Service list">
        <div className="aq-products-inner">
          <Reveal className="aq-products-head">
            <h2 className="aq-products-title">Services Under One Roof</h2>
            <p className="aq-products-copy">
              {site.slogan}. Quality work, reliable service and customer satisfaction on every
              project.
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
