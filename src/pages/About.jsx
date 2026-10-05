import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ProgressiveImage from '../components/ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from '../components/Reveal'
import { site, teamPoints } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

export default function About() {
  useDocumentTitle(
    `About Us | ${site.name}`,
    `${site.name} — ${site.tagline}. Quality work, reliable service and customer satisfaction.`,
  )

  return (
    <main>
      <PageHero
        title="About Us"
        subtitle={site.slogan}
        image="/assets/area-green.webp"
      />

      <section className="aq-team" aria-label={`About ${site.name}`}>
        <InViewGroup className="aq-team-inner" amount={0.2}>
          <InViewItem className="aq-team-media">
            <ProgressiveImage
              src="/assets/garden.png"
              alt={`${site.name} landscaping team`}
              loading="lazy"
            />
            <span className="aq-team-label">{site.values[0]}</span>
          </InViewItem>

          <Reveal className="aq-team-content" delay={0.08}>
            <h2 className="aq-team-title">{site.tagline}</h2>
            <p className="aq-team-copy">
              {site.name} turns outdoor visions into green, beautiful places — from small gardens
              to large villa landscapes across Dubai.
            </p>

            <h3 className="aq-team-sub">What we stand for</h3>
            <p className="aq-team-copy aq-team-copy--hosp">
              Quality work, reliable service and customer satisfaction on every project. One
              accountable team for design, installation, maintenance and makeovers.
            </p>

            <ul className="aq-team-features">
              {teamPoints.map((point) => (
                <li key={point}>
                  <span className="aq-product-check">
                    <CheckIcon />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 28 }}>
              <Link className="aq-listing-cta" to="/contact/">
                Free Site Visit
              </Link>
            </div>
          </Reveal>
        </InViewGroup>
      </section>
    </main>
  )
}
