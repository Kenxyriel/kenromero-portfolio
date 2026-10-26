import {
  BarChart3,
  Boxes,
  Database,
  KeyRound,
  Monitor,
  NotebookPen,
  Receipt,
  ScanBarcode,
  Server,
  ShieldCheck,
  Store,
  Timer,
  Users,
} from 'lucide-react'
import CaseStudyPage from './case-study/CaseStudyPage'
import { Block, Callout, Chapter, Checklist, Gallery, IconCards, Steps } from './case-study/blocks'

const chapters = [
  { id: 'context', label: 'The idea' },
  { id: 'build', label: 'What I built' },
  { id: 'architecture', label: 'How it fits together' },
  { id: 'quality', label: 'Quality and security' },
  { id: 'next', label: 'Where it stands' },
]

const features = [
  { title: 'Fast checkout', text: 'Product tiles, search, barcode and camera scanning, held orders, and change computed on the spot.', icon: ScanBarcode },
  { title: 'Cash, GCash, utang', text: 'Three ways to pay, including store credit that keeps a running balance per customer.', icon: NotebookPen },
  { title: 'Receipts', text: 'Printable receipts with void and refund actions, plus receipt settings per store.', icon: Receipt },
  { title: 'Shifts', text: 'Opening cash, cash in and out, and a closing count that flags short or over drawers.', icon: Timer },
  { title: 'Products and stock', text: 'Deliveries, stock counts, reorder levels, low-stock alerts, and product import.', icon: Boxes },
  { title: 'Reports', text: 'Daily sales, 7 and 30 day trends, per-branch totals, and CSV export.', icon: BarChart3 },
  { title: 'Branches and roles', text: 'One organization, many branches. Owners, managers, supervisors and cashiers see different things.', icon: Store },
  { title: 'Approvals', text: 'Discounts, voids and opening a shift can require a supervisor PIN, and each approval is logged.', icon: KeyRound },
]

const architecture = [
  { label: 'Browser', detail: 'Desktop, tablet or phone', icon: Monitor },
  { label: 'React + TypeScript', detail: 'Material UI, Redux Toolkit, Recharts', icon: Store },
  { label: 'Express API', detail: 'TypeScript, JWT sign-in, permission checks', icon: Server },
  { label: 'MySQL', detail: '35 versioned migrations', icon: Database },
]

const safeguards = [
  'Sign-in with JWT, optional two-step codes, and rate limits on login',
  'Server-side permission checks per organization and branch',
  'Helmet security headers and an allow-list for cross-origin calls',
  'Audit log of sensitive actions, and approval PINs for discounts and voids',
  'CI type-checks and builds both apps on every pull request',
  'CI fails on a known high or critical hole in an API dependency',
  'Playwright smoke tests for the sign-in screen',
  'Secrets stay in a local .env file that is never committed',
]

export default function SaripointCaseStudy() {
  return (
    <CaseStudyPage
      kicker="// project · full-stack development"
      status="In progress"
      title="SARIPOINT Point of Sale"
      system="POS system for sari-sari stores and minimarts"
      lead="A browser-based point of sale I'm building for small Filipino retailers: checkout, receipts, shifts, store credit, stock, and reports in one app."
      tags={['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Material UI']}
      heroImage={{
        src: '/projects/saripoint/pos.webp',
        alt: 'SARIPOINT checkout screen with an order of coffee, pancit canton, eggs and cola totalling 135 pesos',
      }}
      stats={[
        { value: '180+', label: 'API endpoints' },
        { value: '35', label: 'Database migrations' },
        { value: '57', label: 'Feature switches' },
        { value: '120+', label: 'React components' },
      ]}
      summary={{
        problem:
          'Small stores still track sales, credit and stock on paper. Most POS software is priced and built for bigger shops.',
        role: 'Personal project: product planning, frontend, backend and database design.',
        approach:
          'A React and TypeScript frontend talking to an Express API over MySQL, with features that can be switched on per store.',
        result:
          'Runs end to end on a local setup. Online hosting, an installable app, and pilot stores are the next steps.',
      }}
      resultLabel="Where it stands"
      chapters={chapters}
      next={{ title: 'JJJ Tax and Accounting Website', to: '/qa/projects/jjj-website' }}
    >
      <Chapter
        id="context"
        number="01"
        title="The idea"
        intro="Sari-sari stores and minimarts need to record sales, keep track of who owes them, and know when to restock. SARIPOINT is my attempt at a low-cost, browser-based tool for that."
      >
        <Callout title="Honest status">
          This is a work in progress. It runs locally with a MySQL database. It is not yet hosted online, has no paying
          customers, and BIR accreditation for receipts has not been checked. The screenshots on this page use fictional
          demo data.
        </Callout>
      </Chapter>

      <Chapter
        id="build"
        number="02"
        title="What I built"
        intro="The app covers a full store day: open a shift, sell, take payment, print a receipt, and close out with reports."
      >
        <Block title="Main features">
          <IconCards items={features} />
        </Block>
        <Block title="Screens" note="Taken from my local build with a demo store and made-up products.">
          <Gallery
            items={[
              { src: '/projects/saripoint/receipt.webp', alt: 'Receipt dialog after a cash sale', caption: 'Receipt after a cash sale, with print, void and refund.' },
              { src: '/projects/saripoint/overview.webp', alt: 'Owner overview dashboard with sales today and a 7-day chart', caption: 'Owner overview: sales today and the last 7 days.' },
              { src: '/projects/saripoint/stock.webp', alt: 'Stock table with quantities and status per product', caption: 'Stock per branch, with low and out-of-stock filters.' },
              { src: '/projects/saripoint/reports.webp', alt: 'Sales report with daily chart and CSV export', caption: 'Sales reports across branches, exportable to CSV.' },
            ]}
          />
        </Block>
      </Chapter>

      <Chapter
        id="architecture"
        number="03"
        title="How it fits together"
        intro="One frontend and one API in a single repository. Every request is checked against the user's organization, branch and role on the server."
      >
        <Block>
          <Steps steps={architecture} />
        </Block>
        <Callout>
          Store owners can turn modules on or off, such as utang, job orders, or multi-branch, so a small store only sees
          what it needs.
        </Callout>
      </Chapter>

      <Chapter
        id="quality"
        number="04"
        title="Quality and security"
        intro="Money and stock data need care, so the safeguards were built in from the start rather than added at the end."
      >
        <Block title="Safeguards in the code" icon={ShieldCheck}>
          <Checklist items={safeguards} />
        </Block>
      </Chapter>

      <Chapter id="next" number="05" title="Where it stands">
        <div className="cs-grid-2">
          <Block title="Working now" icon={Users}>
            <Checklist
              columns={1}
              items={[
                'Checkout, receipts, voids and refunds',
                'Shifts, utang, stock and reports',
                'Organizations, branches and staff roles',
                'Runs locally on React, Express and MySQL',
              ]}
            />
          </Block>
          <Block title="Next steps" icon={Server}>
            <Checklist
              columns={1}
              items={[
                'Host an online demo with its own database of fake data',
                'Test on tablets and phones, then make it installable',
                'Demo to store owners and run a small pilot',
                'Check BIR rules before any real sales use',
              ]}
            />
          </Block>
        </div>
      </Chapter>
    </CaseStudyPage>
  )
}
