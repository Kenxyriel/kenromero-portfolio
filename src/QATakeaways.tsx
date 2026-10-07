import { CheckCircle2 } from 'lucide-react'

export type QATakeawaysProps = {
  items: readonly string[]
}

export default function QATakeaways({ items }: QATakeawaysProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="takeaway-card">
          <div>
            <p className="eyebrow">QA TAKEAWAYS</p>
            <h2>Capabilities demonstrated by the case study</h2>
          </div>
          <div className="takeaway-list">
            {items.map((item) => (
              <span key={item}>
                <CheckCircle2 size={16} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
