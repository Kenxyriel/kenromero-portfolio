import LegalContent from '../../components/LegalContent'
import { legalDocs } from '../../data/legal'
import VALayout from './VALayout'

// Privacy Policy / Terms of Use inside the creative portfolio theme.
export default function VALegal({ slug }: { slug: keyof typeof legalDocs }) {
  const doc = legalDocs[slug]
  return (
    <VALayout meta={{ title: `${doc.title} | Ken Romero`, description: doc.description }}>
      <div className="container legal-main va-legal">
        <LegalContent doc={doc} />
      </div>
    </VALayout>
  )
}
