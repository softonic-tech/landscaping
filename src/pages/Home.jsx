import Branded from '../components/Branded'
import ContactForm from '../components/ContactForm'
import Hero from '../components/Hero'
import Hyatt from '../components/Hyatt'
import Intro from '../components/Intro'
import ListingGrid from '../components/ListingGrid'
import OffPlanApartments from '../components/OffPlanApartments'
import OffPlanVillas from '../components/OffPlanVillas'
import Products from '../components/Products'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import { apartmentsBelowHyatt } from '../data/homepage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle(
    'Landscaping & Swimming Pool Maintenance in Dubai | NAM Landscaping',
    'Premium garden landscaping, maintenance and swimming pool care across Dubai, by one trusted team.',
  )

  return (
    <main>
      <Hero />
      <Intro />
      <Products />
      <Team />
      <OffPlanApartments />
      <Hyatt />
      <ListingGrid listings={apartmentsBelowHyatt} label="Featured Dubai projects" />
      <OffPlanVillas />
      <Branded />
      <ContactForm />
      <Testimonials />
    </main>
  )
}
