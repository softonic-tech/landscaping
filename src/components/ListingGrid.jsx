import { Link } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'
import { InViewGroup, InViewItem } from './Reveal'

export default function ListingGrid({ listings, label = 'Listings' }) {
  return (
    <section className="aq-listings" aria-label={label}>
      <InViewGroup className="aq-listings-grid" amount={0.12}>
        {listings.map((item) => (
          <InViewItem key={item.id} as="article" className="aq-listing-card">
            <ImageCarousel images={item.images} alt={item.title} />
            <h3 className="aq-listing-title">{item.title}</h3>
            <p className="aq-listing-price">{item.price}</p>
            <p className="aq-listing-details">{item.details}</p>
            <Link className="aq-listing-cta" to="/contact/">
              Contact Us
            </Link>
          </InViewItem>
        ))}
      </InViewGroup>
    </section>
  )
}
