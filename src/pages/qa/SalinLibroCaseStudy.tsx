import { Bug, Database, FlaskConical, LayoutDashboard, ListChecks, Monitor, Search, Server, UserPlus, Users } from 'lucide-react'
import CaseStudyPage from './case-study/CaseStudyPage'
import {
  Block,
  Callout,
  Chapter,
  Checklist,
  DataTable,
  DefectCard,
  Gallery,
  IconCards,
  Pass,
  Steps,
} from './case-study/blocks'

const chapters = [
  { id: 'context', label: 'The idea' },
  { id: 'build', label: 'What I built' },
  { id: 'architecture', label: 'How it fits together' },
  { id: 'testing', label: 'End-to-end tests' },
  { id: 'next', label: 'Where it stands' },
]

const features = [
  { title: 'Dashboard', text: 'Client totals, recent clients, and the records that need attention.', icon: LayoutDashboard },
  { title: 'Client list', text: 'Search and filter by status: Active, Inactive or Archived.', icon: Users },
  { title: 'Client profile', text: 'Business, registration and contact details in one place.', icon: ListChecks },
  { title: 'Two-step form', text: 'Add or edit a client in two short steps, with validation on both sides.', icon: UserPlus },
]

const architecture = [
  { label: 'Vue 3 UI', detail: 'Vite, Vue Router, Vuex, Bootstrap', icon: Monitor },
  { label: 'Axios', detail: 'Client service layer', icon: Search },
  { label: 'Express API', detail: 'REST routes, OpenAPI docs', icon: Server },
  { label: 'MySQL', detail: 'Through Sequelize', icon: Database },
]

const e2eRuns = [
  ['Create a client', 'New client appears with its details', <Pass />],
  ['Update a client', 'Changes save without creating a duplicate', <Pass />],
  ['Search by client name', 'Matching client is listed', <Pass />],
  ['Search by business name', 'Matching client is listed', <Pass />],
  ['Search by email', 'Matching client is listed', <span className="cs-chip cs-chip-red">Fail</span>],
  ['Filter by Inactive', 'Only inactive clients are listed', <Pass />],
  ['Filter by Archived', 'Only archived clients are listed', <Pass />],
]

export default function SalinLibroCaseStudy() {
  return (
    <CaseStudyPage
      kicker="// project · full-stack development"
      status="Paused"
      title="SalinLibro-CMS Client Management"
      system="Client management system for accounting firms"
      lead="A web app for Filipino accounting firms to keep client records in order, with a Playwright test suite that runs against its own test database."
      tags={['Vue 3', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Playwright']}
      heroImage={{
        src: '/projects/salinlibro/dashboard.webp',
        alt: 'SalinLibro dashboard with client totals, recent clients and items that need attention',
      }}
      stats={[
        { value: '7', label: 'End-to-end tests' },
        { value: '6', label: 'Passing' },
        { value: '1', label: 'Real bug caught' },
        { value: '4', label: 'Core client screens' },
      ]}
      summary={{
        problem:
          'Accounting firms juggle client profiles in spreadsheets and folders. Finding a client\'s details or status takes longer than it should.',
        role: 'Full-stack developer and project owner: Vue frontend, Express API, MySQL schema, and the end-to-end tests.',
        approach:
          'Build the client management core first, document the API with OpenAPI, and cover the main client flows with Playwright.',
        result:
          'The client core works and is covered by 7 end-to-end tests. Running them found a search bug. The project is paused for now.',
      }}
      resultLabel="Where it stands"
      chapters={chapters}
      next={{ title: 'Authentication & Proactive Lockout Testing', to: '/qa/projects/authentication-testing' }}
    >
      <Chapter
        id="context"
        title="The idea"
        intro="Salin libro is Filipino for transferring the books. The app is meant to move an accounting firm's client records out of spreadsheets, with room to add documents, billing and BIR forms later."
      >
        <Callout title="Honest status">
          The project is paused. It runs locally and has not been deployed. Modules such as documents, billing and BIR
          forms are planned and marked Soon in the app. Screenshots use fictional demo clients.
        </Callout>
      </Chapter>

      <Chapter id="build" title="What I built">
        <Block>
          <IconCards items={features} />
        </Block>
        <Block title="Screens">
          <Gallery
            items={[
              { src: '/projects/salinlibro/clients.webp', alt: 'Client list with status labels and totals', caption: 'Client list with totals and status filter.' },
              { src: '/projects/salinlibro/detail.webp', alt: 'Client profile showing a client snapshot', caption: 'Client profile with the snapshot tab open.' },
              { src: '/projects/salinlibro/form.webp', alt: 'Add new client form, step 1 of 2', caption: 'Adding a client, step 1 of 2.' },
              { src: '/projects/salinlibro/search-bug.webp', alt: 'Searching for an email address returns No clients found', caption: 'The bug: searching by email finds nothing.' },
            ]}
          />
        </Block>
      </Chapter>

      <Chapter id="architecture" title="How it fits together">
        <Block>
          <Steps steps={architecture} />
        </Block>
        <Callout>
          The API is documented with an OpenAPI file, and secrets live in environment files with a checked-in
          .env.example template.
        </Callout>
      </Chapter>

      <Chapter
        id="testing"
        title="End-to-end tests"
        intro="Playwright starts the API in test mode against a separate test database, starts the Vue app, and drives the real screens. A cleanup script removes the clients each run creates."
      >
        <Block title="Latest run" note="Run on October 26, 2026 against a fresh test database." icon={FlaskConical}>
          <DataTable caption="End-to-end test results" columns={['Test', 'Expected', 'Result']} rows={e2eRuns} />
        </Block>
        <DefectCard
          defect={{
            id: 'Defect 01',
            title: 'Client search ignores email addresses',
            summary:
              'The search box says "Search by name, business, TIN, email", but the list filter only looks at name, business, TIN, phone and business type.',
            expected: 'Typing a client\'s email shows that client.',
            actual: 'The list shows "No clients found".',
            impact: 'Staff cannot find a client by the email they were contacted from.',
            severity: 'Medium',
            priority: 'Medium',
          }}
        />
        <Callout title="Why this matters">
          The test was written from what the screen promises, not from what the code does. That is how it caught a gap
          the code itself would never flag.
        </Callout>
      </Chapter>

      <Chapter id="next" title="Where it stands">
        <div className="cs-grid-2">
          <Block title="Done" icon={ListChecks}>
            <Checklist
              columns={1}
              items={[
                'Dashboard, client list, profile and form',
                'REST API with OpenAPI documentation',
                'Playwright suite with test data cleanup',
              ]}
            />
          </Block>
          <Block title="Next" icon={Bug}>
            <Checklist
              columns={1}
              items={[
                'Add email to the search filter and rerun the suite',
                'Sign-in and roles before any real use',
                'Documents, billing and BIR forms modules',
              ]}
            />
          </Block>
        </div>
      </Chapter>
    </CaseStudyPage>
  )
}
