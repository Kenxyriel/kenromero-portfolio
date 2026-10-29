import {
  Activity,
  Bug,
  CheckCircle2,
  CircleSlash,
  ClipboardCheck,
  Clock3,
  Crosshair,
  ListChecks,
  LockKeyhole,
  MessagesSquare,
  RefreshCw,
  Shield,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react'
import CaseStudyPage from './case-study/CaseStudyPage'
import {
  Block,
  BugReport,
  Callout,
  Chapter,
  Checklist,
  DataTable,
  DefectCard,
  ExternalLink,
  IconCards,
  Id,
  Pass,
  Steps,
} from './case-study/blocks'

const chapters = [
  { id: 'context', label: 'The change' },
  { id: 'plan', label: 'Challenge and plan' },
  { id: 'execution', label: 'Test execution' },
  { id: 'defects', label: 'Defects found' },
  { id: 'verification', label: 'Retest and regression' },
  { id: 'outcome', label: 'Outcome' },
]

const contributions = [
  { title: 'Test design', text: 'Created test suites and test cases', icon: ClipboardCheck },
  { title: 'Functional testing', text: 'Validated login and lockout behaviour', icon: CheckCircle2 },
  { title: 'Negative testing', text: 'Tested invalid credentials and edge cases', icon: CircleSlash },
  { title: 'Defect management', text: 'Identified, documented and retested defects', icon: Bug },
  { title: 'Regression testing', text: 'Validated related authentication workflows', icon: RefreshCw },
  { title: 'Collaboration', text: 'Worked with Dev, SM, RM and TPM', icon: UsersRound },
]

// Failed attempt → lockout. `width` sizes the bar in the lockout ladder.
const lockoutLadder = [
  { attempt: '1st–3rd', lockout: 'No lockout', width: 0 },
  { attempt: '4th', lockout: '60 seconds', width: 8 },
  { attempt: '5th', lockout: '5 minutes', width: 18 },
  { attempt: '6th', lockout: '10 minutes', width: 28 },
  { attempt: '7th', lockout: '15 minutes', width: 38 },
  { attempt: '8th', lockout: '30 minutes', width: 52 },
  { attempt: '9th', lockout: '4 hours', width: 72 },
  { attempt: '10th', lockout: 'Indefinite', width: 100 },
]

const strategy = [
  { title: 'Functional', text: 'Validated login behavior, failed attempts, lockout rules, and recovery.', icon: ShieldCheck },
  { title: 'Negative', text: 'Tested invalid credentials, repeated failures, and incorrect authentication conditions.', icon: CircleSlash },
  { title: 'Boundary', text: 'Focused on transition points around failed authentication attempts and lockout behavior.', icon: Crosshair },
  { title: 'Regression', text: 'Validated related authentication workflows after the change was implemented.', icon: RefreshCw },
  { title: 'Security', text: 'Verified account protection and authentication behavior remained consistent.', icon: LockKeyhole },
]

const scenarios = [
  ['TC-001', 'Valid login', 'User logs in successfully'],
  ['TC-002', '1 invalid attempt', 'Login rejected'],
  ['TC-003', '3 invalid attempts', 'No lockout'],
  ['TC-004', '4th invalid attempt', '60-second lockout'],
  ['TC-005', '5th invalid attempt', '5-minute lockout'],
  ['TC-006', '6th invalid attempt', '10-minute lockout'],
  ['TC-007', '7th invalid attempt', '15-minute lockout'],
  ['TC-008', '8th invalid attempt', '30-minute lockout'],
  ['TC-009', '9th invalid attempt', '4-hour lockout'],
  ['TC-010', '10th invalid attempt', 'Indefinite lockout'],
  ['TC-011', 'Login during lockout', 'Login remains blocked'],
  ['TC-012', 'Session timeout', 'Correct state and message'],
]

const retests = [
  ['RT-001', 'Trigger 4th failed attempt', '60-sec lockout message displayed'],
  ['RT-002', 'Trigger 5th failed attempt', '5-min lockout message displayed'],
  ['RT-003', 'Trigger 6th failed attempt', '10-min lockout message displayed'],
  ['RT-004', 'Trigger 7th failed attempt', '15-min lockout message displayed'],
  ['RT-005', 'Trigger 8th failed attempt', '30-min lockout message displayed'],
  ['RT-006', 'Trigger 9th failed attempt', '4-hour lockout message displayed'],
  ['RT-007', 'Trigger 10th failed attempt', 'Indefinite lockout message displayed'],
]

const regression = [
  ['REG-001', 'Login with valid credentials', 'User logs in successfully'],
  ['REG-002', 'Login with invalid credentials', 'Login is rejected'],
  ['REG-003', 'Multiple invalid attempts', 'Attempts are tracked correctly'],
  ['REG-004', 'Progressive lockout', 'Correct lockout is applied'],
  ['REG-005', 'Login during lockout', 'Login remains blocked'],
  ['REG-006', 'Lockout message', 'Message matches lockout duration'],
  ['REG-007', 'Session timeout', 'Correct authentication state displayed'],
  ['REG-008', 'Account recovery', 'User can recover according to requirements'],
  ['REG-009', 'Existing login workflow', 'Existing functionality remains unaffected'],
]

const lifecycle = [
  'Test',
  'Defect identified',
  'Azure DevOps',
  'Developer investigation',
  'Fixed / implemented',
  'Retest',
  'Regression',
  'Release validation',
]

const validationSteps = [
  { label: 'Verify the fix', detail: 'Confirm the reported defect is resolved.', icon: ClipboardCheck },
  { label: 'Test boundaries', detail: 'Validate each progressive lockout threshold.', icon: Activity },
  { label: 'Validate related states', detail: 'Check session timeout, account state, and login behavior.', icon: LockKeyhole },
  { label: 'Regression test', detail: 'Verify existing authentication workflows remain unaffected.', icon: RefreshCw },
  { label: 'Release validation', detail: 'Confirm critical scenarios pass before release.', icon: ShieldCheck },
]

const regressionScope = [
  'Successful login',
  'Invalid credentials',
  'Login attempt tracking',
  'Progressive lockout',
  'Lockout duration',
  'Lockout messaging',
  'Session timeout',
  'Account recovery',
  'Authentication UI',
  'Existing login workflows',
]

const collaborators = [
  ['QA Analyst', 'Test execution, defect reporting, retesting, regression'],
  ['Developer', 'Investigation and implementation of fixes'],
  ['Scrum Master', 'Sprint coordination and tracking'],
  ['Release Manager / Technical Project Manager', 'Release coordination and project validation'],
]

const qaSkills = [
  'Manual testing',
  'Functional testing',
  'Regression testing',
  'Negative testing',
  'Boundary testing',
  'Security testing',
  'Test case design',
  'Defect management',
  'Retesting',
  'Release validation',
]

const tools = [
  ['Azure DevOps', 'Test case and defect management'],
  ['Swagger', 'API documentation and analysis'],
  ['Postman', 'API testing and validation'],
  ['Cursor AI', 'AI-assisted analysis and productivity'],
]

export default function AuthenticationCaseStudy() {
  return (
    <CaseStudyPage
      kicker="// case study 01 · manual / functional QA"
      title="Authentication & Proactive Lockout Testing"
      system="HR & Payroll system"
      lead="Validating a change from a fixed account lockout to a progressive one: test design, execution, defect reporting, retesting, and regression."
      tags={['Authentication', 'Failed attempts', 'Lockout', 'Test cases', 'Defects', 'Regression']}
      heroImage={{
        src: '/case-study-preview/case-study-one.webp',
        alt: 'Login screen showing an account temporarily locked message',
      }}
      stats={[
        { value: '12', label: 'Test cases' },
        { value: '2', label: 'High-severity defects' },
        { value: '7/7', label: 'Retests passed' },
        { value: '9/9', label: 'Regression checks passed' },
      ]}
      summary={{
        problem:
          'The login lockout changed from a fixed rule to a progressive one, where each failed attempt adds a longer lockout. Every threshold had to behave and read correctly.',
        role: 'QA Analyst: test design, execution, defect reporting, retesting and regression, working with the developer, Scrum Master and release managers.',
        approach: 'Functional, negative, boundary, regression and security testing, focused on each transition point in the lockout ladder.',
        result:
          'Found 2 high-severity messaging defects. After the fixes, all retests and regression checks passed, and the lockout setup was simplified to one mechanism.',
      }}
      chapters={chapters}
      pdf="/documents/case-study-one.pdf"
    >
      <Chapter
        id="context"
        title="The change"
        intro="The HR & Payroll system already locked accounts after repeated invalid logins. The team replaced the fixed lockout with a progressive model, where the lockout gets longer as failed attempts continue."
      >
        <div className="cs-grid-2">
          <Block title="Before: fixed lockout" icon={LockKeyhole}>
            <Steps
              steps={[
                { label: 'Invalid attempts', icon: UserRound },
                { label: 'Repeated failures', icon: CircleSlash },
                { label: 'Fixed threshold', icon: ListChecks },
                { label: 'Account lockout', icon: LockKeyhole },
              ]}
            />
          </Block>
          <Block title="After: progressive lockout" icon={Activity}>
            <ol className="cs-ladder" aria-label="Lockout length by failed attempt">
              {lockoutLadder.map((step) => (
                <li key={step.attempt}>
                  <span className="cs-ladder-attempt">{step.attempt}</span>
                  <span className="cs-ladder-bar" style={{ ['--w' as string]: `${step.width}%` }} aria-hidden="true" />
                  <span className="cs-ladder-value">{step.lockout}</span>
                </li>
              ))}
            </ol>
          </Block>
        </div>
        <Callout title="QA focus">
          Each transition point represented a different authentication state and required independent validation.
        </Callout>
        <Block title="What I did">
          <IconCards items={contributions} />
        </Block>
      </Chapter>

      <Chapter
        id="plan"
        title="Challenge and plan"
        intro="The system had to keep five things consistent at every step of the ladder."
      >
        <Block>
          <Steps
            steps={[
              { label: 'Failed attempt count', icon: UserRound },
              { label: 'Lockout rule', icon: ListChecks },
              { label: 'Actual account state', icon: Shield },
              { label: 'Displayed message', icon: MessagesSquare },
              { label: 'Session state', icon: Clock3 },
            ]}
          />
        </Block>
        <div className="cs-grid-2 cs-grid-wide-right">
          <Block title="Key QA questions">
            <ul className="cs-questions">
              <li>Does the correct attempt count trigger the correct lockout?</li>
              <li>Does the actual lockout duration match the configured behaviour?</li>
              <li>Does the user see the correct lockout message?</li>
              <li>What happens when the session expires?</li>
              <li>Does fixing one lockout scenario affect another?</li>
            </ul>
          </Block>
          <Block
            title="Test strategy"
            note="A combination of test approaches validated authentication and lockout behavior across expected and unexpected conditions."
          >
            <IconCards items={strategy} />
            <ExternalLink href="https://docs.google.com/spreadsheets/d/1vF7GaQ90-BFLyRIpLRBOWx0nLk4LTnho/edit?gid=1187394097#gid=1187394097">
              View the master test plan
            </ExternalLink>
          </Block>
        </div>
      </Chapter>

      <Chapter
        id="execution"
        title="Test execution"
        intro="Twelve scenarios covered every threshold, plus logging in during a lockout and session timeout."
      >
        <Block title="Progressive lockout test scenarios">
          <DataTable
            caption="Progressive lockout test scenarios"
            columns={['ID', 'Scenario', 'Expected result']}
            rows={scenarios.map(([id, scenario, expected]) => [<Id>{id}</Id>, scenario, expected])}
          />
        </Block>
        <Callout title="Boundary testing was prioritized">because each threshold changed the expected behavior.</Callout>
      </Chapter>

      <Chapter id="defects" title="Defects found" intro="Execution surfaced two high-severity issues, both about what the user was told.">
        <div className="cs-grid-2">
          <DefectCard
            defect={{
              id: 'Defect 01',
              title: 'Lockout message did not match the failed attempt count',
              summary:
                'The displayed lockout message did not always correspond to the current invalid-login attempt and expected lockout duration.',
              expected: 'Correct lockout message',
              actual: 'Incorrect message displayed',
              impact: 'Users could receive incorrect information about their account status and recovery time.',
            }}
          />
          <DefectCard
            defect={{
              id: 'Defect 02',
              title: 'Incorrect lockout message after session timeout',
              summary:
                'When the user session timed out, the system could display an incorrect lockout message instead of the appropriate authentication state.',
              expected: 'The correct authentication state is shown',
              actual: 'A lockout message was shown instead',
              impact: 'Users could receive misleading information after session expiration.',
            }}
          />
        </div>
        <BugReport
          id="BUG-001"
          title="Lockout message did not match failed attempt count"
          steps={['Open the login page.', 'Enter invalid credentials.', 'Repeat the failed attempt.', 'Observe the lockout message.']}
          expected="Lockout duration and message should match the current failed-attempt count."
          actual="Incorrect lockout information was displayed."
          acceptance="Lockout behavior and displayed messaging should correspond to the configured threshold."
        />
        <Block title="Defect lifecycle" note="From detection to release validation.">
          <Steps steps={lifecycle.map((label) => ({ label }))} />
          <Callout>
            A defect was not considered complete after the initial fix. The affected scenario was retested, followed by
            regression testing of related functionality.
          </Callout>
        </Block>
      </Chapter>

      <Chapter
        id="verification"
        title="Retest and regression"
        intro="Retests confirmed each fix; regression confirmed nothing else broke."
      >
        <Block title="Validation flow">
          <Steps steps={validationSteps} />
        </Block>
        <div className="cs-grid-2">
          <Block
            title="Sample retest task"
            note="Verify the lockout message defect was fixed and the correct message shows for each progressive level."
          >
            <DataTable
              caption="Retest results"
              columns={['ID', 'Test', 'Expected result', 'Result']}
              rows={retests.map(([id, test, expected]) => [<Id>{id}</Id>, test, expected, <Pass />])}
            />
            <Callout tone="pass" title="Retest result">
              The lockout message matched the failed-attempt count and configured lockout duration after the fix.
            </Callout>
          </Block>
          <Block
            title="Sample regression"
            note="Verify the fix and implementation changes did not affect existing authentication functionality."
          >
            <DataTable
              caption="Regression results"
              columns={['ID', 'Regression test', 'Expected result', 'Result']}
              rows={regression.map(([id, test, expected]) => [<Id>{id}</Id>, test, expected, <Pass />])}
            />
            <Callout tone="pass" title="Regression result">
              The updated lockout and defect fixes introduced no regressions across the tested workflows.
            </Callout>
          </Block>
        </div>
        <Block title="Regression scope" note="Key areas validated after the fixes.">
          <Checklist items={regressionScope} />
        </Block>
      </Chapter>

      <Chapter
        id="outcome"
        title="Outcome"
        intro="The team simplified two lockout configurations into one mechanism while keeping the progressive behavior, and QA revalidated the complete authentication flow."
      >
        <div className="cs-grid-2">
          <Block title="Resolution">
            <div className="cs-before-after">
              <div>
                <small>Before</small>
                <strong>Two lockout configurations</strong>
                <span>More complex</span>
              </div>
              <div className="is-after">
                <small>After</small>
                <strong>One progressive lockout mechanism</strong>
              </div>
            </div>
            <Checklist
              columns={1}
              items={[
                'Simplified configuration',
                'Progressive lockout logic',
                'Correct lockout duration',
                'Correct user message',
                'Expected session behavior',
              ]}
            />
          </Block>
          <Block title="Collaboration">
            <ul className="cs-people">
              {collaborators.map(([role, details]) => (
                <li key={role}>
                  <strong>{role}</strong>
                  <span>{details}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
        <div className="cs-grid-2">
          <Block title="QA skills">
            <Checklist items={qaSkills} />
          </Block>
          <Block title="Tools">
            <ul className="cs-people">
              {tools.map(([name, use]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
        <p className="cs-confidential">
          <Shield aria-hidden="true" />
          This case study is based on professional QA experience and has been anonymized. Company and application
          names, screenshots, credentials, source code, internal data, and implementation details have been left out to
          protect confidential information.
        </p>
      </Chapter>
    </CaseStudyPage>
  )
}
