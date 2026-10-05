import ListingGrid from '../components/ListingGrid'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { apartmentsBelowHyatt, villaListings } from '../data/homepage'
import { site } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Projects() {
  useDocumentTitle(
    `Landscaping Projects in Dubai | ${site.name}`,
    'Gardens, outdoor living and landscaping projects across Dubai.',
  )

  return (
    <main>
      <PageHero
        title="Our Projects"
        subtitle="Green spaces and beautiful places across Dubai"
        image="/assets/area-villa.webp"
      />

      <SectionTitle
        title="Featured Dubai Projects"
        subtitle="A sample of the gardens and outdoor spaces we deliver across Dubai."
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
