import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import { site } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.5.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1L6.6 10.8Z"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.78 14.09c-.24.68-1.41 1.24-1.95 1.32-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.24-5-4.43-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.38-.44.51-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.67.79 1.96.93.28.14.48.21.55.33.07.12.07.69-.17 1.37Z"
      />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.4 3.2 1.9-.9 1.5L11 13.5V7h2v5.4Z"
      />
    </svg>
  )
}

export default function Contact() {
  useDocumentTitle(
    `Contact Us | Free Site Visit | ${site.name}`,
    `Book your free site visit. Call Riaz or Najeeb, WhatsApp or email ${site.email}.`,
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
          <aside className="aq-contact-aside">
            <h2>No Pressure, No Obligation</h2>
            <p>
              Reach {site.shortName} for a free site visit. Quality work, reliable service and
              customer satisfaction — {site.commitment.toLowerCase()}.
            </p>

            <div className="aq-contact-cards">
              {site.contacts.map((contact) => (
                <a
                  key={contact.name}
                  className="aq-contact-card aq-contact-card--wide"
                  href={contact.phoneHref}
                >
                  <span className="aq-contact-card__icon" aria-hidden="true">
                    <IconPhone />
                  </span>
                  <span className="aq-contact-card__body">
                    <span className="aq-contact-card__label">Call {contact.name}</span>
                    <span className="aq-contact-card__value">{contact.phone}</span>
                  </span>
                </a>
              ))}

              <a
                className="aq-contact-card aq-contact-card--wide"
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <span className="aq-contact-card__icon aq-contact-card__icon--whatsapp" aria-hidden="true">
                  <IconWhatsApp />
                </span>
                <span className="aq-contact-card__body">
                  <span className="aq-contact-card__label">WhatsApp</span>
                  <span className="aq-contact-card__value">Chat with us now</span>
                </span>
              </a>

              <a className="aq-contact-card aq-contact-card--wide" href={site.emailHref}>
                <span className="aq-contact-card__icon" aria-hidden="true">
                  <IconMail />
                </span>
                <span className="aq-contact-card__body">
                  <span className="aq-contact-card__label">Email</span>
                  <span className="aq-contact-card__value aq-contact-card__value--email">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>

            <div className="aq-contact-meta">
              <div className="aq-contact-meta__item">
                <span className="aq-contact-meta__icon" aria-hidden="true">
                  <IconPin />
                </span>
                <div>
                  <strong>Location</strong>
                  <span>{site.city}</span>
                </div>
              </div>
              <div className="aq-contact-meta__item">
                <span className="aq-contact-meta__icon" aria-hidden="true">
                  <IconClock />
                </span>
                <div>
                  <strong>Hours</strong>
                  <span>{site.hours}</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="aq-contact-page-form">
            <ContactForm embedded />
          </div>
        </div>
      </section>
    </main>
  )
}
