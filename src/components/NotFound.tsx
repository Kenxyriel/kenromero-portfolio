import { Link } from 'react-router-dom'
import usePageMeta from './usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found | Ken Romero', 'The requested page could not be found.')

  return (
    <main className="placeholder-page">
      <div className="container placeholder-page-inner">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link className="button button-primary" to="/">
          Go to homepage
        </Link>
      </div>
    </main>
  )
}
