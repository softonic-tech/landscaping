import { useEffect, useRef, useState } from 'react'
import useLiteMotion from '../hooks/useLiteMotion'

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

function sectionIsReady(root) {
  if (!root) return false
  const progressive = root.querySelectorAll('.aq-progressive')
  if (progressive.length > 0) {
    return [...progressive].every((el) => el.classList.contains('is-loaded'))
  }
  const imgs = [...root.querySelectorAll('img')].filter(
    (img) => !img.classList.contains('aq-progressive__lqip'),
  )
  if (!imgs.length) return true
  return imgs.every((img) => img.complete && img.naturalWidth > 0)
}

/**
 * Keeps a skeleton visible until the section is near the viewport and its
 * media has finished loading — especially important on mobile where Framer
 * + image decode can stall scroll.
 */
export default function LazySection({
  children,
  className = '',
  skeleton = 'block',
  rootMargin = '220px 0px',
  settleMs = 120,
  maxWaitMs = 3200,
}) {
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const lite = useLiteMotion()
  const [inRange, setInRange] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined

    // On desktop with roomy viewport, still gate with a short margin
    const margin = lite ? rootMargin : '120px 0px'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInRange(true)
      },
      { rootMargin: margin, threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lite, rootMargin])

  useEffect(() => {
    if (!inRange) return undefined
    let cancelled = false
    let settleTimer = 0
    const content = contentRef.current

    const markReady = () => {
      if (cancelled) return
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        if (!cancelled) setReady(true)
      }, settleMs)
    }

    const check = () => {
      if (cancelled) return
      if (sectionIsReady(content)) markReady()
    }

    check()
    const failsafe = window.setTimeout(markReady, maxWaitMs)

    const mo = content
      ? new MutationObserver(check)
      : null
    mo?.observe(content, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class'],
    })

    content?.addEventListener('load', check, true)

    const poll = window.setInterval(check, lite ? 120 : 200)

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      window.clearTimeout(settleTimer)
      window.clearInterval(poll)
      mo?.disconnect()
      content?.removeEventListener('load', check, true)
    }
  }, [inRange, settleMs, maxWaitMs, lite])

  return (
    <div
      ref={rootRef}
      className={`aq-lazy-section ${ready ? 'is-ready' : 'is-pending'} ${className}`.trim()}
    >
      {!ready ? <SectionSkeleton variant={skeleton} /> : null}
      {inRange ? (
        <div
          ref={contentRef}
          className="aq-lazy-section__content"
          aria-hidden={!ready}
          style={{
            // Keep layout warm under the skeleton; reveal when ready
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? 'auto' : 'none',
            position: ready ? 'relative' : 'absolute',
            inset: ready ? 'auto' : 0,
            width: '100%',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
