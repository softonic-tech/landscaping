import { Link } from 'react-router-dom'
import { site } from '../data/content'

export default function Footer() {
  return (
    <footer className="aq-footer">
      <div className="aq-footer-inner">
        <Link to="/" className="aq-footer-brand" aria-label={`${site.name} home`}>
          <img src={site.logo} alt={site.name} width={220} height={132} />
        </Link>

        <p className="aq-footer-tagline">{site.tagline}</p>
        <p className="aq-footer-slogan">{site.slogan}</p>

        <div className="aq-footer-contacts">
          <span>{site.city}</span>
          <span>{site.hours}</span>
          {site.contacts.map((contact) => (
            <a key={contact.name} href={contact.phoneHref}>
              {contact.name}: {contact.phone}
            </a>
          ))}
          <a href={site.emailHref}>{site.email}</a>
        </div>

        <div className="aq-footer-social">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            WA
          </a>
        </div>

        <form
          className="aq-footer-news"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <p>Tell us about your garden — we&apos;ll arrange a free site visit.</p>
          <div className="aq-footer-news-row">
            <input type="email" name="email" placeholder="Your email" required />
            <button type="submit">Submit</button>
          </div>
        </form>

        <p className="aq-footer-commitment">{site.commitment}</p>
      </div>
    </footer>
  )
}
