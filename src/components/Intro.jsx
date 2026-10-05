import { Link } from 'react-router-dom'
import ProgressiveImage from './ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from './Reveal'
import { site } from '../data/content'

export default function Intro() {
  return (
    <section className="aq-intro" aria-label={`Welcome to ${site.shortName}`}>
      <div className="aq-intro-inner">
        <Reveal className="aq-intro-top">
          <div className="aq-intro-heading">
            <span className="aq-label">{site.shortName}</span>
            <h2 className="aq-intro-title">{site.tagline}</h2>
          </div>
          <p className="aq-intro-copy">
            {site.commitment}. Design, install, maintain and renovate outdoor spaces across Dubai
            with quality work and reliable service.
          </p>
        </Reveal>

        <InViewGroup className="aq-intro-collage" amount={0.25}>
          <InViewItem className="aq-intro-main">
            <ProgressiveImage
              src="/assets/garden.png"
              alt="Premium villa garden landscaping"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem>
            <Link to="/projects/" className="aq-stat-card aq-stat-card--listings">
              <span className="aq-stat-value">1,000+</span>
              <span className="aq-stat-label">Projects delivered</span>
            </Link>
          </InViewItem>

          <InViewItem className="aq-intro-side">
            <ProgressiveImage
              src="/assets/area-villa.webp"
              alt="Villa outdoor living landscaping"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem className="aq-intro-bottom">
            <ProgressiveImage
              src="/assets/irrigation.webp"
              alt="Irrigation and garden care"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem>
            <button type="button" className="aq-stat-card aq-stat-card--branded">
              <span className="aq-stat-value">Quality</span>
              <span className="aq-stat-label">Reliable · Satisfied clients</span>
            </button>
          </InViewItem>
        </InViewGroup>
      </div>
    </section>
  )
}
