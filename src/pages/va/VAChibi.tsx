import { useEffect, useRef, useState } from 'react'

// A small chibi Ken who wanders along the bottom of the creative portfolio
// and stops now and then to do a bit of the work the site is about. It is
// purely decorative: hidden from screen readers and click-through, so it never
// gets in the way of buttons or forms. Visitors who prefer reduced motion see
// it sitting still at its laptop instead.

type Act = 'laptop' | 'podcast' | 'coffee' | 'phone' | 'wave'
type Mode = 'walk' | 'idle' | Act

const acts: { act: Act; lines: string[] }[] = [
  { act: 'laptop', lines: ['editing the next episode…', 'on a design deadline', 'tweaking the colours'] },
  { act: 'podcast', lines: ["and we're live!", 'recording session'] },
  { act: 'coffee', lines: ['coffee first', 'quick coffee break'] },
  { act: 'phone', lines: ['new post is up!', 'scheduling content'] },
  { act: 'wave', lines: ['hi there!', "let's work together!"] },
]

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function VAChibi() {
  const [x, setX] = useState(-90)
  const [walkSeconds, setWalkSeconds] = useState(0)
  const [facingLeft, setFacingLeft] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [line, setLine] = useState<string | null>(null)
  const xRef = useRef(-90)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const width = () => ref.current?.offsetWidth ?? 72
    const range = () => Math.max(0, window.innerWidth - width() - 24)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWalkSeconds(0)
      setX(range())
      setMode('laptop')
      return
    }

    let alive = true
    let lastAct: Act | null = null

    async function run() {
      await wait(1200)
      while (alive) {
        // Walk somewhere at least a little way off, at a gentle pace.
        const max = range()
        let target = Math.round(12 + Math.random() * (max - 12))
        if (Math.abs(target - xRef.current) < 120) target = xRef.current < max / 2 ? max : 12
        const distance = Math.abs(target - xRef.current)
        const seconds = distance / (window.innerWidth < 640 ? 32 : 46)
        setFacingLeft(target < xRef.current)
        setWalkSeconds(seconds)
        setMode('walk')
        setX(target)
        xRef.current = target
        await wait(seconds * 1000)
        if (!alive) return

        // Stop and do something, with a short note for the first few seconds.
        const choice = pick(acts.filter((item) => item.act !== lastAct))
        lastAct = choice.act
        setMode(choice.act)
        setLine(pick(choice.lines))
        await wait(3400)
        setLine(null)
        await wait(2600 + Math.random() * 2000)
        if (!alive) return
        setMode('idle')
        await wait(900)
      }
    }
    run()

    // Keep it on screen when the window shrinks.
    const onResize = () => {
      if (xRef.current > range()) {
        xRef.current = range()
        setWalkSeconds(0)
        setX(range())
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      alive = false
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Near either edge of the screen the note leans inward so it isn't cut off.
  const bubbleSide = () => {
    if (x < 70) return ' is-start'
    if (x > window.innerWidth - 150) return ' is-end'
    return ''
  }

  return (
    <div
      ref={ref}
      className="va-chibi"
      data-mode={mode}
      aria-hidden="true"
      style={{ transform: `translateX(${x}px)`, transitionDuration: `${walkSeconds}s` }}
    >
      <span className={`va-chibi-bubble${line ? ' is-shown' : ''}${bubbleSide()}`}>{line}</span>
      <svg className={`va-chibi-svg${facingLeft ? ' is-left' : ''}`} viewBox="0 0 72 78" focusable="false">
        <ellipse className="cb-shadow" cx="36" cy="75.5" rx="13" ry="2" />

        <g className="cb-figure">
          <g className="cb-legs">
            <g className="cb-leg cb-leg-a">
              <line x1="32" y1="57" x2="32" y2="69" />
              <rect x="28.5" y="68.5" width="9" height="5" rx="2.5" />
            </g>
            <g className="cb-leg cb-leg-b">
              <line x1="40" y1="57" x2="40" y2="69" />
              <rect x="36.5" y="68.5" width="9" height="5" rx="2.5" />
            </g>
          </g>

          <g className="cb-upper">
            {/* Tee with a tiny amber heart, like the laptop on the service mascots. */}
            <path className="cb-tee" d="M27 42h18q4 0 5 4l2 9q.6 3-2.4 3H22.4q-3 0-2.4-3l2-9q1-4 5-4z" />
            <path className="cb-tee-heart" d="M39.5 48.2c-.9-1.4-3-.9-3 .7 0 1.2 1.6 2.2 3 3.2 1.4-1 3-2 3-3.2 0-1.6-2.1-2.1-3-.7z" />

            <g className="cb-arm cb-arm-l">
              <line className="cb-sleeve" x1="27" y1="45" x2="24.5" y2="51" />
              <line className="cb-skin-line" x1="24.5" y1="51" x2="23.5" y2="55" />
              <circle className="cb-skin" cx="23.5" cy="56.5" r="3" />
            </g>
            <g className="cb-arm cb-arm-r">
              <line className="cb-sleeve" x1="45" y1="45" x2="47.5" y2="51" />
              <line className="cb-skin-line" x1="47.5" y1="51" x2="48.5" y2="55" />
              <circle className="cb-skin" cx="48.5" cy="56.5" r="3" />
            </g>

            <g className="cb-head">
              <circle className="cb-skin" cx="20.5" cy="29" r="3" />
              <circle className="cb-skin" cx="51.5" cy="29" r="3" />
              <circle className="cb-skin" cx="36" cy="27" r="15.5" />
              <g className="cb-hair">
                <circle cx="23" cy="21" r="6" />
                <circle cx="29" cy="14" r="7" />
                <circle cx="37" cy="11.5" r="7.5" />
                <circle cx="45" cy="15" r="6.5" />
                <circle cx="49.5" cy="21.5" r="5" />
                <circle cx="21" cy="26" r="4" />
                <circle cx="51" cy="26" r="3.6" />
                <circle cx="28" cy="18.5" r="4.5" />
                <circle cx="34.5" cy="17.5" r="4.5" />
                <circle cx="41" cy="18" r="4.5" />
                <circle cx="46" cy="19.5" r="4" />
              </g>
              <g className="cb-eyes">
                <ellipse cx="30.5" cy="28.5" rx="1.7" ry="2.2" />
                <ellipse cx="41.5" cy="28.5" rx="1.7" ry="2.2" />
              </g>
              <circle className="cb-cheek" cx="26.5" cy="32.5" r="2.4" />
              <circle className="cb-cheek" cx="45.5" cy="32.5" r="2.4" />
              <path className="cb-smile" d="M33.3 34q2.7 2.6 5.4 0" />
              <ellipse className="cb-talk" cx="36" cy="35" rx="2" ry="1.6" />

              <g className="cb-prop cb-headphones">
                <path d="M19.5 27Q19 6 36 6t16.5 21" />
                <rect x="16" y="23" width="6" height="10" rx="3" />
                <rect x="50" y="23" width="6" height="10" rx="3" />
              </g>
            </g>

            {/* Poses that replace the resting right arm (or both arms). */}
            <g className="cb-prop cb-arm-wave">
              <line className="cb-sleeve" x1="45" y1="45" x2="49.5" y2="40" />
              <line className="cb-skin-line" x1="49.5" y1="40" x2="52.5" y2="34" />
              <circle className="cb-skin" cx="53" cy="32.5" r="3.2" />
            </g>
            <g className="cb-prop cb-arm-coffee">
              <line className="cb-sleeve" x1="45" y1="45" x2="48" y2="51" />
              <line className="cb-skin-line" x1="48" y1="51" x2="45" y2="48" />
              <g className="cb-mug">
                <path className="cb-steam" d="M41 39q-1.5-2 0-4t0-4M44.5 39q-1.5-2 0-4t0-4" />
                <rect x="39" y="41" width="8" height="8.5" rx="1.6" />
                <path className="cb-mug-handle" d="M47 43.2h1.2q2 0 2 2t-2 2H47" />
                <circle className="cb-skin" cx="44.5" cy="48" r="2.8" />
              </g>
            </g>
            <g className="cb-prop cb-arm-mic">
              <line className="cb-sleeve" x1="45" y1="45" x2="48" y2="51" />
              <line className="cb-skin-line" x1="48" y1="51" x2="45" y2="44.5" />
              <line className="cb-mic-handle" x1="43.5" y1="40.5" x2="45" y2="46" />
              <circle className="cb-mic-head" cx="43" cy="38.5" r="3.3" />
              <circle className="cb-skin" cx="44.8" cy="44.5" r="2.7" />
              <path className="cb-waves" d="M57 31q2 3.5 0 7M60.5 29q3 5.5 0 11" />
            </g>
            <g className="cb-prop cb-arms-phone">
              <line className="cb-sleeve" x1="27" y1="45" x2="26" y2="51" />
              <line className="cb-sleeve" x1="45" y1="45" x2="46" y2="51" />
              <line className="cb-skin-line" x1="26" y1="51" x2="31" y2="53" />
              <line className="cb-skin-line" x1="46" y1="51" x2="41" y2="53" />
              <rect className="cb-phone" x="31" y="44" width="10" height="13" rx="2" />
              <rect className="cb-phone-screen" x="32.5" y="45.5" width="7" height="9" rx="1" />
              <circle className="cb-skin" cx="31.5" cy="53.5" r="2.6" />
              <circle className="cb-skin" cx="40.5" cy="53.5" r="2.6" />
              <path className="cb-like" d="M56 30.6c-1.3-2-4.4-1.3-4.4 1 0 1.8 2.3 3.2 4.4 4.7 2.1-1.5 4.4-2.9 4.4-4.7 0-2.3-3.1-3-4.4-1z" />
            </g>
          </g>
        </g>

        {/* Laptop seen from behind, the same silver lid and heart as the podcast mascot. */}
        <g className="cb-prop cb-laptop">
          <rect className="cb-lid" x="19" y="52" width="34" height="20" rx="2.2" />
          <path className="cb-lid-heart" d="M36 60.2c-1.1-1.7-3.7-1.1-3.7.9 0 1.5 1.9 2.7 3.7 4 1.8-1.3 3.7-2.5 3.7-4 0-2-2.6-2.6-3.7-.9z" />
          <rect className="cb-base" x="15" y="71.5" width="42" height="3" rx="1.5" />
        </g>
      </svg>
    </div>
  )
}
