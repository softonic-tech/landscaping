import { useState } from 'react'
import { Link } from 'react-router-dom'
import { hyatt } from '../data/homepage'
import Reveal from './Reveal'

export default function Hyatt() {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="aq-hyatt" aria-label="One company one standard">
      <img className="aq-hyatt-bg" src={hyatt.image} alt="" />
      <div className="aq-hyatt-overlay" aria-hidden="true" />
      <Reveal className="aq-hyatt-inner" y={36} amount={0.3}>
        <h2 className="aq-hyatt-title">{hyatt.title}</h2>
        <p className="aq-hyatt-copy">{hyatt.description}</p>

        <div className="aq-hyatt-meta">
          <div>
            <span>Offer:</span> <strong>{hyatt.living}</strong>
          </div>
          <div>
            <span>Start with:</span> <strong>{hyatt.price}</strong>
          </div>
        </div>

        <Link className="aq-hyatt-brochure" to="/contact/">
          Free Site Visit
        </Link>

        <form
          className="aq-hyatt-form"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label className="aq-hyatt-field">
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971"
              required
            />
          </label>
          <button type="submit" className="aq-hyatt-submit">
            {sent ? 'Sent' : 'Submit'}
          </button>
        </form>
      </Reveal>
    </section>
  )
}
