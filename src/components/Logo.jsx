import { Link } from 'react-router-dom'
import { site } from '../data/content'

export default function Logo() {
  return (
    <Link to="/" className="aq-logo" aria-label={`${site.name} home`}>
      <img src={site.logo} alt={site.name} width={168} height={78} />
    </Link>
  )
}
