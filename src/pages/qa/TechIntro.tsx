import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import LogoMark from '../../components/LogoMark'

// First-visit welcome for the tech site, the counterpart to the creative queue ticket: an issue card
// "KR-001 Welcome, visitor" goes OPEN -> IN REVIEW -> RESOLVED, then the assignee's KR mark flies into
// the navbar logo while the cover lifts. Plays once per tab session, ends on any click, key, scroll or
// touch, and the page is fully rendered underneath. The hero test run waits for INTRO_END_EVENT.

const SEEN_KEY = 'kr-tech-intro-seen'
export const INTRO_END_EVENT = 'kr-tech-intro-end'
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
const REVIEW_AT = 750
const RESOLVED_AT = 1300
const LIFT_AT = 1880
const TOTAL = 2500

export function techIntroWillPlay() {
  if (typeof window === 'undefined') return false
  // ?intro forces it (for checking); test runners and crawlers skip it.
  if (new URLSearchParams(window.location.search).has('intro')) return true
  if (navigator.webdriver) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true // Storage blocked: still play, it just may play again on the next page.
  }
}

export default function TechIntro() {
  const [show, setShow] = useState(techIntroWillPlay)
  const rootRef = useRef<HTMLDivElement>(null)
  const finish = useCallback(() => setShow(false), [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!show || !root) return
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Ignore: see techIntroWillPlay.
    }
    const q = <T extends Element>(selector: string) => root.querySelector(selector) as T
    const cover = q<HTMLElement>('.tx-intro-cover')
    const card = q<HTMLElement>('.tx-intro-card')
    const mark = q<SVGSVGElement>('.tx-intro-mark')
    const skip = q<HTMLElement>('.tx-intro-skip')
    const [open, review, resolved] = Array.from(root.querySelectorAll<HTMLElement>('.tx-intro-status span'))
    const anims: Animation[] = []
    const timers: number[] = []
    const play = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const anim = el.animate(keyframes, { fill: 'both', ...options })
      anims.push(anim)
      return anim
    }
    // One status label leaves upward as the next comes in from below.
    const swap = (from: HTMLElement, to: HTMLElement, delay: number) => {
      play(from, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-60%)' }], { duration: 180, delay, easing: EASE_OUT, fill: 'forwards' })
      play(to, [{ opacity: 0, transform: 'translateY(60%)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, delay, easing: EASE_OUT })
    }

    let ended = false
    const end = () => {
      if (ended) return
      ended = true
      anims.forEach((anim) => anim.pause())
      play(root, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: EASE_OUT }).finished.then(finish, finish)
    }
    const events = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const
    events.forEach((name) => window.addEventListener(name, end, { passive: true }))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Resolved card for a beat, then a soft fade. No travel.
      play(open, [{ opacity: 0 }], { duration: 0 })
      play(resolved, [{ opacity: 1 }], { duration: 0 })
      root.classList.add('is-resolved')
      play(root, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, delay: 400, easing: EASE_OUT }).finished.then(finish, () => {})
    } else {
      play(card, [
        { transform: 'translateY(16px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], { duration: 400, easing: EASE_OUT })
      play(skip, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 150, easing: EASE_OUT })
      mark.querySelectorAll('path').forEach((path, i) => {
        path.setAttribute('pathLength', '1')
        // The first three paths are the ring arcs, the rest are the K and R strokes.
        play(path, [
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDasharray: 1, strokeDashoffset: 0 },
        ], { duration: i < 3 ? 600 : 450, delay: i < 3 ? 150 + i * 80 : 400, easing: EASE_OUT })
      })
      swap(open, review, REVIEW_AT)
      swap(review, resolved, RESOLVED_AT)
      timers.push(window.setTimeout(() => root.classList.add('is-resolved'), RESOLVED_AT))
      play(cover, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 550, delay: LIFT_AT, easing: EASE_IN_OUT })
      play(skip, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: LIFT_AT, easing: EASE_OUT, fill: 'forwards' })

      // Just before the lift the assignee's mark leaves the card and flies to the real navbar logo.
      timers.push(window.setTimeout(() => {
        if (ended) return
        const from = mark.getBoundingClientRect()
        const target = document.querySelector('.navbar .logo-mark')?.getBoundingClientRect()
        const flyer = mark.cloneNode(true) as SVGSVGElement
        flyer.classList.add('tx-intro-flyer')
        Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` })
        root.appendChild(flyer)
        // opacity, not visibility: a hidden clipPath would also clip away the flyer's K (same id).
        mark.style.opacity = '0'
        const to = target && target.width > 0 ? target : { left: from.left, top: -from.height, width: from.width }
        const moved = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`
        play(flyer, [
          { offset: 0, transform: 'none', opacity: 1, easing: EASE_IN_OUT },
          { offset: 520 / 620, transform: moved, opacity: 1 },
          { offset: 1, transform: moved, opacity: 0 },
        ], { duration: 620 })
      }, LIFT_AT - 80))
      timers.push(window.setTimeout(() => { if (!ended) finish() }, TOTAL))
    }

    return () => {
      events.forEach((name) => window.removeEventListener(name, end))
      timers.forEach(clearTimeout)
      anims.forEach((anim) => anim.cancel())
      root.querySelectorAll('.tx-intro-flyer').forEach((el) => el.remove())
      root.classList.remove('is-resolved')
      mark.style.opacity = ''
    }
  }, [show, finish])

  // Tell the hero test run it can start once the intro is gone (or was never shown).
  useLayoutEffect(() => {
    if (!show) window.dispatchEvent(new Event(INTRO_END_EVENT))
  }, [show])

  if (!show) return null

  return (
    <div ref={rootRef} className="tx-intro" role="presentation">
      <div className="tx-intro-cover" aria-hidden="true">
        <div className="tx-intro-card">
          <div className="tx-intro-top">
            <span className="tx-intro-id">KR-001</span>
            <span className="tx-intro-status">
              <span>Open</span>
              <span>In review</span>
              <span>Resolved ✓</span>
            </span>
          </div>
          <strong className="tx-intro-title">Welcome, visitor</strong>
          <dl className="tx-intro-meta">
            <div>
              <dt>Reporter</dt>
              <dd>You</dd>
            </div>
            <div>
              <dt>Assignee</dt>
              <dd>
                <LogoMark className="logo-mark tx-intro-mark" />
                Ken Romero
              </dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>Come on in</dd>
            </div>
          </dl>
        </div>
      </div>
      <button type="button" className="tx-intro-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  )
}
