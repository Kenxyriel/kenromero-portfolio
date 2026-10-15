import { ArrowRight, Check, ImageIcon, Instagram, Linkedin, Mail, Smartphone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader, { type NavItem } from '../../components/SiteHeader'
import usePageMeta from '../../components/usePageMeta'
import { profile } from '../../data/profile'
import { vaLinks, type VAImage } from '../../data/va'
import './va.css'

const navItems: NavItem[] = [
  { label: 'Home', href: '/va' },
  { label: 'Design', href: '/va/design-branding' },
  { label: 'Social Media', href: '/va/social-media-content' },
  { label: 'Podcast', href: '/va/podcast-editing' },
  { label: 'Packages', href: '/va/smm-packages' },
]

type VALayoutProps = {
  meta: { title: string; description: string }
  children: ReactNode
}

// Shell for every /va page: creative-portfolio theme, navigation, contact footer.
export default function VALayout({ meta, children }: VALayoutProps) {
  usePageMeta(meta.title, meta.description)

  return (
    <div className="site-shell va-theme">
      <SiteHeader
        brandRole="CREATIVE PORTFOLIO"
        brandHref="/va"
        navItems={navItems}
        cta={{ label: "Let's Work Together", href: '/va#contact' }}
      />
      <main id="top">{children}</main>
      <VAFooter />
    </div>
  )
}

function VAFooter() {
  return (
    <footer className="va-footer">
      <div className="container va-footer-inner">
        <div>
          <p className="va-script">Let’s grow together</p>
          <strong>{profile.name}</strong>
          <span>Social Media • Content • Podcasts</span>
        </div>
        <ul className="va-footer-links">
          <li>
            <Mail size={16} aria-hidden="true" />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <Smartphone size={16} aria-hidden="true" />
            <a href={profile.whatsapp.href} target="_blank" rel="noreferrer">
              {profile.whatsapp.label}
            </a>
          </li>
          <li>
            <Linkedin size={16} aria-hidden="true" />
            <a href={vaLinks.linkedin.href} target="_blank" rel="noreferrer">
              {profile.linkedin.label}
            </a>
          </li>
          <li>
            <Instagram size={16} aria-hidden="true" />
            <a href={vaLinks.instagram.href} target="_blank" rel="noreferrer">
              {vaLinks.instagram.label}
            </a>
          </li>
        </ul>
      </div>
      <div className="container va-footer-bottom">
        <span>{vaLinks.handle}</span>
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </footer>
  )
}

// Image from the creative portfolio, or a labelled placeholder until it is added.
export function VAImg({ item, className = '' }: { item: VAImage; className?: string }) {
  if (item.image) {
    return (
      <figure className={`va-img ${className}`}>
        <img src={item.image} alt={item.label} loading="lazy" />
      </figure>
    )
  }
  return (
    <figure className={`va-img va-img-placeholder ${className}`}>
      <ImageIcon aria-hidden="true" />
      <figcaption>{item.label}</figcaption>
    </figure>
  )
}

export function VAPageHero({
  title,
  subtitle,
  tagline,
  intro,
}: {
  title: string
  subtitle?: string
  tagline?: string
  intro?: string
}) {
  return (
    <section className="va-page-hero">
      <div className="container va-narrow">
        <Link className="va-back" to="/va">
          ← Back to portfolio
        </Link>
        <h1>
          {title}
          {subtitle && <span>{subtitle}</span>}
        </h1>
        {tagline && <p className="va-tagline">{tagline}</p>}
        {intro && <p className="va-lead">{intro}</p>}
      </div>
    </section>
  )
}

export function VASectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="va-section-title">
      {eyebrow && <p className="va-script">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export function VACta({
  cta,
}: {
  cta: { eyebrow: string; title: string; description: string; button: string; path: string; points: string[] }
}) {
  return (
    <section className="va-cta">
      <div className="container va-narrow va-cta-inner">
        <p className="va-cta-eyebrow">{cta.eyebrow}</p>
        <h2>{cta.title}</h2>
        <p>{cta.description}</p>
        <Link className="va-button" to={cta.path}>
          {cta.button} <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <ul className="va-cta-points">
          {cta.points.map((point) => (
            <li key={point}>
              <Check size={14} aria-hidden="true" /> {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
