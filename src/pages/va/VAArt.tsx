import { useId } from 'react'

// Hand-drawn style decorations for the /va pages. All original SVG.

type ArtProps = { className?: string }

export function Squiggle({ className = '' }: ArtProps) {
  return (
    <svg className={`va-squiggle ${className}`} viewBox="0 0 220 18" fill="none" aria-hidden="true">
      <path
        d="M3 11c18-7 30 6 48-1s30-8 46 1 32 5 50-2 34-5 50 2 16 3 20 1"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Sparkle({ className = '' }: ArtProps) {
  return (
    <svg className={`va-sparkle ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0c1.6 11 7.8 17.6 20 20-12.2 2.4-18.4 9-20 20-1.6-11-7.8-17.6-20-20C12.2 17.6 18.4 11 20 0Z" fill="currentColor" />
    </svg>
  )
}

export function Waveform({ className = '' }: ArtProps) {
  const bars = [10, 22, 34, 18, 44, 28, 52, 30, 40, 16, 36, 24, 46, 20, 30, 12]
  return (
    <svg className={`va-waveform ${className}`} viewBox="0 0 160 60" aria-hidden="true">
      {bars.map((height, index) => (
        <rect key={index} x={index * 10 + 2} y={30 - height / 2} width="5" height={height} rx="2.5" fill="currentColor" />
      ))}
    </svg>
  )
}

export function Mic({ className = '' }: ArtProps) {
  return (
    <svg className={`va-mic ${className}`} viewBox="0 0 64 96" fill="none" aria-hidden="true">
      <rect x="18" y="4" width="28" height="50" rx="14" stroke="currentColor" strokeWidth="4" />
      <path d="M24 18h16M24 28h16M24 38h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 44c0 14 10.5 24 24 24s24-10 24-24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 68v18M18 90h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function CurlArrow({ className = '' }: ArtProps) {
  return (
    <svg className={`va-curl ${className}`} viewBox="0 0 120 70" fill="none" aria-hidden="true">
      <path
        d="M4 60c20-6 34-20 30-34-3-10-16-8-15 2 2 16 34 22 60 10 12-6 22-14 30-26"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M96 8l13 4-5 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DotGrid({ className = '' }: ArtProps) {
  return (
    <svg className={`va-dots ${className}`} viewBox="0 0 70 50" aria-hidden="true">
      {Array.from({ length: 20 }, (_, index) => (
        <circle key={index} cx={(index % 5) * 15 + 5} cy={Math.floor(index / 5) * 13 + 5} r="3.2" fill="currentColor" />
      ))}
    </svg>
  )
}

export function RotatingBadge({ text, className = '' }: { text: string; className?: string }) {
  const pathId = useId()
  return (
    <div className={`va-badge ${className}`} aria-hidden="true">
      <svg className="va-badge-ring" viewBox="0 0 120 120">
        <defs>
          <path id={pathId} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <text>
          <textPath href={`#${pathId}`} textLength="274" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Sparkle className="va-badge-center" />
    </div>
  )
}
