import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { VAImage } from '../../data/va'
import { RotatingBadge } from './VAArt'
import { useLightbox } from './VALayout'
import { imageProps } from '../../components/responsiveImage'

const SLIDE_MS = 3600

// Stage colours taken from each client's own artwork.
const brandTheme: Record<string, { bg: string; accent: string; tag: string }> = {
  'Bun Riot': { bg: '#24211f', accent: '#f37b21', tag: 'Burgers · Fries · Good Times' },
  'Kape at Kuwento': { bg: '#3a4413', accent: '#cbd9a2', tag: 'Good Coffee · Better Stories' },
}
const fallbackTheme = { bg: '#151211', accent: '#f2b124', tag: '' }

// Animated reel for the food graphics: a deck of posters that cycles on its
// own, recolouring the stage to match each brand. Hover or focus pauses it,
// and reduced-motion visitors get a still deck they step through by hand.
export default function VAFoodShowcase({ items }: { items: VAImage[] }) {
  const open = useLightbox()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = items.length

  const go = useCallback((index: number) => setActive(((index % count) + count) % count), [count])

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // The active progress bar is the timer: it pauses in place while the reel isn't
  // playing, and the reel moves on when the bar finishes filling.
  const playing = visible && !paused && !hovered && !reduced

  const current = items[active]
  const theme = brandTheme[current.brand ?? ''] ?? fallbackTheme

  return (
    <div
      ref={ref}
      className={`va-reel${playing ? ' is-playing' : ''}`}
      style={{ '--reel-bg': theme.bg, '--reel-accent': theme.accent, '--reel-ms': `${SLIDE_MS}ms` } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label="Food graphics showcase"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(active + 1)
        if (event.key === 'ArrowLeft') go(active - 1)
      }}
    >
      <div className="va-reel-info">
        <p className="va-reel-brand" key={`b-${current.brand}`}>
          {current.brand}
          <span>{theme.tag}</span>
        </p>
        <h4 className="va-reel-title" key={`t-${active}`} aria-live={playing ? 'off' : 'polite'}>
          {current.label}
        </h4>
        <p className="va-reel-count">
          <strong>{String(active + 1).padStart(2, '0')}</strong> / {String(count).padStart(2, '0')}
        </p>

        <div className="va-reel-progress">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={index === active ? 'is-active' : index < active ? 'is-done' : ''}
              aria-label={`Show ${item.brand} ${item.label}`}
              aria-current={index === active}
              onClick={() => go(index)}
            >
              <span
                key={index === active ? `run-${active}` : 'idle'}
                onAnimationEnd={index === active ? () => go(active + 1) : undefined}
              />
            </button>
          ))}
        </div>

        <div className="va-reel-controls">
          <button type="button" aria-label="Previous graphic" onClick={() => go(active - 1)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label={paused ? 'Play showcase' : 'Pause showcase'} onClick={() => setPaused((value) => !value)}>
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button type="button" aria-label="Next graphic" onClick={() => go(active + 1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="va-reel-deck">
        <RotatingBadge className="va-reel-badge" text="FRESH • BOLD • CRAVEABLE • DESIGN • " />
        {items.map((item, index) => {
          let offset = index - active
          if (offset > count / 2) offset -= count
          if (offset < -count / 2) offset += count
          const depth = Math.abs(offset)
          return (
            <button
              key={item.label}
              type="button"
              className={`va-reel-card${offset === 0 ? ' is-active' : ''}`}
              style={{ '--x': offset, '--d': depth } as CSSProperties}
              data-hidden={depth > 1 || undefined}
              tabIndex={offset === 0 ? 0 : -1}
              aria-hidden={offset !== 0}
              aria-label={offset === 0 ? `View ${item.brand} ${item.label} full size` : undefined}
              onClick={() => (offset === 0 ? open(item) : go(index))}
            >
              <img {...imageProps(item.image, '(max-width: 760px) 60vw, 320px')} alt={offset === 0 ? `${item.brand} – ${item.label}` : ''} loading="lazy" />
              {offset === 0 && (
                <span className="va-reel-zoom" aria-hidden="true">
                  <Maximize2 size={15} />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
