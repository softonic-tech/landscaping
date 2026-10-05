import { useEffect } from 'react'
import Branded from '../components/Branded'
import ContactForm from '../components/ContactForm'
import Hero from '../components/Hero'
import Hyatt from '../components/Hyatt'
import Intro from '../components/Intro'
import LazySection from '../components/LazySection'
import ListingGrid from '../components/ListingGrid'
import OffPlanApartments from '../components/OffPlanApartments'
import OffPlanVillas from '../components/OffPlanVillas'
import Products from '../components/Products'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import { apartmentsBelowHyatt } from '../data/homepage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { warmImages } from '../lib/imageCache'

/** Shared homepage assets — warm once so repeated cards paint instantly. */
const HOME_IMAGES = [
  '/assets/garden.png',
  '/assets/pool.png',
  '/assets/area-green.webp',
  '/assets/area-villa.webp',
  '/assets/area-urban.webp',
  '/assets/area-waterfront.webp',
  '/assets/irrigation.webp',
  '/assets/lighting.webp',
  '/assets/pergola.webp',
  '/assets/turf.webp',
]

export default function Home() {
  useDocumentTitle(
    'Landscaping & Swimming Pool Maintenance in Dubai | NAM Landscaping',
    'Premium garden landscaping, maintenance and swimming pool care across Dubai, by one trusted team.',
  )

  useEffect(() => {
    // Don't compete with first paint / scroll on mobile — warm during idle
    const ric = window.requestIdleCallback
    const start = () => warmImages(HOME_IMAGES)
    if (ric) {
      const id = ric(start, { timeout: 1800 })
      return () => window.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 600)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <main>
      <Hero />

      <LazySection skeleton="block">
        <Intro />
      </LazySection>

      <LazySection skeleton="cards">
        <Products />
      </LazySection>

      <LazySection skeleton="split">
        <Team />
      </LazySection>

      <LazySection skeleton="listings">
        <OffPlanApartments />
      </LazySection>

      <LazySection skeleton="band">
        <Hyatt />
      </LazySection>

      <LazySection skeleton="listings">
        <ListingGrid listings={apartmentsBelowHyatt} label="Featured Dubai projects" />
      </LazySection>

      <LazySection skeleton="listings">
        <OffPlanVillas />
      </LazySection>

      <LazySection skeleton="cards">
        <Branded />
      </LazySection>

      <LazySection skeleton="block">
        <ContactForm />
      </LazySection>

      <LazySection skeleton="band">
        <Testimonials />
      </LazySection>
    </main>
  )
}
