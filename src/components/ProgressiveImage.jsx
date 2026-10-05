import { useEffect, useState } from 'react'
import {
  getPlaceholder,
  isImageCached,
  loadImage,
  markImageCached,
  resolveImageSrc,
} from '../lib/imageCache'

/**
 * Blur-up image: tiny inlined LQIP paints immediately, full image fades in.
 * Shared cache means repeated assets skip the wait after the first load.
 */
export default function ProgressiveImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  style,
}) {
  const resolved = resolveImageSrc(src)
  const placeholder = getPlaceholder(src) || getPlaceholder(resolved)
  const alreadyCached = isImageCached(resolved)
  const [loaded, setLoaded] = useState(alreadyCached)

  useEffect(() => {
    let cancelled = false

    if (isImageCached(resolved)) {
      setLoaded(true)
      return undefined
    }

    setLoaded(false)

    loadImage(resolved)
      .then(() => {
        if (cancelled) return
        requestAnimationFrame(() => {
          if (!cancelled) setLoaded(true)
        })
      })
      .catch(() => {
        if (cancelled) return
        // Still clear loading state so LazySection can finish
        setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [resolved, src])

  const classes = ['aq-progressive', className, loaded ? 'is-loaded' : 'is-loading']
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} style={style}>
      {placeholder ? (
        <img
          className={`aq-progressive__lqip ${imgClassName}`.trim()}
          src={placeholder}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      ) : (
        <span className="aq-progressive__skeleton" aria-hidden="true" />
      )}
      <img
        className={`aq-progressive__full ${imgClassName}`.trim()}
        src={resolved || src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        onLoad={() => {
          markImageCached(resolved || src)
          setLoaded(true)
        }}
      />
    </span>
  )
}
