import React from 'react'

type SectionHeadingProps = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  compact?: boolean
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, compact = false, className = '' }: SectionHeadingProps) {
  const classes = ['section-heading', compact ? 'compact' : '', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
