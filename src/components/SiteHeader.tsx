import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export type NavItem = { label: string; href: string }

type SiteHeaderProps = {
  brandRole: string
  navItems: NavItem[]
  cta: NavItem
}

// Fixed top navigation shared by every audience homepage. Each route passes
// its own links so /qa, /it, and /va never expose each other's navigation.
export default function SiteHeader({ brandRole, navItems, cta }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-name">KEN ROMERO</span>
          <span className="brand-role">{brandRole}</span>
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={cta.href} onClick={closeMenu}>
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  )
}
