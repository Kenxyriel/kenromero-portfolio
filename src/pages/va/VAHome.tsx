import {
  ArrowRight,
  Check,
  Bot,
  Cloud,
  Palette,
  Pause,
  Play,
  Quote,
  Smartphone,
} from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../../components/ContactForm'
import { imageProps } from '../../components/responsiveImage'
import Timeline from '../../components/Timeline'
import { profile } from '../../data/profile'
import { jjjStory, vaHome as content, vaOnboarding, vaTestimonials } from '../../data/va'
import { DotGrid, Mic, RotatingBadge, Sparkle, Squiggle, Waveform } from './VAArt'
import VALayout, { BookingTicket, ToolBadge } from './VALayout'
import { vaPath } from '../../vaPath'

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

// Covers for each work category, built from real samples (picked in src/data/va.ts).
const previews = content.featured.previews

// A clip that plays in place, with sound, when tapped. Starting one pauses the other.
function PlayableClip({ clip, className }: { clip: { image: string; video: string; label: string }; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }
  return (
    <div className={`va-cover-video ${className}${playing ? ' is-playing' : ''}`}>
      <video
        ref={videoRef}
        src={clip.video}
        poster={clip.image}
        preload="none"
        playsInline
        onContextMenu={(event) => event.preventDefault()}
        onPlay={(event) => {
          setPlaying(true)
          document.querySelectorAll<HTMLVideoElement>('.va-cover-video video').forEach((other) => {
            if (other !== event.currentTarget) other.pause()
          })
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        className="va-cover-play"
        onClick={toggle}
        aria-label={playing ? `Pause ${clip.label}` : `Play ${clip.label}`}
      >
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
    </div>
  )
}

function WorkCover({ kind }: { kind: 'design' | 'podcast' | 'social' }) {
  if (kind === 'design') {
    return (
      <div className="vx-cover va-cover-design">
        <div className="va-cover-fan">
          {previews.design.map((item) => (
            <img key={item.image} {...imageProps(item.image, '200px')} alt={item.label} loading="lazy" />
          ))}
        </div>
        <span className="va-cover-label">CLIENT GRAPHICS</span>
        <Sparkle className="va-cover-spark" />
      </div>
    )
  }
  if (kind === 'podcast') {
    return (
      <div className="vx-cover va-cover-podcast">
        <PlayableClip clip={previews.podcast.teaser} className="va-cover-thumb" />
        <PlayableClip clip={previews.podcast.clip} className="va-cover-clip" />
        <Waveform className="va-cover-wave" />
        <span className="va-cover-label">EPISODES · CLIPS</span>
      </div>
    )
  }
  return (
    <div className="vx-cover va-cover-social">
      <div className="va-cover-phones">
        {previews.social.map((item) => (
          <img key={item.image} {...imageProps(item.image, '200px')} alt={item.label} loading="lazy" />
        ))}
      </div>
      <span className="va-cover-label">LIVE POSTS</span>
    </div>
  )
}

const work = [
  { kind: 'design' as const, title: 'Design & Branding', meta: 'Brand Kits, Graphic Design', path: vaPath('/va/design-branding') },
  { kind: 'podcast' as const, title: 'Podcast Editing', meta: 'Episodes, Clips, Thumbnails', path: vaPath('/va/podcast-editing') },
  { kind: 'social' as const, title: 'Social Media Content', meta: 'Captions, Calendars, Strategy', path: vaPath('/va/social-media-content') },
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
            <p className="vx-hero-promise">{content.hero.promise}</p>
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
            <figure className="vx-hero-proof">
              <blockquote>“{content.hero.proof.quote}”</blockquote>
              <figcaption>
                {content.hero.proof.name}, {content.hero.proof.org}
              </figcaption>
            </figure>
            <p className="vx-status">
              <span className="vx-status-dot" aria-hidden="true" /> Open for new projects
            </p>
          </div>

          <div className="vx-hero-art">
            <div className="vx-hero-block" />
            <img className="vx-hero-photo" {...imageProps('/ken-romero.webp', '(max-width: 760px) 80vw, 520px')} alt={profile.name} />
            <RotatingBadge className="vx-hero-badge" text="PLAN • CREATE • PUBLISH • OPTIMIZE • " />
            <Waveform className="vx-hero-wave" />
            <DotGrid className="vx-hero-dots" />
            <Sparkle className="vx-hero-spark" />
          </div>
        </div>
      </section>

      {/* SELECTED WORK: straight after the hero, so the real samples are the first proof. */}
      <section id="work" className="vx-work">
        <div className="container">
          <div className="vx-section-head">
            <div>
              <p className="vx-eyebrow">Featured projects</p>
              <h2 className="vx-serif">
                Selected <em>work</em>
              </h2>
            </div>
            <p className="vx-side-note">{content.featured.tagline}</p>
          </div>
          <div className="vx-card-row">
            {work.map((item) => (
              // The link stretches over the whole card so the clip's play button can sit above it.
              <div className="vx-work-card" key={item.title}>
                <WorkCover kind={item.kind} />
                <div className="vx-work-meta">
                  <div>
                    <h3>
                      <Link className="vx-work-link" to={item.path}>
                        {item.title}
                      </Link>
                    </h3>
                    <span>{item.meta}</span>
                  </div>
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT STORY: one project told start to finish, with the client's own words. */}
      <ClientStory />

      {/* ABOUT */}
      <section id="about" className="vx-about">
        <div className="vx-about-photo">
          <img {...imageProps('/ken-romero-hero.webp', '(max-width: 760px) 80vw, 440px')} alt={`${profile.name}, casual portrait`} />
          <Mic className="vx-about-mic" />
        </div>
        <div className="vx-about-copy">
          <p className="vx-eyebrow">About me</p>
          <h2 className="vx-serif">
            Creative thinking.
            <br />
            Strategic <em>execution.</em>
          </h2>
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
        <div className="container">
          <div className="vx-section-head">
            <div>
              <p className="vx-eyebrow">{content.services.eyebrow}</p>
              <h2 className="vx-serif">
                Creative support for <em>bigger results</em>
              </h2>
            </div>
            <p className="vx-side-note">{content.services.description}</p>
          </div>
          <div ref={cardsRef} className={`vx-svc-row${cardsShown ? ' is-shown' : ''}`}>
            {content.services.items.map((service) => (
              <article className="vx-svc" key={service.title}>
                <div className="vx-svc-art">
                  <img {...imageProps(service.image, '260px')} alt="" loading="lazy" />
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

      {/* TESTIMONIALS */}
      <section id="testimonials" className="vx-quotes">
        <div className="container vx-split-grid">
          <div className="vx-side">
            <p className="vx-eyebrow vx-eyebrow-amber">Kind words</p>
            <h2 className="vx-serif">
              What clients <em>say</em>
            </h2>
            <Quote className="vx-quote-mark" aria-hidden="true" />
          </div>
          <div className="vx-quote-row">
            {vaTestimonials.map((item) => (
              <figure key={item.id}>
                <p className="vx-quote-pull">“{item.highlight}”</p>
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
          <div className="vx-section-head">
            <div>
              <p className="vx-eyebrow">My toolkit</p>
              <h2 className="vx-serif">
                Tools I <em>use</em>
              </h2>
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

      {/* PROCESS */}
      <section id="process" className="vx-process">
        <div className="container">
          <div className="vx-section-head">
            <div>
              <p className="vx-eyebrow">{vaOnboarding.eyebrow}</p>
              <h2 className="vx-serif">
                From first message to <em>your first posts</em>
              </h2>
            </div>
            <p className="vx-side-note">{vaOnboarding.description}</p>
          </div>
          <Timeline className="tl-va" steps={vaOnboarding.steps} />
        </div>
      </section>

      {/* CLOSING: one section that offers the call and the form side by side. */}
      <section id="contact" className="vx-close">
        <div className="container vx-close-grid">
          <div className="vx-book">
            <p className="vx-eyebrow">{content.closing.eyebrow}</p>
            <h2 className="vx-serif">
              Let’s build something <em>amazing</em> together.
            </h2>
            <p className="vx-script">Let’s cut the line!</p>
            <p>
              Book your <strong>free 30-minute discovery call</strong> and tell me about your brand, your podcast, or
              your content goals. We’ll find the right plan together.
            </p>
            <BookingTicket />
            <p className="vx-close-or">Prefer to write? Send a message and I’ll reply within 24 hours.</p>
          </div>
          <ContactForm showInfo={false} />
        </div>
      </section>
    </VALayout>
  )
}

function ClientStory() {
  const { kit, post, email } = jjjStory.images
  return (
    <section className="vx-story" aria-labelledby="vx-story-title">
      <div className="container vx-story-grid">
        <div className="vx-story-copy">
          <p className="vx-eyebrow">Client story · {jjjStory.client}</p>
          <h2 id="vx-story-title" className="vx-serif">
            {jjjStory.title}
          </h2>
          <p className="vx-story-summary">{jjjStory.summary}</p>
          <ul className="vx-story-made">
            {jjjStory.made.map((item) => (
              <li key={item.label}>
                <Check size={14} strokeWidth={3} aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong> {item.detail}
                </span>
              </li>
            ))}
          </ul>
          <figure className="vx-story-quote">
            <blockquote>“{jjjStory.quote}”</blockquote>
            <figcaption>
              {jjjStory.quoteBy}, {jjjStory.client}
            </figcaption>
          </figure>
          <div className="vx-story-links">
            <Link className="vx-pill" to={vaPath('/va/design-branding')}>
              See the designs <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="vx-text-link" to={vaPath('/va/social-media-content')}>
              See the October calendar <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="vx-story-art">
          <img className="vx-story-email" {...imageProps(email.image, '260px')} alt={email.label} loading="lazy" />
          <img className="vx-story-kit" {...imageProps(kit.image, '(max-width: 760px) 70vw, 380px')} alt={kit.label} loading="lazy" />
          <img className="vx-story-post" {...imageProps(post.image, '(max-width: 760px) 60vw, 320px')} alt={post.label} loading="lazy" />
        </div>
      </div>
    </section>
  )
}
