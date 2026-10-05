import { useEffect, useRef, useState } from 'react'

function SectionSkeleton({ variant = 'block' }) {
  if (variant === 'cards') {
    return (
      <div className="aq-skel aq-skel--cards" aria-hidden="true">
        <div className="aq-skel__line aq-skel__line--title" />
        <div className="aq-skel__line aq-skel__line--sub" />
        <div className="aq-skel__grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aq-skel__card">
              <div className="aq-skel__media" />
              <div className="aq-skel__line" />
              <div className="aq-skel__line aq-skel__line--short" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'split') {
    return (
      <div className="aq-skel aq-skel--split" aria-hidden="true">
        <div className="aq-skel__media aq-skel__media--tall" />
        <div className="aq-skel__stack">
          <div className="aq-skel__line aq-skel__line--title" />
          <div className="aq-skel__line" />
          <div className="aq-skel__line" />
          <div className="aq-skel__line aq-skel__line--short" />
        </div>
      </div>
    )
  }

  if (variant === 'band') {
    return (
      <div className="aq-skel aq-skel--band" aria-hidden="true">
        <div className="aq-skel__line aq-skel__line--title aq-skel__line--center" />
        <div className="aq-skel__line aq-skel__line--sub aq-skel__line--center" />
        <div className="aq-skel__line aq-skel__line--cta aq-skel__line--center" />
      </div>
    )
  }

  if (variant === 'listings') {
    return (
      <div className="aq-skel aq-skel--listings" aria-hidden="true">
        <div className="aq-skel__grid aq-skel__grid--listings">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aq-skel__card">
              <div className="aq-skel__media aq-skel__media--listing" />
              <div className="aq-skel__line" />
              <div className="aq-skel__line aq-skel__line--short" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="aq-skel aq-skel--block" aria-hidden="true">
      <div className="aq-skel__line aq-skel__line--title" />
      <div className="aq-skel__line aq-skel__line--sub" />
      <div className="aq-skel__media aq-skel__media--wide" />
    </div>
  )
}

/** True when media is loaded, failed, or there is nothing to wait on. */
function sectionIsReady(root) {
  if (!root) return false

  const progressive = [...root.querySelectorAll('.aq-progressive')]
  if (progressive.length > 0) {
    // Ready when none are still loading (loaded or errored both drop is-loading)
    return progressive.every((el) => !el.classList.contains('is-loading'))
  }

  const imgs = [...root.querySelectorAll('img')].filter(
    (img) => !img.classList.contains('aq-progressive__lqip'),
  )
  if (!imgs.length) return true
  // complete covers both success and error; don't require naturalWidth
  return imgs.every((img) => img.complete)
}

/**
 * Shows a skeleton until the section is near the viewport and media has settled.
 * Always reveals within maxWaitMs so content can never get stuck.
 */
export default function LazySection({
  children,
  className = '',
  skeleton = 'block',
  rootMargin = '280px 0px',
  maxWaitMs = 1400,
  /** Skip gating — render children immediately (use for light sections). */
  eager = false,
}) {
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const [inRange, setInRange] = useState(eager)
  const [ready, setReady] = useState(eager)

  useEffect(() => {
    if (eager) return undefined
    const el = rootRef.current
    if (!el) return undefined

    let visible = false
    const reveal = () => {
      if (visible) return
      visible = true
      setInRange(true)
    }

    // Immediate check — IO can miss initially-visible nodes in some cases
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 0
    const margin = 280
    if (rect.top < vh + margin && rect.bottom > -margin) {
      reveal()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal()
      },
      { rootMargin, threshold: 0 },
    )
    io.observe(el)

    // Hard fallback so a section can never stay gated forever
    const boot = window.setTimeout(reveal, 800)

    return () => {
      io.disconnect()
      window.clearTimeout(boot)
    }
  }, [eager, rootMargin])

  useEffect(() => {
    if (eager || !inRange || ready) return undefined

    let cancelled = false
    let intervalId = 0

    const finish = () => {
      if (cancelled) return
      cancelled = true
      window.clearInterval(intervalId)
      setReady(true)
    }

    const check = () => {
      if (sectionIsReady(contentRef.current)) finish()
    }

    // Ref is set after paint — wait a frame before first check
    const raf = window.requestAnimationFrame(() => {
      check()
      intervalId = window.setInterval(check, 100)
    })

    const failsafe = window.setTimeout(finish, maxWaitMs)

    const onLoad = () => check()
    document.addEventListener('load', onLoad, true)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(raf)
      window.clearInterval(intervalId)
      window.clearTimeout(failsafe)
      document.removeEventListener('load', onLoad, true)
    }
  }, [eager, inRange, ready, maxWaitMs])

  return (
    <div
      ref={rootRef}
      className={`aq-lazy-section ${ready ? 'is-ready' : 'is-pending'} ${className}`.trim()}
    >
      {inRange ? (
        <div
          ref={contentRef}
          className={`aq-lazy-section__content${ready ? ' is-visible' : ''}`}
          aria-hidden={!ready}
        >
          {children}
        </div>
      ) : null}

      {!ready ? (
        <div className="aq-lazy-section__skel" aria-hidden="true">
          <SectionSkeleton variant={skeleton} />
        </div>
      ) : null}
    </div>
  )
}
