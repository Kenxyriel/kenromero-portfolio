import { legalDocs } from '../data/legal'
import { bookingLink } from '../data/profile'
import { navItems } from '../pages/qa/case-study/CaseStudyPage'
import LegalContent from './LegalContent'
import LegalLinks from './LegalLinks'
import SiteHeader from './SiteHeader'
import usePageMeta from './usePageMeta'
import '../pages/qa/fonts'
import '../pages/qa/tech.css'
import '../pages/qa/case-study/case-study.css'

// Privacy Policy / Terms of Use for the tech portfolio (and the combined site), in the tech brand.
export default function LegalPage({ slug }: { slug: keyof typeof legalDocs }) {
  const doc = legalDocs[slug]
  usePageMeta(`${doc.title} | Ken Romero`, doc.description)

  return (
    <div className="tech-theme cs-page tx-legal">
      <SiteHeader
        brandRole="QA & Software Development"
        brandHref="/qa"
        navItems={navItems}
        cta={{ label: 'Book a Discovery Call', href: bookingLink.href }}
      />
      <main id="top" className="container legal-main">
        <LegalContent doc={doc} />
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
