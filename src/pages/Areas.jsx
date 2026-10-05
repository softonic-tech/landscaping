import PageHero from '../components/PageHero'
import ProgressiveImage from '../components/ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from '../components/Reveal'
import { brandedBrands, site } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const areas = [
  {
    title: 'Palm Jumeirah & Coastal',
    text: 'Salt-tolerant planting and coastal finishes that hold up beside the sea.',
    image: '/assets/area-waterfront.webp',
    tags: ['Palm Jumeirah', 'Jumeirah Islands', 'Umm Suqeim', 'Jumeirah'],
  },
  {
    title: 'Established Communities',
    text: 'Mature palms, ageing irrigation and garden renovations that reward careful expertise.',
    image: '/assets/area-villa.webp',
    tags: ['Emirates Hills', 'The Meadows', 'The Springs', 'Jumeirah Golf Estates'],
  },
  {
    title: 'Family Neighbourhoods',
    text: 'Play lawns, pet-friendly turf, shaded terraces and dependable weekly garden care.',
    image: '/assets/area-green.webp',
    tags: ['Arabian Ranches', 'Damac Hills', 'Mudon', 'Mirdif'],
  },
  {
    title: 'New Handovers',
    text: 'Bare plots to complete gardens, with community NOC support from day one.',
    image: '/assets/area-urban.webp',
    tags: ['Dubai Hills Estate', 'Tilal Al Ghaf', 'JVC', 'MBR City'],
  },
]

export default function Areas() {
  useDocumentTitle(
    `Areas We Serve in Dubai | ${site.name}`,
    'Landscaping design, maintenance and outdoor care across Dubai’s communities.',
  )

  return (
    <main>
      <PageHero
        title="Areas We Serve"
        subtitle="Landscaping across Dubai’s communities"
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

          <InViewGroup className="aq-areas-grid" amount={0.12}>
            {areas.map((item) => (
              <InViewItem key={item.title} as="article" className="aq-areas-card">
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
              </InViewItem>
            ))}
          </InViewGroup>
        </div>
      </section>
    </main>
  )
}
