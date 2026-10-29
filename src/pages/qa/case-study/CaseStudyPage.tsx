import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import LegalLinks from '../../../components/LegalLinks'
import { imageProps } from '../../../components/responsiveImage'
import SiteHeader, { type NavItem } from '../../../components/SiteHeader'
import { bookingLink } from '../../../data/profile'
import { techContent } from '../../../data/tech'
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

// Case studies in the same order as the home page Projects grid.
const caseStudies = techContent.projects.flatMap((project) =>
  project.link?.to?.startsWith('/qa/projects/') ? [{ ...project, to: project.link.to }] : [],
)

// The case studies before and after this one, wrapping around at the ends.
function usePagerLinks() {
  const { pathname } = useLocation()
  const index = caseStudies.findIndex((project) => project.to === pathname.replace(/\/$/, ''))
  if (index < 0) return []
  const at = (offset: number) => caseStudies[(index + offset + caseStudies.length) % caseStudies.length]
  return [
    { label: 'Previous', project: at(-1) },
    { label: 'Next', project: at(1) },
  ]
}

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
  // Projects still in progress say where they stand instead of claiming a result.
  resultLabel?: string
  status?: string
  chapters: CaseStudyChapter[]
  pdf?: string
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
  resultLabel = 'Result',
  status,
  children,
}: CaseStudyPageProps) {
  usePageMeta(`${title} | Ken Romero QA Case Study`, lead)
  const active = useActiveChapter(chapters.map((chapter) => chapter.id))
  const pager = usePagerLinks()
  const summaryItems = [
    ['Problem', summary.problem],
    ['My role', summary.role],
    ['Approach', summary.approach],
    [resultLabel, summary.result],
  ]

  return (
    <div className="tech-theme cs-page">
      <SiteHeader
        brandRole="QA & Software Development"
        brandHref="/qa"
        navItems={navItems}
        cta={{ label: 'Book a Discovery Call', href: bookingLink.href }}
      />

      <main id="top">
        <section className="cs-hero">
          <div className="container cs-hero-grid">
            <div>
              <Link className="cs-back" to="/qa#projects">
                <ArrowLeft aria-hidden="true" /> All projects
              </Link>
              <p className="cs-kicker">
                {kicker}
                {status && <span className="cs-status">{status}</span>}
              </p>
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
              <img {...imageProps(heroImage.src)} alt={heroImage.alt} />
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
                <div key={label} className={label === resultLabel ? 'is-result' : undefined}>
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
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className={active === chapter.id ? 'is-active' : undefined}
                      aria-current={active === chapter.id ? 'location' : undefined}
                    >
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

        <section className="cs-next" aria-label="More case studies">
          <div className="container cs-next-inner">
            <div className="cs-next-head">
              <h2>More case studies</h2>
              {pdf && (
                <a className="cs-next-pdf" href={pdf} target="_blank" rel="noreferrer">
                  <FileText aria-hidden="true" /> Full case study (PDF)
                </a>
              )}
            </div>
            <div className="cs-pager">
              {pager.map(({ label, project }) => (
                <Link key={label} className={`cs-pager-card is-${label.toLowerCase()}`} to={project.to}>
                  <span className="cs-pager-thumb">
                    {project.image && <img {...imageProps(project.image)} alt="" loading="lazy" />}
                  </span>
                  <span className="cs-pager-text">
                    <small>
                      {label === 'Previous' && <ArrowLeft aria-hidden="true" />}
                      {label}
                      {label === 'Next' && <ArrowRight aria-hidden="true" />}
                    </small>
                    <strong>{project.title}</strong>
                    <span>{project.category}</span>
                  </span>
                </Link>
              ))}
            </div>
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
