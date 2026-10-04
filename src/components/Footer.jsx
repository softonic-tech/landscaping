import { site } from '../data/content'

export default function Footer() {
  return (
    <footer className="aq-footer">
      <div className="aq-footer-inner">
        <form
          className="aq-footer-news"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <p>Tell us about your garden or pool — we’ll arrange a free site visit in Dubai.</p>
          <div className="aq-footer-news-row">
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="aq-footer-brand">
          <strong className="aq-footer-wordmark">{site.name}</strong>
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

        <div className="aq-footer-contacts">
          <span>{site.city}</span>
          <span>{site.hours}</span>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.emailHref}>{site.email}</a>
        </div>
      </div>
    </footer>
  )
}
