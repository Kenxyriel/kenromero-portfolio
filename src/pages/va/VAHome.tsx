import {
  ArrowRight,
  Check,
  Heart,
  MessageCircle,
  Bot,
  Cloud,
  Palette,
  Quote,
  Smartphone,
} from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../../components/ContactForm'
import { profile } from '../../data/profile'
import { vaHome as content, vaTestimonials } from '../../data/va'
import { CurlArrow, DotGrid, Mic, RotatingBadge, Sparkle, Squiggle, Waveform } from './VAArt'
import VALayout, { ToolBadge } from './VALayout'

// True once the element has scrolled into view (immediately if motion is reduced).
function useInView<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const node = ref.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!node || reduced || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return [ref, shown]
}

// Same order as the tool groups in src/data/va.ts.
const toolGroupIcons = [Palette, Bot, Smartphone, Cloud]

// Typographic "covers" for each work category, drawn in CSS/SVG.
function WorkCover({ kind }: { kind: 'design' | 'podcast' | 'social' }) {
  if (kind === 'design') {
    return (
      <div className="vx-cover va-cover-design" aria-hidden="true">
        <span className="va-cover-type">Aa</span>
        <div className="va-swatches">
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="va-cover-label">BRAND KIT</span>
        <Sparkle className="va-cover-spark" />
      </div>
    )
  }
  if (kind === 'podcast') {
    return (
      <div className="vx-cover va-cover-podcast" aria-hidden="true">
        <Mic className="va-cover-mic" />
        <Waveform className="va-cover-wave" />
        <span className="va-cover-label">EP. 02 · CLIPS</span>
      </div>
    )
  }
  return (
    <div className="vx-cover va-cover-social" aria-hidden="true">
      <div className="va-mock-post">
        <div className="va-mock-head">
          <i />
          <span />
        </div>
        <span className="va-mock-line" />
        <span className="va-mock-line va-mock-line-short" />
        <div className="va-mock-image">
          <Sparkle />
        </div>
        <div className="va-mock-actions">
          <Heart size={14} />
          <MessageCircle size={14} />
        </div>
      </div>
    </div>
  )
}

const work = [
  { kind: 'design' as const, title: 'Design & Branding', meta: 'Brand Kits, Graphic Design', path: '/va/design-branding' },
  { kind: 'podcast' as const, title: 'Podcast Editing', meta: 'Episodes, Clips, Thumbnails', path: '/va/podcast-editing' },
  { kind: 'social' as const, title: 'Social Media Content', meta: 'Captions, Calendars, Strategy', path: '/va/social-media-content' },
]

export default function VAHome() {
  const [cardsRef, cardsShown] = useInView<HTMLDivElement>()
  return (
    <VALayout meta={content.meta}>
      {/* HERO */}
      <section className="vx-hero">
        <div className="container vx-hero-grid">
          <div className="vx-hero-copy">
            <p className="vx-eyebrow">{content.about.signature}</p>
            <h1>
              Ken
              <br />
              Romero
            </h1>
            <Squiggle className="vx-hero-squiggle" />
            <p className="vx-hero-roles">{content.hero.roles.join(' · ')}</p>
            <p className="vx-hero-intro">
              I help businesses turn ideas into content that connects, engages, and builds a consistent online presence.
            </p>
            <div className="vx-hero-actions">
              <a className="vx-pill" href="#work">
                View my work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <span className="vx-hand">{content.hero.tagline}</span>
            </div>
          </div>

          <div className="vx-hero-art">
            <div className="vx-hero-block" />
            <img className="vx-hero-photo" src="/ken-romero.JPG" alt={profile.name} />
            <RotatingBadge className="vx-hero-badge" text="PLAN • CREATE • PUBLISH • OPTIMIZE • " />
            <Waveform className="vx-hero-wave" />
            <DotGrid className="vx-hero-dots" />
            <Sparkle className="vx-hero-spark" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="vx-about">
        <div className="vx-about-photo">
          <img src="/ken-romero-hero.JPG" alt={`${profile.name}, casual portrait`} />
          <Mic className="vx-about-mic" />
        </div>
        <div className="vx-about-copy">
          <p className="vx-eyebrow">About me</p>
          <h2 className="vx-serif">
            Creative thinking.
            <br />
            Strategic <em>execution.</em>
          </h2>
          <Squiggle className="vx-about-squiggle" />
          <p className="vx-greeting">{content.about.greeting}</p>
          <p>{content.about.body}</p>
          <p className="vx-signature">{profile.name}</p>
          <div className="vx-sticker">
            <Sparkle />
            <span>Based in the Philippines</span>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="vx-numbers" aria-label="By the numbers">
        <div className="container vx-numbers-row">
          {content.about.numbers.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{item.detail}</small>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="vx-services">
        <span className="vx-blob" aria-hidden="true" />
        <div className="container">
          <div className="vx-services-head">
            <Sparkle className="vx-head-spark" />
            <p className="vx-script">{content.services.eyebrow}</p>
            <Squiggle className="vx-services-squiggle" />
            <h2>
              Creative support for <mark>bigger results</mark>
            </h2>
            <p>{content.services.description}</p>
          </div>
          <div ref={cardsRef} className={`vx-svc-row${cardsShown ? ' is-shown' : ''}`}>
            {content.services.items.map((service) => (
              <article className="vx-svc" key={service.title}>
                <div className="vx-svc-art">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <h3>{service.title}</h3>
                <p className="vx-svc-tag">{service.tagline}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Check size={11} strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {service.path && (
                  <Link className="vx-svc-link" to={service.path}>
                    View work <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="vx-work">
        <div className="container vx-split-grid">
          <div className="vx-side">
            <p className="vx-eyebrow">Featured projects</p>
            <h2 className="vx-serif">
              Selected <em>work</em>
            </h2>
            <Squiggle />
            <p className="vx-side-note">{content.featured.tagline}</p>
          </div>
          <div className="vx-card-row">
            {work.map((item) => (
              <Link className="vx-work-card" key={item.title} to={item.path}>
                <WorkCover kind={item.kind} />
                <div className="vx-work-meta">
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.meta}</span>
                  </div>
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="vx-quotes">
        <div className="container vx-split-grid">
          <div className="vx-side">
            <p className="vx-eyebrow vx-eyebrow-amber">Kind words</p>
            <h2 className="vx-serif">
              What clients <em>say</em>
            </h2>
            <Squiggle className="vx-amber" />
            <Quote className="vx-quote-mark" aria-hidden="true" />
          </div>
          <div className="vx-quote-row">
            {vaTestimonials.map((item) => (
              <figure key={item.id}>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="vx-tools">
        <div className="container">
          <div className="vx-tools-head">
            <div>
              <p className="vx-eyebrow">My toolkit</p>
              <h2 className="vx-serif">
                Tools I <em>use</em>
              </h2>
              <Squiggle />
            </div>
            <p className="vx-side-note">{content.tools.description}</p>
          </div>
          <div className="vx-tool-groups">
            {content.tools.groups.map((group, groupIndex) => {
              const Icon = toolGroupIcons[groupIndex]
              return (
                <article className="vx-tool-group" key={group.title}>
                  <header>
                    <span className="vx-tool-group-icon">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <h3>{group.title}</h3>
                  </header>
                  <ul className="va-tool-row">
                    {group.tools.map((tool, index) => (
                      <ToolBadge key={tool} name={tool} index={groupIndex * 4 + index} />
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vx-cta">
        <div className="container vx-cta-grid">
          <div>
            <p className="vx-eyebrow">{content.closing.eyebrow}</p>
            <h2 className="vx-serif">
              Let’s build something
              <br />
              <em>amazing</em> together.
            </h2>
            <Squiggle />
          </div>
          <div>
            <p>Tell me about your brand, your podcast, or your content goals, and let’s find the right plan.</p>
            <a className="vx-pill vx-pill-dark" href="#contact">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="vx-cta-art" aria-hidden="true">
            <Mic />
            <CurlArrow />
            <Sparkle />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="vx-contact">
        <div className="container">
          <ContactForm intro="Need help with social media, content, podcast editing, or design? Send a message and tell me about your business." />
        </div>
      </section>
    </VALayout>
  )
}
