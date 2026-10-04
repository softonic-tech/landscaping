import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'
import { fadeUp, staggerContainer } from './Reveal'

export default function ListingGrid({ listings, label = 'Listings' }) {
  return (
    <section className="aq-listings" aria-label={label}>
      <motion.div
        className="aq-listings-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {listings.map((item) => (
          <motion.article key={item.id} className="aq-listing-card" variants={fadeUp}>
            <ImageCarousel images={item.images} alt={item.title} />
            <h3 className="aq-listing-title">{item.title}</h3>
            <p className="aq-listing-price">{item.price}</p>
            <p className="aq-listing-details">{item.details}</p>
            <Link className="aq-listing-cta" to="/contact/">
              Contact Us
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
