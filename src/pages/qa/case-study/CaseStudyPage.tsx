import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import LegalLinks from '../../../components/LegalLinks'
import SiteHeader, { type NavItem } from '../../../components/SiteHeader'
import usePageMeta from '../../../components/usePageMeta'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '../tech.css'
import './case-study.css'

const navItems: NavItem[] = [
  { label: 'About', href: '/qa#about' },
  { label: 'Skills', href: '/qa#skills' },
  { label: 'Projects', href: '/qa#projects' },
]

export type CaseStudyChapter = { id: string; label: string }

type CaseStudyPageProps = {
  kicker: string
  title: string
  system: string
  lead: string
  tags: string[]
  heroImage: { src: string; alt: string }
  stats: { value: string; label: string }[]
  summary: { problem: string; role: string; approach: string; result: string }
  chapters: CaseStudyChapter[]
  pdf?: string
  next: { title: string; to: string }
  children: ReactNode
}

// Highlights the chapter currently in view in the "On this page" menu.
function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function CaseStudyPage({
  kicker,
  title,
  system,
  lead,
  tags,
  heroImage,
  stats,
  summary,
  chapters,
  pdf,
  next,
  children,
}: CaseStudyPageProps) {
  usePageMeta(`${title} | Ken Romero QA Case Study`, lead)
  const active = useActiveChapter(chapters.map((chapter) => chapter.id))
  const summaryItems = [
    ['Problem', summary.problem],
    ['My role', summary.role],
    ['Approach', summary.approach],
    ['Result', summary.result],
  ]

  return (
    <div className="tech-theme cs-page">
      <SiteHeader
        brandRole="QA & Software Development"
        brandHref="/qa"
        navItems={navItems}
        cta={{ label: "Let's Connect", href: '/qa#contact' }}
      />

      <main>
        <section className="cs-hero">
          <div className="container cs-hero-grid">
            <div>
              <Link className="cs-back" to="/qa#projects">
                <ArrowLeft aria-hidden="true" /> All projects
              </Link>
              <p className="cs-kicker">{kicker}</p>
              <h1>{title}</h1>
              <p className="cs-system">{system}</p>
              <p className="cs-lead">{lead}</p>
              <ul className="cs-tags" aria-label="Topics">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <figure className="cs-hero-frame">
              <div className="cs-hero-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img src={heroImage.src} alt={heroImage.alt} />
            </figure>
          </div>

          <div className="container">
            <dl className="cs-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="cs-summary" aria-labelledby="cs-summary-title">
          <div className="container">
            <h2 id="cs-summary-title" className="cs-kicker">
              // at a glance
            </h2>
            <div className="cs-summary-grid">
              {summaryItems.map(([label, text]) => (
                <div key={label} className={label === 'Result' ? 'is-result' : undefined}>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cs-body">
          <div className="container cs-body-grid">
            <nav className="cs-toc" aria-label="On this page">
              <p>On this page</p>
              <ol>
                {chapters.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className={active === chapter.id ? 'is-active' : undefined}
                      aria-current={active === chapter.id ? 'location' : undefined}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {chapter.label}
                    </a>
                  </li>
                ))}
              </ol>
              {pdf && (
                <a className="cs-toc-pdf" href={pdf} target="_blank" rel="noreferrer">
                  <FileText aria-hidden="true" /> Full case study (PDF)
                </a>
              )}
            </nav>

            <div className="cs-content">{children}</div>
          </div>
        </div>

        <section className="cs-next">
          <div className="container cs-next-grid">
            {pdf && (
              <a className="cs-next-card cs-next-pdf" href={pdf} target="_blank" rel="noreferrer">
                <FileText aria-hidden="true" />
                <span>
                  <small>QA artifact</small>
                  <strong>Read the full case study (PDF)</strong>
                </span>
              </a>
            )}
            <Link className="cs-next-card" to={next.to}>
              <span>
                <small>Next case study</small>
                <strong>{next.title}</strong>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="cs-footer">
        <div className="container cs-footer-inner">
          <span>© {new Date().getFullYear()} Ken Romero</span>
          <LegalLinks />
        </div>
      </footer>
    </div>
  )
}
