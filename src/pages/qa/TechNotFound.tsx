import { Link } from 'react-router-dom'
import { useNotFoundMeta } from '../../components/NotFound'
import SiteHeader from '../../components/SiteHeader'
import { bookingLink } from '../../data/profile'
import { navItems } from './case-study/CaseStudyPage'
import './fonts'
import './tech.css'

// 404 for the tech site, written like the rest of it: a test that didn't find its page.
export default function TechNotFound() {
  useNotFoundMeta()

  return (
    <div className="tech-theme cs-page">
      <SiteHeader
        brandRole="QA & Software Development"
        brandHref="/qa"
        navItems={navItems}
        cta={{ label: 'Book a Discovery Call', href: bookingLink.href }}
      />
      <main id="top" className="tx-404">
        <div className="container">
          <p className="tx-404-id">404 · Expected a page, got nothing</p>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has moved. The rest of the site still passes.</p>
          <Link className="tx-404-home" to="/qa">
            Go to homepage
          </Link>
        </div>
      </main>
    </div>
  )
}
