import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import LogoMark from '../../components/LogoMark'

// First-visit welcome: a queue ticket pops up, the KR mark draws on its stub, the stub tears off
// and the mark flies into the navbar logo while the cover lifts. Plays once per tab session, ends on
// any click, key, scroll or touch, and the page is fully rendered underneath the whole time.
// Plan and previews: "Welcome Intro Concepts" (concept D).

const SEEN_KEY = 'kr-intro-seen'
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)'
const EASE_PLAYFUL = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
// HOLD keeps the finished ticket on screen a beat longer so "Welcome in" can be read (2.5s total).
const HOLD = 580
const TEAR_AT = 1200 + HOLD
const TOTAL = 1920 + HOLD

function shouldPlay() {
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

export default function WelcomeIntro() {
  const [show, setShow] = useState(shouldPlay)
  const rootRef = useRef<HTMLDivElement>(null)
  const finish = useCallback(() => setShow(false), [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!show || !root) return
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Ignore: see shouldPlay.
    }
    const q = <T extends Element>(selector: string) => root.querySelector(selector) as T
    const cover = q<HTMLElement>('.intro-cover')
    const ticket = q<HTMLElement>('.intro-ticket')
    const stub = q<HTMLElement>('.intro-stub')
    const mark = q<SVGSVGElement>('.intro-mark')
    const skip = q<HTMLElement>('.intro-skip')
    const anims: Animation[] = []
    const timers: number[] = []
    const play = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const anim = el.animate(keyframes, { fill: 'both', ...options })
      anims.push(anim)
      return anim
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
      // Still ticket for a beat, then a soft fade. No travel.
      play(root, [{ opacity: 1 }, { opacity: 0 }], { duration: 250, delay: 400, easing: EASE_OUT }).finished.then(finish, () => {})
    } else {
      play(ticket, [
        { transform: 'translateY(40%) rotate(-6deg)', opacity: 0 },
        { transform: 'translateY(0) rotate(-2deg)', opacity: 1 },
      ], { duration: 450, easing: EASE_PLAYFUL })
      play(skip, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 150, easing: EASE_OUT })
      mark.querySelectorAll('path').forEach((path, i) => {
        path.setAttribute('pathLength', '1')
        // The first three paths are the ring arcs, the rest are the K and R strokes.
        const delay = i < 3 ? 200 + i * 80 : 450
        play(path, [
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDasharray: 1, strokeDashoffset: 0 },
        ], { duration: i < 3 ? 600 : 450, delay, easing: EASE_OUT })
      })
      play(stub, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-8deg)' }], { duration: 200, delay: 1000 + HOLD, easing: EASE_OUT, fill: 'forwards' })
      play(cover, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: 550, delay: 1300 + HOLD, easing: EASE_IN_OUT })
      play(skip, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: 1300 + HOLD, easing: EASE_OUT, fill: 'forwards' })

      // At the tear the mark lifts off the stub and flies to the real navbar logo.
      timers.push(window.setTimeout(() => {
        if (ended) return
        const from = mark.getBoundingClientRect()
        const target = document.querySelector('.navbar .logo-mark')?.getBoundingClientRect()
        const flyer = mark.cloneNode(true) as SVGSVGElement
        flyer.classList.add('intro-flyer')
        Object.assign(flyer.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` })
        root.appendChild(flyer)
        // opacity, not visibility: a hidden clipPath would also clip away the flyer's K (same id).
        mark.style.opacity = '0'
        const to = target && target.width > 0 ? target : { left: from.left, top: -from.height, width: from.width }
        const moved = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`
        play(flyer, [
          { offset: 0, transform: 'none', opacity: 1, easing: EASE_IN_OUT },
          { offset: 600 / 720, transform: moved, opacity: 1 },
          { offset: 1, transform: moved, opacity: 0 },
        ], { duration: 720 })
        play(stub, [
          { transform: 'rotate(-8deg)', opacity: 1 },
          { transform: 'translateY(250%) rotate(-24deg)', opacity: 0 },
        ], { duration: 500, easing: EASE_IN_OUT, fill: 'forwards' })
      }, TEAR_AT))
      timers.push(window.setTimeout(() => { if (!ended) finish() }, TOTAL))
    }

    return () => {
      events.forEach((name) => window.removeEventListener(name, end))
      timers.forEach(clearTimeout)
      anims.forEach((anim) => anim.cancel())
      root.querySelectorAll('.intro-flyer').forEach((el) => el.remove())
      mark.style.opacity = ''
    }
  }, [show, finish])

  if (!show) return null

  return (
    <div ref={rootRef} className="intro" role="presentation">
      <div className="intro-cover" aria-hidden="true">
        <div className="intro-ticket">
          <div className="intro-stub">
            <span className="intro-disc">
              <LogoMark className="logo-mark intro-mark" />
            </span>
            <small>You’re next</small>
          </div>
          <div className="intro-body">
            <small>Now serving: you</small>
            <strong>Welcome in</strong>
            <small>Ken Romero · Creative portfolio</small>
          </div>
        </div>
      </div>
      <button type="button" className="intro-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  )
}
