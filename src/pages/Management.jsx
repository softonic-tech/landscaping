import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const services = [
  {
    title: 'Owner representation',
    text: 'Clear reporting, trusted local coordination, and care that feels personal.',
  },
  {
    title: 'Rental management',
    text: 'Short and long-term rental programmes designed around your goals.',
  },
  {
    title: 'Property upkeep',
    text: 'Maintenance, vendor coordination and seasonal preparation for your home.',
  },
  {
    title: 'Guest hospitality',
    text: 'Arrival readiness, concierge-style support and hospitality-led service.',
  },
]

export default function Management() {
  useDocumentTitle(
    'Property Management | Aqualina',
    'Hospitality-led property management for luxury homes in Marbella and Ibiza.',
  )

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--teal)' }}>
            Property Management
          </div>
          <h1>Look after your home the way we look after our own</h1>
          <p>
            Our management approach is rooted in hospitality — careful attention,
            practical expertise, and service that protects both lifestyle and
            investment value.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-light" to="/contact/">
              Discuss management
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="eyebrow">What we handle</div>
          <h2 className="section-title">A complete management partnership</h2>
          <div className="property-grid">
            {services.map((item) => (
              <article className="testimonial" key={item.title}>
                <h3 style={{ marginBottom: 10 }}>{item.title}</h3>
                <p style={{ minHeight: 0 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
