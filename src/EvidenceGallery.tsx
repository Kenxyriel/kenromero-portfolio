import type { LucideIcon } from 'lucide-react'

type EvidenceItem = {
  title: string
  icon: LucideIcon
  note: string
}

type EvidenceGalleryProps = {
  items: EvidenceItem[]
}

export default function EvidenceGallery({ items }: EvidenceGalleryProps) {
  return (
    <div className="case-evidence-grid">
      {items.map(({ title, icon: Icon, note }) => (
        <article className="case-evidence-card" key={title}>
          <div className="case-evidence-visual">
            <Icon size={28} />
            <span>Verified artifact type</span>
            <small>Standalone image unavailable</small>
          </div>
          <div className="case-evidence-copy">
            <strong>{title}</strong>
            <span>{note}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
