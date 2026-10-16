import { ArrowRight, Check, ImageIcon, Instagram, Linkedin, Mail, Maximize2, Smartphone, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader, { type NavItem } from '../../components/SiteHeader'
import usePageMeta from '../../components/usePageMeta'
import { profile } from '../../data/profile'
import { toolIcons, vaLinks, type ToolName, type VAImage } from '../../data/va'
import { RotatingBadge, Sparkle, Squiggle } from './VAArt'
import './va.css'

const navItems: NavItem[] = [
  { label: 'Home', href: '/va' },
  { label: 'Design', href: '/va/design-branding' },
  { label: 'Social Media', href: '/va/social-media-content' },
  { label: 'Podcast', href: '/va/podcast-editing' },
]

// Full-screen viewer for work samples, so detailed screenshots can be read.
const LightboxContext = createContext<(item: VAImage) => void>(() => {})

function Lightbox({ item, onClose }: { item: VAImage; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  return (
    <div className="va-lightbox" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}>
      <button className="va-lightbox-close" type="button" aria-label="Close" autoFocus onClick={onClose}>
        <X size={22} />
      </button>
      <figure onClick={(event) => event.stopPropagation()}>
        {item.video ? (
          <video src={item.video} poster={item.image} controls autoPlay playsInline />
        ) : (
          <img src={item.image} alt={item.label} />
        )}
        <figcaption>{item.label}</figcaption>
      </figure>
    </div>
  )
}

type VALayoutProps = {
  meta: { title: string; description: string }
  children: ReactNode
  /** Keep the page out of search results (pages shared only by direct link). */
  unlisted?: boolean
}

// Shell for every /va page: creative-portfolio theme, navigation, contact footer.
export default function VALayout({ meta, children, unlisted = false }: VALayoutProps) {
  usePageMeta(meta.title, meta.description)
  const [viewing, setViewing] = useState<VAImage | null>(null)
  const close = useCallback(() => setViewing(null), [])

  useEffect(() => {
    if (!unlisted) return
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [unlisted])

  return (
    <div className="site-shell va-theme">
      <SiteHeader
        brandRole="CREATIVE PORTFOLIO"
        brandHref="/va"
        navItems={navItems}
        cta={{ label: "Let's Work Together", href: '/va#contact' }}
      />
      <LightboxContext.Provider value={setViewing}>
        <main id="top">{children}</main>
      </LightboxContext.Provider>
      {viewing && <Lightbox item={viewing} onClose={close} />}
      <VAFooter />
    </div>
  )
}

function VAFooter() {
  return (
    <footer className="va-footer">
      <div className="container va-footer-grid">
        <div className="va-footer-brand">
          <strong>
            KEN ROMERO <Sparkle />
          </strong>
          <p>Social media, content, and podcast support for small brands with big plans.</p>
          <div className="va-footer-social">
            <a href={vaLinks.instagram.href} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href={vaLinks.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>
        <div>
          <p className="va-footer-head">Navigation</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="va-footer-head">Services</p>
          <ul>
            <li>Social Media Management</li>
            <li>Podcast Editing</li>
            <li>Design &amp; Branding</li>
          </ul>
        </div>
        <div>
          <p className="va-footer-head">Contact</p>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.whatsapp.href} target="_blank" rel="noreferrer">
                <Smartphone size={14} aria-hidden="true" /> {profile.whatsapp.label}
              </a>
            </li>
            <li>{vaLinks.instagram.label}</li>
          </ul>
        </div>
        <RotatingBadge className="va-footer-badge" text="GOOD CONTENT • CREATES • OPPORTUNITIES • " />
      </div>
      <div className="container va-footer-bottom">
        <span>{vaLinks.handle}</span>
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </footer>
  )
}

// Circular tool logo that bobs and tilts; `index` staggers the motion so a
// row of badges moves like a wave. Hovering spins it.
export function ToolBadge({ name, index = 0 }: { name: ToolName; index?: number }) {
  return (
    <li className="va-tool-badge" style={{ animationDelay: `${(index % 8) * -0.35}s` }}>
      <span className="va-tool-circle">
        <img src={toolIcons[name]} alt="" loading="lazy" />
      </span>
      <span className="va-tool-name">{name}</span>
    </li>
  )
}

// Image from the creative portfolio, or a labelled placeholder until it is added.
// Work sample (image or video) that opens full-screen on click, or a labelled
// placeholder until the asset is added.
export function VAImg({ item, className = '', caption = false }: { item: VAImage; className?: string; caption?: boolean }) {
  const open = useContext(LightboxContext)
  if (item.image || item.video) {
    return (
      <figure className={`va-img ${className}${item.tall ? ' va-img-tall' : ''}`}>
        {item.video ? (
          <video src={item.video} poster={item.image} muted loop playsInline autoPlay preload="metadata" aria-label={item.label} />
        ) : (
          <img src={item.image} alt={item.label} loading="lazy" />
        )}
        <button className="va-img-open" type="button" aria-label={`View ${item.label} full size`} onClick={() => open(item)}>
          <Maximize2 size={16} aria-hidden="true" />
        </button>
        {caption && <figcaption className="va-img-caption">{item.label}</figcaption>}
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
  backHref = '/va',
}: {
  title: string
  subtitle?: string
  tagline?: string
  intro?: string
  backHref?: string
}) {
  return (
    <section className="va-page-hero">
      <div className="container va-narrow">
        {backHref.startsWith('/') ? (
          <Link className="va-back" to={backHref}>
            ← Back to portfolio
          </Link>
        ) : (
          <a className="va-back" href={backHref}>
            ← Back to portfolio
          </a>
        )}
        <h1>
          {title}
          {subtitle && <span>{subtitle}</span>}
        </h1>
        <Squiggle className="va-page-squiggle" />
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
