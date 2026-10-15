import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous scroll position by default.
// Scroll to the #hash target when there is one, otherwise to the top.
// Pages load on demand, so the target may appear a moment after navigation.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    let frame = 0
    const started = performance.now()
    const scrollToTarget = () => {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
      } else if (performance.now() - started < 3000) {
        frame = requestAnimationFrame(scrollToTarget)
      }
    }
    scrollToTarget()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
