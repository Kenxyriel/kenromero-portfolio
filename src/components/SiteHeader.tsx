import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import LogoMark from './LogoMark'

export type NavItem = { label: string; href: string }

function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  const main = document.querySelector('main')
  if (!main) return
  event.preventDefault()
  main.setAttribute('tabindex', '-1')
  main.focus()
}

type SiteHeaderProps = {
  brandRole: string
  navItems: NavItem[]
  cta: NavItem
  brandHref?: string
}

// Paths ("/va/...") navigate client-side; hashes ("#about") scroll on the page;
// full URLs (the booking page) open in a new tab.
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className?: string
  onClick: () => void
  children: ReactNode
}) {
  if (href.startsWith('http')) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  }
  if (href.startsWith('/')) {
    return (
      <Link className={className} to={href} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  )
}

// Fixed top navigation shared by every audience homepage. Each route passes
// its own links so /qa, /it, and /va never expose each other's navigation.
export default function SiteHeader({ brandRole, navItems, cta, brandHref = '#top' }: SiteHeaderProps) {
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
      {/* Keyboard users can jump past the navigation straight to the page content. */}
      <a className="skip-link" href="#top" onClick={skipToMain}>
        Skip to content
      </a>
      <div className="container nav-inner">
        <NavLink className="brand" href={brandHref} onClick={closeMenu}>
          <LogoMark />
          <span className="brand-text">
            <span className="brand-name">KEN ROMERO</span>
            <span className="brand-role">{brandRole}</span>
          </span>
        </NavLink>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <div className="nav-menu">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <NavLink className="nav-cta" href={cta.href} onClick={closeMenu}>
            {cta.label}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
