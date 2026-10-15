import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous scroll position by default.
// Scroll to the #hash target when there is one, otherwise to the top.
// Pages load on demand, so the target may appear a moment after navigation.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Turn off the site's smooth scrolling while jumping, so a smooth scroll
    // still in progress on the previous page cannot carry on after it.
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    let frame = 0
    const started = performance.now()
    const finish = () => {
      root.style.scrollBehavior = previousBehavior
    }

    const jump = () => {
      const elapsed = performance.now() - started
      if (hash) {
        const target = document.getElementById(hash.slice(1))
        if (target) {
          target.scrollIntoView()
          return finish()
        }
        if (elapsed > 3000) return finish()
      } else {
        window.scrollTo(0, 0)
        // Hold the top for a few frames while the new page renders.
        if (elapsed > 150) return finish()
      }
      frame = requestAnimationFrame(jump)
    }
    jump()

    return () => {
      cancelAnimationFrame(frame)
      finish()
    }
  }, [pathname, hash])

  return null
}
