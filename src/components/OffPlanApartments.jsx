import ListingGrid from './ListingGrid'
import SectionTitle from './SectionTitle'

const listings = [
  {
    id: 'pkg-landscaping',
    title: 'Landscaping',
    price: 'Design & build',
    details: 'Full villa garden design and build — lawns, planting, shade and hardscape.',
    images: ['/assets/garden.png'],
  },
  {
    id: 'pkg-garden-maint',
    title: 'Garden Maintenance',
    price: 'Scheduled visits',
    details: 'Scheduled visits that keep lawns green and irrigation tuned for Dubai heat.',
    images: ['/assets/area-green.webp'],
  },
  {
    id: 'pkg-pool-maint',
    title: 'Pool Maintenance',
    price: 'Weekly care',
    details: 'Weekly testing, balancing and equipment checks for a clear, swim-ready pool.',
    images: ['/assets/pool.png'],
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
        subtitle="Garden landscaping, maintenance and swimming pool care across Dubai."
      />
      <ListingGrid listings={listings} label="Featured landscaping services" />
    </>
  )
}
