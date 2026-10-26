// Overlap mark: the QA blue and creative amber circles, with the shared middle
// filled in. Colours come from CSS (--mark-*) so each theme can tune them.
export default function LogoMark({ className = 'logo-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="24" cy="32" r="17" fill="var(--mark-blue)" />
      <circle cx="40" cy="32" r="17" fill="var(--mark-amber)" />
      <path d="M32 17A17 17 0 0 1 32 47A17 17 0 0 1 32 17Z" fill="var(--mark-middle)" />
    </svg>
  )
}
