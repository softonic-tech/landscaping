import { Link } from 'react-router-dom'
import ProgressiveImage from '../components/ProgressiveImage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const ibizaHighlights = [
  {
    title: 'Ibiza Town & Marina',
    text: 'Apartments and penthouses near the harbour, dining and nightlife.',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'West Coast Villas',
    text: 'Cliffside homes with sunset views and private pools.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Countryside Fincas',
    text: 'Quiet estates surrounded by pine forest and open sky.',
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function Ibiza() {
  useDocumentTitle(
    'Ibiza Luxury Properties | Aqualina',
    'Discover luxury villas and apartments across Ibiza and the Balearic Islands.',
  )

  return (
    <main>
      <section
        className="page-hero"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,24,24,.72), rgba(10,24,24,.4)), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--teal)' }}>
            Ibiza
          </div>
          <h1>Luxury real estate in the Balearic Islands</h1>
          <p>
            From seafront apartments to private hillside villas, we help clients
            find homes that match Ibiza’s lifestyle — discreet, beautiful and
            well placed.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-light" to="/contact/">
              Talk to an Ibiza specialist
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="eyebrow">Areas of interest</div>
          <h2 className="section-title">Where clients look first</h2>
          <div className="property-grid">
            {ibizaHighlights.map((item) => (
              <article className="property-card" key={item.title}>
                <ProgressiveImage src={item.image} alt={item.title} loading="lazy" />
                <div className="property-body">
                  <h3>{item.title}</h3>
                  <p className="property-meta">{item.text}</p>
                  <Link className="btn btn-teal" to="/contact/">
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
