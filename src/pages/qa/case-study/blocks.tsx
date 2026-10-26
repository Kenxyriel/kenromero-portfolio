import type { ReactNode } from 'react'
import { ArrowRight, Check, type LucideIcon } from 'lucide-react'

// Building blocks shared by the QA case study pages. Each page composes these
// inside <CaseStudyPage>, so both case studies read and look the same.

export function Chapter({
  id,
  number,
  title,
  intro,
  children,
}: {
  id: string
  number: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="cs-chapter" id={id} aria-labelledby={`${id}-title`}>
      <header className="cs-chapter-head">
        <p className="cs-kicker">
          {number} / {id}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p className="cs-chapter-intro">{intro}</p>}
      </header>
      {children}
    </section>
  )
}

export function Block({
  title,
  note,
  icon: Icon,
  className = '',
  children,
}: {
  title?: string
  note?: ReactNode
  icon?: LucideIcon
  className?: string
  children: ReactNode
}) {
  return (
    <article className={`cs-block ${className}`}>
      {title && (
        <h3 className="cs-block-title">
          {Icon && <Icon aria-hidden="true" />}
          {title}
        </h3>
      )}
      {note && <p className="cs-block-note">{note}</p>}
      {children}
    </article>
  )
}

export function Callout({ title, children, tone = 'info' }: { title?: string; children: ReactNode; tone?: 'info' | 'pass' }) {
  return (
    <div className={`cs-callout cs-callout-${tone}`}>
      {title && <strong>{title}</strong>}
      <span>{children}</span>
    </div>
  )
}

// Tables become one card per row on phones; data-label carries each column name.
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[]
  rows: ReactNode[][]
  caption?: string
}) {
  return (
    <div className="cs-table-wrap">
      <table className="cs-table">
        {caption && <caption className="tx-sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) => (
                <td key={index} data-label={columns[index]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Pass = () => <span className="cs-pass">Pass</span>

export const Method = ({ name }: { name: string }) => (
  <span className={`cs-method cs-method-${name.toLowerCase()}`}>{name}</span>
)

export const Id = ({ children }: { children: ReactNode }) => <span className="cs-id">{children}</span>

// Numbered steps that wrap onto new rows instead of squeezing their labels.
// Up to five sit on one row; longer runs split into two even rows.
const perRow = (count: number) => ({ ['--per-row' as string]: count <= 5 ? count : Math.ceil(count / 2) })

export function Steps({ steps }: { steps: { label: string; detail?: string; icon?: LucideIcon }[] }) {
  return (
    <ol className="cs-steps" style={perRow(steps.length)}>
      {steps.map(({ label, detail, icon: Icon }, index) => (
        <li key={label}>
          <span className="cs-step-num" aria-hidden="true">
            {Icon ? <Icon /> : String(index + 1).padStart(2, '0')}
          </span>
          <strong>{label}</strong>
          {detail && <small>{detail}</small>}
        </li>
      ))}
    </ol>
  )
}

export function Checklist({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`cs-checks cs-checks-${columns}`}>
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function IconCards({ items }: { items: { title: string; text: string; icon: LucideIcon }[] }) {
  return (
    <div className="cs-icon-cards" style={{ ['--per-row' as string]: items.length <= 5 ? items.length : items.length % 3 === 0 ? 3 : 4 }}>
      {items.map(({ title, text, icon: Icon }) => (
        <div className="cs-icon-card" key={title}>
          <Icon aria-hidden="true" />
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}

export type Defect = {
  id: string
  title: string
  summary: string
  expected: string
  actual?: string
  impact: string
}

export function DefectCard({ defect }: { defect: Defect }) {
  return (
    <article className="cs-defect">
      <div className="cs-defect-head">
        <span className="cs-defect-id">{defect.id}</span>
        <span className="cs-chip cs-chip-red">Severity: High</span>
        <span className="cs-chip cs-chip-red">Priority: High</span>
      </div>
      <h4>{defect.title}</h4>
      <p>{defect.summary}</p>
      <dl className="cs-defect-compare">
        <div>
          <dt>Expected</dt>
          <dd>{defect.expected}</dd>
        </div>
        {defect.actual && (
          <div className="is-actual">
            <dt>Actual</dt>
            <dd>{defect.actual}</dd>
          </div>
        )}
      </dl>
      <p className="cs-defect-impact">
        <strong>Impact:</strong> {defect.impact}
      </p>
    </article>
  )
}

export function BugReport({
  id,
  title,
  steps,
  expected,
  actual,
  acceptance,
}: {
  id: string
  title: string
  steps: string[]
  expected: string
  actual: string
  acceptance: string
}) {
  const meta: [string, string, string?][] = [
    ['Severity', 'High'],
    ['Priority', 'High'],
    ['Environment', 'UAT'],
    ['Initial test', 'Failed', 'red'],
    ['Retest', 'Passed', 'green'],
    ['Status', 'Resolved', 'green'],
  ]
  return (
    <article className="cs-ticket" aria-label={`Sample bug report ${id}`}>
      <div className="cs-ticket-bar">
        <span className="cs-id">{id}</span>
        <span>Azure DevOps · Bug</span>
      </div>
      <h4>{title}</h4>
      <div className="cs-ticket-meta">
        {meta.map(([label, value, tone]) => (
          <span key={label} className={tone ? `cs-chip cs-chip-${tone}` : 'cs-chip'}>
            {label}: <b>{value}</b>
          </span>
        ))}
      </div>
      <div className="cs-ticket-grid">
        <div>
          <h5>Reproduction steps</h5>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h5>Expected result</h5>
          <p>{expected}</p>
          <h5>Actual result</h5>
          <p>{actual}</p>
        </div>
        <div>
          <h5>Acceptance criteria</h5>
          <p>{acceptance}</p>
        </div>
      </div>
    </article>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="cs-link" href={href} target="_blank" rel="noreferrer">
      {children} <ArrowRight aria-hidden="true" />
    </a>
  )
}
