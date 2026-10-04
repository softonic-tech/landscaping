import ListingGrid from '../components/ListingGrid'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { apartmentsBelowHyatt, villaListings } from '../data/homepage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Projects() {
  useDocumentTitle(
    'Landscaping & Pool Projects in Dubai | NAM Landscaping',
    'Gardens, pools and outdoor living projects across Dubai.',
  )

  return (
    <main>
      <PageHero
        title="Our Projects"
        subtitle="Gardens and pools across Dubai’s communities"
        image="/assets/area-villa.webp"
      />

      <SectionTitle
        title="Featured Dubai Projects"
        subtitle="A sample of the gardens and pools we deliver across Dubai."
      />
      <ListingGrid listings={apartmentsBelowHyatt.slice(0, 8)} label="Featured Dubai projects" />

      <SectionTitle
        title="Villa Landscapes"
        subtitle="Estate and villa outdoor projects across Dubai."
      />
      <ListingGrid listings={villaListings.slice(0, 8)} label="Villa landscape projects" />
    </main>
  )
}
