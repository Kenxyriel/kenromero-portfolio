import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './timeline.css'

export type TimelineStep = { time: string; title: string; text: string }

// Vertical timeline whose rail fills as it scrolls past the middle of the
// screen. Steps above that line are "reached"; the latest one is "current".
// With reduced motion, everything shows as reached and nothing animates.
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
  const [fill, setFill] = useState(0)
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFill(1)
      setReached(steps.length - 1)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const middle = window.innerHeight * 0.55
      const box = list.getBoundingClientRect()
      setFill(Math.min(1, Math.max(0, (middle - box.top) / box.height)))
      const dots = list.querySelectorAll<HTMLElement>('.tl-dot')
      let last = -1
      dots.forEach((dot, index) => {
        const rect = dot.getBoundingClientRect()
        if (rect.top + rect.height / 2 <= middle) last = index
      })
      setReached(last)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [steps.length])

  return (
    <div className={`tl ${className}`}>
      <ol ref={listRef} className="tl-list" style={{ '--tl-fill': fill } as CSSProperties}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`tl-step${index <= reached ? ' is-reached' : ''}${index === reached ? ' is-current' : ''}`}
          >
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
