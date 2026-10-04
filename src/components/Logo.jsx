import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="aq-logo" aria-label="NAM Landscaping home">
      <img src="/assets/aqualina/logo.png" alt="NAM Landscaping" width={63} height={98} />
    </Link>
  )
}
