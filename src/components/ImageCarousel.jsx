import { useState } from 'react'
import ProgressiveImage from './ProgressiveImage'

export default function ImageCarousel({ images, alt = '' }) {
  const [index, setIndex] = useState(0)
  const slides = images?.length ? images : []
  if (!slides.length) return null

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div className="aq-carousel">
      <ProgressiveImage src={slides[index]} alt={alt} loading="lazy" />
      {slides.length > 1 ? (
        <>
          <button type="button" className="aq-carousel-btn aq-carousel-btn--prev" onClick={prev} aria-label="Previous image">
            ‹
          </button>
          <button type="button" className="aq-carousel-btn aq-carousel-btn--next" onClick={next} aria-label="Next image">
            ›
          </button>
          <div className="aq-carousel-dots" aria-hidden="true">
            {slides.map((_, i) => (
              <span key={i} className={i === index ? 'is-active' : ''} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
