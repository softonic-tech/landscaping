import { brandedBrands } from '../data/content'
import { brandedResidences } from '../data/homepage'
import ProgressiveImage from './ProgressiveImage'
import Reveal, { InViewGroup, InViewItem } from './Reveal'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
    <path
      d="M8.5,20c-.398,0-.78-.158-1.061-.439L1.086,13.207c-.39-.391-.39-1.024,0-1.414l.707-.707c.391-.391,1.024-.391,1.414,0l5.293,5.293L20.793,4.086c.391-.391,1.024-.391,1.414,0l.707,.707c.391,.391,.391,1.024,0,1.414l-13.353,13.354c-.281,.281-.663.439-1.061.439Z"
      fill="currentColor"
    />
  </svg>
)

function IntroWithCommunities() {
  return (
    <p className="aq-branded-intro">
      We serve villas, residential communities and commercial properties across Dubai, including{' '}
      {brandedBrands.map((name, i) => (
        <span key={name}>
          <strong>{name}</strong>
          {i < brandedBrands.length - 2 ? ', ' : i === brandedBrands.length - 2 ? ' and ' : ''}
        </span>
      ))}
      , among others.
    </p>
  )
}

export default function Branded() {
  return (
    <section className="aq-branded" aria-label="Dubai communities">
      <div className="aq-branded-inner">
        <Reveal className="aq-branded-head">
          <h2>Villas, Communities &amp; Commercial</h2>
          <IntroWithCommunities />
          <p className="aq-branded-sub">
            From a tired lawn in Arabian Ranches to a full garden makeover on Palm Jumeirah, we
            design, install and maintain outdoors that always look their best.
          </p>
        </Reveal>

        <InViewGroup className="aq-branded-grid" amount={0.15}>
          {brandedResidences.map((item) => (
            <InViewItem key={item.id} as="article" className="aq-branded-card">
              <div className="aq-branded-media">
                <ProgressiveImage src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="aq-branded-body">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <span className="aq-product-check">
                        <CheckIcon />
                      </span>
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </InViewItem>
          ))}
        </InViewGroup>
      </div>
    </section>
  )
}
