import ProgressiveImage from './ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from './Reveal'
import { site, teamPoints } from '../data/content'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

export default function Team() {
  return (
    <section className="aq-team" aria-label="Why Sunny Star">
      <InViewGroup className="aq-team-inner" amount={0.2}>
        <InViewItem className="aq-team-media">
          <ProgressiveImage
            src="/assets/area-green.webp"
            alt={`${site.name} landscaping work`}
            loading="lazy"
          />
          <span className="aq-team-label">{site.values.join(' · ')}</span>
        </InViewItem>

        <Reveal className="aq-team-content" delay={0.08}>
          <h2 className="aq-team-title">{site.slogan}</h2>
          <p className="aq-team-copy">
            {site.name} delivers green spaces and beautiful places — design, installation,
            maintenance and makeovers under one trusted team.
          </p>

          <h3 className="aq-team-sub">How we work</h3>
          <p className="aq-team-copy aq-team-copy--hosp">
            Clear scope, clear price, and no surprises mid-project. From lawn care to hardscaping,
            we do it all with quality work and reliable service.
          </p>

          <ul className="aq-team-features">
            {teamPoints.map((feature) => (
              <li key={feature}>
                <span className="aq-product-check">
                  <CheckIcon />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </InViewGroup>
    </section>
  )
}
