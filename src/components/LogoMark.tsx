import { useId } from 'react'

// KR mark: a dark K and an amber R sharing one stroke, inside a split ring.
// Colours come from CSS (--mark-*) so each theme can tune them.
export default function LogoMark({ className = 'logo-mark' }: { className?: string }) {
  const clip = useId()
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth="2.6" strokeLinecap="round">
        <path d="M32 59A27 27 0 0 1 32 5" stroke="var(--mark-accent)" />
        <path d="M32 5A27 27 0 0 1 55.38 45.5" stroke="var(--mark-ring)" />
        <path d="M48.62 53.28A27 27 0 0 1 32.94 58.98" stroke="var(--mark-ring-strong)" />
      </g>
      <defs>
        <clipPath id={clip}>
          <rect x="10" y="19" width="40" height="26" />
        </clipPath>
      </defs>
      <g fill="none" strokeWidth="5.4" transform="translate(32 32) scale(1.08) translate(-32 -32)">
        <g clipPath={`url(#${clip})`} stroke="var(--mark-ink)">
          <path d="M19 17V47" />
          <path d="M19 35.5L33.5 17M24 30.5L35.5 47" />
        </g>
        <path d="M31.5 21.7H38a6.3 6.3 0 0 1 0 12.6H33.5" stroke="var(--mark-accent)" strokeLinejoin="round" />
        <path d="M35.5 34.3L50.3 47.4" stroke="var(--mark-accent)" />
      </g>
    </svg>
  )
}
