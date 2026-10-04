import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { site } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Contact() {
  useDocumentTitle(
    'Contact Us | Free Site Visit in Dubai | NAM Landscaping',
    'Book your free site visit. Call, WhatsApp or send the form.',
  )

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Free site visits anywhere in Dubai"
        image="/assets/lighting.webp"
        showCta={false}
      />

      <section className="aq-contact aq-contact--page" aria-label="Contact details and form">
        <div className="aq-contact-page">
          <Reveal className="aq-contact-aside">
            <span className="aq-label">Talk to us</span>
            <h2>No Pressure, No Obligation</h2>
            <p>
              The same licensed Dubai team that does the work — 50+ trained staff, 1,000+ projects
              delivered.
            </p>
            <div className="aq-contact-points">
              <p>
                <strong>Location</strong>
                <span>{site.city}</span>
              </p>
              <p>
                <strong>Phone</strong>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <strong>Email</strong>
                <a href={site.emailHref}>{site.email}</a>
              </p>
              <p>
                <strong>Hours</strong>
                <span>{site.hours}</span>
              </p>
              <p>
                <strong>WhatsApp</strong>
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  Message us on WhatsApp
                </a>
              </p>
            </div>
          </Reveal>

          <div className="aq-contact-page-form">
            <ContactForm embedded />
          </div>
        </div>
      </section>
    </main>
  )
}
