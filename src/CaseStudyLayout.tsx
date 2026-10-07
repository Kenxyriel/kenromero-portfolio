import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type CaseStudyLayoutProps = {
  category: string
  title: string
  subtitle?: string
  lead: string
  tags: string[]
  heroImage?: { src: string; alt: string }
  children: ReactNode
}

export default function CaseStudyLayout({
  category,
  title,
  subtitle,
  lead,
  tags,
  heroImage,
  children,
}: CaseStudyLayoutProps) {
  return (
    <div className="case-study-page">
      <header className="case-nav">
        <div className="container case-nav-inner">
          <Link className="case-brand" to="/qa">
            <span>Ken Romero</span>
            <small>QA / Application System Engineer</small>
          </Link>
          <Link className="case-back" to="/qa">← Back to QA Portfolio</Link>
        </div>
      </header>

      <main>
        <section className={`case-hero section${heroImage ? ' case-study-hero' : ''}`}>
          <div className={`container${heroImage ? ' case-study-hero-grid' : ''}`}>
            <div className={heroImage ? 'case-study-hero-content' : undefined}>
              <p className="eyebrow">{category}</p>
              <h1>{title}</h1>
              {subtitle && <p className="case-subtitle">{subtitle}</p>}
              <p className="case-lead">{lead}</p>
              <div className="case-tags">
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            {heroImage && (
              <div className="case-study-hero-image">
                <img src={heroImage.src} alt={heroImage.alt} />
              </div>
            )}
          </div>
        </section>

        {children}

        <section className="section case-footer-cta">
          <div className="container case-cta">
            <div>
              <p className="eyebrow">MORE QA PROJECTS</p>
              <h2>Continue exploring the QA portfolio.</h2>
            </div>
            <Link className="button button-primary" to="/qa">
              Back to QA Portfolio
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
