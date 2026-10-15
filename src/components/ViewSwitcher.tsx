import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const STORAGE_KEY = 'portfolio-view-switcher'

const views = [
  { label: 'Tech', path: '/qa' },
  { label: 'Creative', path: '/va' },
]

// Production visitors should only see the portfolio they were sent, so the
// switcher shows on localhost and preview deployments, or on the live domain
// after opting in once with ?switcher=on (?switcher=off hides it again).
function readPreference(search: string): boolean {
  const param = new URLSearchParams(search).get('switcher')
  try {
    if (param === 'on') localStorage.setItem(STORAGE_KEY, 'on')
    if (param === 'off') localStorage.removeItem(STORAGE_KEY)
    if (localStorage.getItem(STORAGE_KEY) === 'on') return true
  } catch {
    if (param === 'on') return true
  }
  if (param === 'off') return false
  const host = window.location.hostname
  return host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app')
}

function activeView(pathname: string) {
  if (pathname.startsWith('/va')) return '/va'
  return '/qa'
}

export default function ViewSwitcher() {
  const { pathname, search } = useLocation()
  const [visible, setVisible] = useState(() => readPreference(search))

  useEffect(() => {
    if (search.includes('switcher=')) setVisible(readPreference(search))
  }, [search])

  if (!visible) return null

  const current = activeView(pathname)

  return (
    <nav className="view-switcher" aria-label="Switch portfolio view">
      <span>View</span>
      {views.map((view) => (
        <Link
          key={view.path}
          to={view.path}
          className={view.path === current ? 'is-active' : ''}
          aria-current={view.path === current ? 'page' : undefined}
        >
          {view.label}
        </Link>
      ))}
    </nav>
  )
}
