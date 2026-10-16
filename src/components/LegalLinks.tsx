import { Link } from 'react-router-dom'

// Footer links to the legal pages. The creative portfolio keeps its own /va copies.
export default function LegalLinks({ base = '' }: { base?: string }) {
  return (
    <nav className="legal-links" aria-label="Legal">
      <Link to={`${base}/privacy`}>Privacy Policy</Link>
      <Link to={`${base}/terms`}>Terms of Use</Link>
    </nav>
  )
}
