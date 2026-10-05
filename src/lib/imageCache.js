import { imagePlaceholders, optimizedImages } from '../data/imagePlaceholders'

/** In-memory cache so repeated images paint full-quality instantly after first load. */
const loaded = new Set()
const inflight = new Map()

export function resolveImageSrc(src) {
  if (!src) return src
  return optimizedImages[src] || src
}

export function getPlaceholder(src) {
  if (!src) return null
  return imagePlaceholders[src] || imagePlaceholders[resolveImageSrc(src)] || null
}

export function isImageCached(src) {
  const resolved = resolveImageSrc(src)
  return loaded.has(resolved)
}

export function markImageCached(src) {
  loaded.add(resolveImageSrc(src))
}

export function loadImage(src) {
  const resolved = resolveImageSrc(src)
  if (!resolved) return Promise.resolve(null)
  if (loaded.has(resolved)) return Promise.resolve(resolved)

  if (inflight.has(resolved)) return inflight.get(resolved)

  const promise = new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      loaded.add(resolved)
      inflight.delete(resolved)
      resolve(resolved)
    }
    img.onerror = (err) => {
      inflight.delete(resolved)
      reject(err)
    }
    img.src = resolved
  })

  inflight.set(resolved, promise)
  return promise
}

/** Prefetch a list of images in the background (deduped). */
export function warmImages(srcs = []) {
  srcs.forEach((src) => {
    loadImage(src).catch(() => {})
  })
}
