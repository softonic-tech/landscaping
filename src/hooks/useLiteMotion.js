import { useEffect, useState } from 'react'

function readLite() {
  if (typeof window === 'undefined') return true
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 900px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return reduced || mobile || coarse
}

/** True on mobile / touch / reduced-motion — skip heavy Framer work. */
export default function useLiteMotion() {
  const [lite, setLite] = useState(readLite)

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 900px)')
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')

    const update = () => setLite(readLite())
    update()

    mqMobile.addEventListener('change', update)
    mqReduced.addEventListener('change', update)
    mqCoarse.addEventListener('change', update)
    return () => {
      mqMobile.removeEventListener('change', update)
      mqReduced.removeEventListener('change', update)
      mqCoarse.removeEventListener('change', update)
    }
  }, [])

  return lite
}
