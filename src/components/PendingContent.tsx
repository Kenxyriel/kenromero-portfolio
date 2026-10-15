type PendingContentProps = {
  label: string
}

// Marks a section whose verified content has not been added yet.
// Visible only in development so unfinished sections never reach production.
export default function PendingContent({ label }: PendingContentProps) {
  if (!import.meta.env.DEV) return null

  return (
    <div className="pending-content" role="note">
      <strong>Content pending</strong>
      <span>{label}</span>
    </div>
  )
}
