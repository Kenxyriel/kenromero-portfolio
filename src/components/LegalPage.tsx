import { Link } from 'react-router-dom'
import { legalDocs } from '../data/legal'
import LegalContent from './LegalContent'
import LegalLinks from './LegalLinks'
import usePageMeta from './usePageMeta'

// Privacy Policy / Terms of Use for the tech portfolio (and the combined site).
export default function LegalPage({ slug }: { slug: keyof typeof legalDocs }) {
  const doc = legalDocs[slug]
  usePageMeta(`${doc.title} | Ken Romero`, doc.description)

  return (
    <div className="case-study-page legal-page">
      <header className="case-nav">
        <div className="container case-nav-inner">
          <Link className="case-brand" to="/">
            <span>Ken Romero</span>
            <small>QA Engineer &amp; Web Developer</small>
          </Link>
          <Link className="case-back" to="/">← Back to portfolio</Link>
        </div>
      </header>
      <main className="container legal-main">
        <LegalContent doc={doc} />
      </main>
      <footer className="legal-footer">
        <div className="container">
          <LegalLinks />
        </div>
      </footer>
    </div>
  )
}
