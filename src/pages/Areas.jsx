import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ProgressiveImage from '../components/ProgressiveImage'
import Reveal, { fadeUp, staggerContainer } from '../components/Reveal'
import { brandedBrands } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const areas = [
  {
    title: 'Palm Jumeirah & Coastal',
    text: 'Salt-tolerant planting, corrosion-resistant pool equipment and finishes that hold up beside the sea.',
    image: '/assets/area-waterfront.webp',
    tags: ['Palm Jumeirah', 'Jumeirah Islands', 'Umm Suqeim', 'Jumeirah'],
  },
  {
    title: 'Established Communities',
    text: 'Mature palms, ageing irrigation and pools due their first renovation — expertise that rewards care.',
    image: '/assets/area-villa.webp',
    tags: ['Emirates Hills', 'The Meadows', 'The Springs', 'Jumeirah Golf Estates'],
  },
  {
    title: 'Family Neighbourhoods',
    text: 'Play lawns, pet-friendly turf, shaded terraces and family pools on dependable weekly care.',
    image: '/assets/area-green.webp',
    tags: ['Arabian Ranches', 'Damac Hills', 'Mudon', 'Mirdif'],
  },
  {
    title: 'New Handovers',
    text: 'Bare plots to complete gardens and pools, with community NOC support from day one.',
    image: '/assets/area-urban.webp',
    tags: ['Dubai Hills Estate', 'Tilal Al Ghaf', 'JVC', 'MBR City'],
  },
]

export default function Areas() {
  useDocumentTitle(
    'Areas We Serve in Dubai | NAM Landscaping',
    'Landscaping and pool care across Dubai’s communities.',
  )

  return (
    <main>
      <PageHero
        title="Areas We Serve"
        subtitle="Landscaping and pool care across Dubai"
        image="/assets/area-waterfront.webp"
      />

      <section className="aq-areas" aria-label="Dubai communities">
        <div className="aq-areas-inner">
          <Reveal className="aq-areas-head">
            <h2>Local Knowledge Matters</h2>
            <p>
              Dubai is not one garden — coastal villas, mature estates and new handovers each need
              different planting, soil care and community know-how. We already know what survives in
              each.
            </p>
            <ul className="aq-areas-chips" aria-label="Communities we serve">
              {brandedBrands.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Reveal>

          <motion.div
            className="aq-areas-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {areas.map((item) => (
              <motion.article key={item.title} className="aq-areas-card" variants={fadeUp}>
                <div className="aq-areas-media">
                  <ProgressiveImage src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="aq-areas-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
