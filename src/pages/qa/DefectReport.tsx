import type { LucideIcon } from 'lucide-react'

type DefectReportCard = {
  icon: LucideIcon
  title: string
  description: string
}

type DefectReportProps = {
  eyebrow: string
  title: string
  description: string
  cards: DefectReportCard[]
  muted?: boolean
}

export default function DefectReport({ eyebrow, title, description, cards, muted = false }: DefectReportProps) {
  return (
    <section className={`section${muted ? ' section-muted' : ''}`}>
      <div className="container">
        <div className="section-heading compact">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="defect-layout">
          {cards.map(({ icon: Icon, title: cardTitle, description: cardDescription }) => (
            <div className="defect-card" key={cardTitle}>
              <Icon size={25} />
              <strong>{cardTitle}</strong>
              <span>{cardDescription}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
