import { Link } from 'react-router-dom'

export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <img src={property.image} alt={property.title} loading="lazy" />
      <div className="property-body">
        <h3>{property.title}</h3>
        <div className="property-price">{property.price}</div>
        <p className="property-meta">{property.details}</p>
        <Link className="btn btn-teal" to="/contact/">
          Contact Us
        </Link>
      </div>
    </article>
  )
}
