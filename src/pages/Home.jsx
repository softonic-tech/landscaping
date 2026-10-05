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
import { site } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { warmImages } from '../lib/imageCache'

/** Shared homepage assets — warm once so repeated cards paint instantly. */
const HOME_IMAGES = [
  '/assets/hero.png',
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
    `Landscaping in Dubai | ${site.name}`,
    `${site.tagline}. ${site.slogan}. Premium garden design, maintenance and outdoor care across Dubai.`,
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

      <LazySection skeleton="block" maxWaitMs={1200}>
        <Intro />
      </LazySection>

      <LazySection skeleton="cards" maxWaitMs={1400}>
        <Products />
      </LazySection>

      <LazySection skeleton="split" maxWaitMs={1400}>
        <Team />
      </LazySection>

      <LazySection skeleton="listings" maxWaitMs={1400}>
        <OffPlanApartments />
      </LazySection>

      <LazySection skeleton="band" maxWaitMs={1200}>
        <Hyatt />
      </LazySection>

      <LazySection skeleton="listings" maxWaitMs={1600}>
        <ListingGrid listings={apartmentsBelowHyatt} label="Featured Dubai projects" />
      </LazySection>

      <LazySection skeleton="listings" maxWaitMs={1600}>
        <OffPlanVillas />
      </LazySection>

      <LazySection skeleton="cards" maxWaitMs={1400}>
        <Branded />
      </LazySection>

      <LazySection skeleton="block" eager>
        <ContactForm />
      </LazySection>

      <LazySection skeleton="band" eager>
        <Testimonials />
      </LazySection>
    </main>
  )
}
