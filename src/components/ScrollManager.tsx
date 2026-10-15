import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Client-side navigation keeps the previous scroll position by default.
// Scroll to the #hash target when there is one, otherwise to the top.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
