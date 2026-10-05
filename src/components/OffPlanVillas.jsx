import { villaListings } from '../data/homepage'
import ListingGrid from './ListingGrid'
import SectionTitle from './SectionTitle'

export default function OffPlanVillas() {
  return (
    <>
      <SectionTitle
        title="Villa Landscape Projects"
        subtitle="Gardens and outdoor living we deliver across Dubai — representative examples of our work."
      />
      <ListingGrid listings={villaListings} label="Villa landscape projects" />
    </>
  )
}
