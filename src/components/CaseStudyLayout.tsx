import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import LegalLinks from './LegalLinks'
import usePageMeta from './usePageMeta'
import useScrollHints from './useScrollHints'

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
  usePageMeta(`${title} | Ken Romero QA Case Study`, lead)
  useScrollHints()

  return (
    <div className="case-study-page">
      <header className="case-nav">
        <div className="container case-nav-inner">
          <Link className="case-brand" to="/qa">
            <span>Ken Romero</span>
            <small>QA Engineer &amp; Web Developer</small>
          </Link>
          <Link className="case-back" to="/qa">← Back to portfolio</Link>
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
              <p className="eyebrow">MORE PROJECTS</p>
              <h2>Continue exploring the portfolio.</h2>
            </div>
            <Link className="button button-primary" to="/qa#projects">
              See all projects
            </Link>
          </div>
        </section>
      </main>
      <footer className="legal-footer">
        <div className="container">
          <LegalLinks />
        </div>
      </footer>
    </div>
  )
}
