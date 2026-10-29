import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import {
  ArrowRight,
  CalendarCheck,
  CalendarHeart,
  Check,
  Clapperboard,
  Globe,
  ImagePlus,
  Pause,
  PenTool,
  Play,
  RotateCcw,
  Scissors,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Timeline from '../../components/Timeline'
import { getSmmPackages, podcastPackages, smmPackages, vaOnboarding, type Package } from '../../data/va'
import { bookingLink } from '../../data/profile'
import { portfolioUrl } from '../../packageHosts'
import VALayout, { BookingTicket, VAPageHero, VASectionTitle } from './VALayout'
import { vaPath } from '../../vaPath'
import './packages.css'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True once the element has scrolled into view (immediately if motion is reduced).
function useInView<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || reducedMotion() || !('IntersectionObserver' in window)) {
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
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return [ref, shown]
}

// A price like "$450" or "₱12,000" that counts up from zero the first time it is seen.
function CountUpPrice({ value, start }: { value: string; start: boolean }) {
  const match = value.match(/[\d,]+/)
  const target = match ? Number(match[0].replace(/,/g, '')) : 0
  const [shown, setShown] = useState(reducedMotion() ? target : 0)
  useEffect(() => {
    if (!start || !match || reducedMotion()) {
      setShown(target)
      return
    }
    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / 900)
      setShown(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target])
  if (!match) return <>{value}</>
  const [before, after] = [value.slice(0, match.index), value.slice((match.index ?? 0) + match[0].length)]
  return (
    <>
      <span aria-hidden="true">
        {before}
        {shown.toLocaleString('en-US')}
        {after}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}

// A tilted ribbon of what the package covers, scrolling slowly under the hero.
function PackageRibbon({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false)
  const row = items.map((item) => item.replace(/^[^\p{L}]+/u, ''))
  return (
    <div className={`va-pkg-ribbon${paused ? ' is-paused' : ''}`}>
      <div className="va-pkg-ribbon-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {row.map((item) => (
              <li key={item}>
                {item} <Sparkles size={16} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="sr-only">{row.join(', ')}</p>
      <button type="button" className="va-pkg-ribbon-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play the scrolling ribbon' : 'Pause the scrolling ribbon'}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
    </div>
  )
}

// Two stickers beside the page title: the starting price and the free call.
function HeroStickers({ from, unit }: { from: string; unit: string }) {
  return (
    <div className="va-pkg-stickers" aria-hidden="true">
      <span className="va-pkg-sticker va-pkg-sticker-price">
        <small>Plans from</small>
        <strong>{from}</strong>
        <small>{unit}</small>
      </span>
      <span className="va-pkg-sticker va-pkg-sticker-call">
        <CalendarHeart size={18} />
        Free 30-min
        <br />
        discovery call
      </span>
    </div>
  )
}

const addOnIcons: [RegExp, LucideIcon][] = [
  [/reel|clip editing/i, Clapperboard],
  [/static|carousel/i, ImagePlus],
  [/revision/i, RotateCcw],
  [/platform/i, Globe],
  [/graphic|design/i, PenTool],
  [/rush/i, Zap],
  [/management/i, CalendarCheck],
  [/ai/i, Sparkles],
]

function AddOnIcon({ name }: { name: string }) {
  const Icon = addOnIcons.find(([pattern]) => pattern.test(name))?.[1] ?? Scissors
  return (
    <span className="va-pkg-addon-icon" aria-hidden="true">
      <Icon size={20} />
    </span>
  )
}

// Cards rise in one after another the first time the row scrolls into view.
function PackageGrid({ packages, className = '' }: { packages: Package[]; className?: string }) {
  const [ref, shown] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={`va-packages ${className}${shown ? ' is-shown' : ''}`}>
      {packages.map((pkg, index) => (
        <PackageCard key={pkg.name} pkg={pkg} index={index} shown={shown} />
      ))}
    </div>
  )
}

// Closing band: one more nudge to book, with the tear-off ticket from the portfolio.
function PackageClose() {
  return (
    <section className="va-section va-pkg-close">
      <div className="container va-pkg-close-inner">
        <div>
          <p className="va-script">Not sure which one fits?</p>
          <h2>Let’s pick it together.</h2>
          <p>Book a free 30-minute call. We’ll look at your goals and the time you have, and choose the package that makes sense.</p>
        </div>
        <div className="va-pkg-close-ticket">
          <BookingTicket />
        </div>
      </div>
    </section>
  )
}

function PackageCard({ pkg, index = 0, shown = true }: { pkg: Package; index?: number; shown?: boolean }) {
  return (
    <article className={`va-package${pkg.badge ? ' va-package-featured' : ''}`} style={{ '--i': index } as CSSProperties}>
      {pkg.badge && <span className="va-package-badge">{pkg.badge}</span>}
      <h3>{pkg.name}</h3>
      {pkg.bestFor && <p className="va-package-for">{pkg.bestFor}</p>}
      <p className="va-price">
        <strong>
          <CountUpPrice value={pkg.price} start={shown} />
        </strong>{' '}
        <span>{pkg.unit}</span>
      </p>
      {pkg.intro && <p className="va-package-intro">{pkg.intro}</p>}
      <ul className="va-checklist">
        {pkg.features.map((feature) => (
          <li key={feature}>
            <Check size={14} aria-hidden="true" /> {feature}
          </li>
        ))}
      </ul>
      {pkg.extra && (
        <>
          <p className="va-kicker">{pkg.extra.title}</p>
          <ul className="va-checklist">
            {pkg.extra.items.map((item) => (
              <li key={item}>
                <Check size={14} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </>
      )}
      {pkg.note && <p className="va-note">{pkg.note}</p>}
      {/* Same wording and destination as the navbar button, so there's one clear next step. */}
      <a className="va-button" href={bookingLink.href} {...(bookingLink.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        Book a discovery call
      </a>
    </article>
  )
}

// What happens after a client picks a package; the same steps as the home page.
function OnboardingSection({ cream = false }: { cream?: boolean }) {
  return (
    <section className={`va-section${cream ? ' va-section-cream' : ''}`}>
      <div className="container">
        <VASectionTitle eyebrow={vaOnboarding.eyebrow} title={vaOnboarding.title} />
        <Timeline
          className="tl-va"
          steps={vaOnboarding.steps}
          footer={
            <a className="va-button" href={portfolioUrl(vaPath('/va#contact'))}>
              {vaOnboarding.cta} <ArrowRight size={16} aria-hidden="true" />
            </a>
          }
        />
      </div>
    </section>
  )
}

const currencyLabel = { usd: 'Prices in USD', php: 'Prices in PHP · Philippines' }

// Package pages are not linked from the portfolio; Ken shares them directly
// with the clients they apply to (see src/packageHosts.ts). Each page shows a
// single currency so international and local clients only see their prices.
export function VASmmPackages({ currency = 'usd' }: { currency?: 'usd' | 'php' }) {
  const { packages, addOns } = getSmmPackages(currency)

  return (
    <VALayout meta={smmPackages.meta} unlisted className="va-pkg-page">
      <VAPageHero
        title={smmPackages.title}
        tagline={smmPackages.tagline}
        backHref={portfolioUrl(vaPath('/va'))}
      >
        <HeroStickers from={packages[0].price} unit={packages[0].unit} />
      </VAPageHero>
      <PackageRibbon items={smmPackages.pillars} />

      <section className="va-section va-section-tight">
        <div className="container">
          <p className="va-currency-note">{currencyLabel[currency]}</p>
          <h2 className="sr-only">Packages</h2>
          <PackageGrid packages={packages.map((pkg) => ({ ...pkg, bestFor: pkg.tagline, intro: `Best for: ${pkg.bestFor}` }))} />
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle eyebrow="Flexible Options for Your Extra Needs" title="Add-Ons" />
          <div className="va-addons">
            {addOns.map((addOn) => (
              <article key={addOn.name}>
                <AddOnIcon name={addOn.name} />
                <h3>{addOn.name}</h3>
                <p>{addOn.description}</p>
                <strong>{addOn.price}</strong>
              </article>
            ))}
          </div>
          <ul className="va-fineprint">
            {smmPackages.addOnNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <OnboardingSection />

      <section className="va-section">
        <div className="container">
          <VASectionTitle eyebrow="A few things to keep in mind" title="Important Notes" />
          <div className="va-notes">
            {smmPackages.notes.map((note, index) => (
              <article key={note.title}>
                <span className="va-service-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{note.title}</h3>
                <ul>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="va-note va-centered">
            Thank you for your understanding! {smmPackages.thanks}
          </p>
        </div>
      </section>

      <PackageClose />
    </VALayout>
  )
}

export function VAPodcastPackages() {
  const content = podcastPackages
  const { retainer } = content

  return (
    <VALayout meta={content.meta} unlisted className="va-pkg-page">
      <VAPageHero title={content.title} backHref={portfolioUrl(vaPath('/va'))}>
        <HeroStickers from={content.perEpisode[0].price} unit={content.perEpisode[0].unit} />
      </VAPageHero>
      <PackageRibbon items={content.premiumWhy} />

      <section className="va-section va-section-tight">
        <div className="container">
          <VASectionTitle title="Per Episode" />
          <PackageGrid packages={content.perEpisode} className="va-packages-2" />
          <div className="va-why">
            <p className="va-kicker">⭐ Why Choose Premium?</p>
            <ul className="va-chip-grid">
              {content.premiumWhy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle title="Optional Add-Ons" />
          <div className="va-addons">
            {content.addOns.map((addOn) => (
              <article key={addOn.name}>
                <AddOnIcon name={addOn.name} />
                <h3>{addOn.name}</h3>
                <strong>{addOn.price}</strong>
                <ul>
                  {addOn.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="va-note va-centered">{content.clipDiscount}</p>
        </div>
      </section>

      <section className="va-section">
        <div className="container">
          <VASectionTitle eyebrow="Save vs paying per episode" title="Monthly Packages" />
          <PackageGrid packages={content.monthly} />
          <div className="va-reminders">
            <p className="va-kicker">Important Reminders</p>
            <ul>
              {content.monthlyReminders.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <OnboardingSection cream />

      <section className="va-section va-section-dark">
        <div className="container">
          <VASectionTitle title={retainer.name} />
          <p className="va-price va-centered">
            <strong>{retainer.price}</strong> <span>{retainer.unit}</span>
          </p>
          <div className="va-retainer">
            {retainer.includes.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="va-retainer va-retainer-3">
            <article>
              <h3>Perfect for</h3>
              <ul>
                {retainer.perfectFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Why hire a retainer package?</h3>
              <ul>
                {retainer.why.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Deliverables</h3>
              <ul>
                {retainer.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Commitment</h3>
              <ul>
                {retainer.commitment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Out of scope</h3>
              <ul>
                {retainer.outOfScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="va-note va-centered">{retainer.note}</p>
          <p className="va-centered">
            <a className="va-button" href={portfolioUrl(vaPath('/va#contact'))}>
              {content.custom}
            </a>
          </p>
        </div>
      </section>

      <PackageClose />
    </VALayout>
  )
}
