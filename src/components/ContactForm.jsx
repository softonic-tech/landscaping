import { useState } from 'react'
import Reveal from './Reveal'

const countryOptions = [
  { code: '+971', label: 'UAE', flag: '🇦🇪' },
  { code: '+966', label: 'KSA', flag: '🇸🇦' },
  { code: '+974', label: 'Qatar', flag: '🇶🇦' },
  { code: '+973', label: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', label: 'Oman', flag: '🇴🇲' },
  { code: '+92', label: 'Pakistan', flag: '🇵🇰' },
  { code: '+1', label: 'US', flag: '🇺🇸' },
  { code: '+44', label: 'UK', flag: '🇬🇧' },
]

function FormFields() {
  const [sent, setSent] = useState(false)
  const [country, setCountry] = useState(countryOptions[0])
  const [phoneOpen, setPhoneOpen] = useState(false)

  return (
    <form
      className="aq-contact-form"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
        setPhoneOpen(false)
      }}
    >
      <div className="aq-contact-row">
        <label>
          <span>First name</span>
          <input name="firstName" placeholder="ex. Alex" required autoComplete="given-name" />
        </label>
        <label>
          <span>Last name</span>
          <input name="lastName" placeholder="ex. Weber" required autoComplete="family-name" />
        </label>
      </div>

      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          required
          autoComplete="email"
        />
      </label>

      <label className="aq-contact-phone">
        <span>Phone</span>
        <div className="aq-phone-field">
          <button
            type="button"
            className="aq-phone-code"
            aria-label="Select country code"
            aria-expanded={phoneOpen}
            onClick={() => setPhoneOpen((v) => !v)}
          >
            <span className="aq-phone-flag" aria-hidden="true">
              {country.flag}
            </span>
            <span className="aq-phone-caret" aria-hidden="true" />
          </button>
          <input type="hidden" name="countryCode" value={country.code} />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            required
            autoComplete="tel-national"
          />
          {phoneOpen ? (
            <ul className="aq-phone-menu" role="listbox">
              {countryOptions.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setCountry(item)
                      setPhoneOpen(false)
                    }}
                  >
                    <span aria-hidden="true">{item.flag}</span>
                    <span>
                      {item.label} {item.code}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </label>

      <button type="submit" className="aq-contact-submit">
        {sent ? 'Details sent' : 'Request a Free Visit'}
      </button>
    </form>
  )
}

export default function ContactForm({ embedded = false }) {
  if (embedded) {
    return (
      <div className="aq-contact-inner aq-contact-inner--embedded">
        <h2>Tell Us About Your Garden</h2>
        <p>Leave a few details and we&apos;ll arrange your free site visit anywhere in Dubai.</p>
        <FormFields />
      </div>
    )
  }

  return (
    <section className="aq-contact" aria-label="Contact form">
      <Reveal className="aq-contact-inner">
        <h2>Tell Us About Your Garden</h2>
        <p>Leave a few details and we&apos;ll arrange your free site visit anywhere in Dubai.</p>
        <FormFields />
      </Reveal>
    </section>
  )
}
