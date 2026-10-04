import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { apartments, villas } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Marbella() {
  useDocumentTitle(
    'Marbella Luxury Properties | Aqualina',
    'Browse off-plan apartments and villas across Marbella and the Costa del Sol.',
  )

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--teal)' }}>
            Marbella
          </div>
          <h1>Luxury real estate on the Costa del Sol</h1>
          <p>
            From the Golden Mile to Estepona, Benahavís and Sotogrande — explore
            apartments and villas selected for lifestyle and investment quality.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-light" to="/contact/">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="eyebrow">Off-plan apartments</div>
          <h2 className="section-title">Apartments across the Costa del Sol</h2>
          <div className="property-grid">
            {apartments.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap">
          <div className="eyebrow">Off-plan villas</div>
          <h2 className="section-title">Villas in prestigious locations</h2>
          <div className="property-grid">
            {villas.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
