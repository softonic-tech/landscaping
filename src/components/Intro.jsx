import { Link } from 'react-router-dom'
import ProgressiveImage from './ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from './Reveal'

export default function Intro() {
  return (
    <section className="aq-intro" aria-label="Welcome to Dubai">
      <div className="aq-intro-inner">
        <Reveal className="aq-intro-top">
          <div className="aq-intro-heading">
            <span className="aq-label">Dubai</span>
            <h2 className="aq-intro-title">Complete Outdoor Services</h2>
          </div>
          <p className="aq-intro-copy">
            Design, build and care — every outdoor service your Dubai property needs, delivered by
            one accountable team.
          </p>
        </Reveal>

        <InViewGroup className="aq-intro-collage" amount={0.25}>
          <InViewItem className="aq-intro-main">
            <ProgressiveImage
              src="/assets/garden.png"
              alt="Premium villa garden landscaping in Dubai"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem>
            <Link to="/projects/" className="aq-stat-card aq-stat-card--listings">
              <span className="aq-stat-value">1,000+</span>
              <span className="aq-stat-label">Projects across Dubai</span>
            </Link>
          </InViewItem>

          <InViewItem className="aq-intro-side">
            <ProgressiveImage
              src="/assets/area-villa.webp"
              alt="Dubai villa outdoor living"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem className="aq-intro-bottom">
            <ProgressiveImage
              src="/assets/pool.png"
              alt="Swimming pool maintenance in Dubai"
              loading="lazy"
            />
          </InViewItem>

          <InViewItem>
            <button type="button" className="aq-stat-card aq-stat-card--branded">
              <span className="aq-stat-value">10+ yrs</span>
              <span className="aq-stat-label">Serving Dubai outdoors</span>
            </button>
          </InViewItem>
        </InViewGroup>
      </div>
    </section>
  )
}
