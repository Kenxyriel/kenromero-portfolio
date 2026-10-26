import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './timeline.css'

export type TimelineStep = { time: string; title: string; text: string }

// Compact timeline: a row of steps on wide screens, a column on phones.
// When it scrolls into view the steps light up one after another along the
// line. With reduced motion, everything shows at once.
export default function Timeline({
  steps,
  className = '',
  footer,
}: {
  steps: readonly TimelineStep[]
  className?: string
  footer?: ReactNode
}) {
  const listRef = useRef<HTMLOListElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const list = listRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!list || reduced || !('IntersectionObserver' in window)) {
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
      { threshold: 0.35 },
    )
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`tl ${className}`}>
      <ol
        ref={listRef}
        className={`tl-list${shown ? ' is-shown' : ''}`}
        style={{ '--tl-count': steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="tl-step" style={{ '--i': index } as CSSProperties}>
            <span className="tl-time">{step.time}</span>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {footer && <div className="tl-footer">{footer}</div>}
    </div>
  )
}
