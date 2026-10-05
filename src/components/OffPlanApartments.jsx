import ListingGrid from './ListingGrid'
import SectionTitle from './SectionTitle'

const listings = [
  {
    id: 'pkg-landscaping',
    title: 'Design & Installation',
    price: 'Full garden build',
    details: 'Complete landscaping design and installation — lawns, planting, shade and hardscape.',
    images: ['/assets/garden.png'],
  },
  {
    id: 'pkg-garden-maint',
    title: 'Garden Maintenance',
    price: 'Scheduled visits',
    details: 'Scheduled visits that keep gardens healthy, tidy and ready to enjoy.',
    images: ['/assets/area-green.webp'],
  },
  {
    id: 'pkg-lawn-care',
    title: 'Lawn Care & Grass Cutting',
    price: 'Regular lawn care',
    details: 'Regular lawn care, grass cutting and turf health for a clean, green finish.',
    images: ['/assets/turf.webp'],
  },
  {
    id: 'pkg-irrigation',
    title: 'Irrigation Systems',
    price: 'Smart water-wise systems',
    details: 'Smart drip and sprinkler systems that keep gardens thriving with less water.',
    images: ['/assets/irrigation.webp'],
  },
]

export default function OffPlanApartments() {
  return (
    <>
      <SectionTitle
        title="Featured Services"
        subtitle="Design, maintenance, lawn care and irrigation — from small gardens to big spaces."
      />
      <ListingGrid listings={listings} label="Featured landscaping services" />
    </>
  )
}
