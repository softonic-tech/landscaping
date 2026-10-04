import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { testimonials } from '../data/homepage'

const Star = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="rgb(255, 222, 69)"
      d="M12.746,1.464l3.11,6.3L22.81,8.776a.831.831,0,0,1,.461,1.418l-5.033,4.9,1.188,6.926a.832.832,0,0,1-1.207.877L12,19.632,5.78,22.9a.833.833,0,0,1-1.207-.877l1.188-6.926L.729,10.194A.831.831,0,0,1,1.19,8.776l6.954-1.012,3.11-6.3A.832.832,0,0,1,12.746,1.464Z"
    />
  </svg>
)

function ReviewCard({ item }) {
  return (
    <article className="aq-review-card">
      <div className="aq-review-stars" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <p className="aq-review-quote">{item.quote}</p>
      <div className="aq-review-person">
        <img src={item.avatar} alt="" width={56} height={56} />
        <div>
          <strong>{item.name}</strong>
          <span>{item.place}</span>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    let frame = 0
    let x = 0
    const speed = 0.35

    const tick = () => {
      x -= speed
      const half = track.scrollWidth / 2
      if (Math.abs(x) >= half) x = 0
      track.style.transform = `translate3d(${x}px, 0, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const loop = [...testimonials, ...testimonials]

  return (
    <motion.section
      className="aq-testimonials"
      aria-label="Testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="aq-testimonials-viewport">
        <div className="aq-testimonials-track" ref={trackRef}>
          {loop.map((item, i) => (
            <ReviewCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
