import {
  Activity,
  ArrowRight,
  Braces,
  Bug,
  CheckCircle2,
  CircleSlash,
  ClipboardCheck,
  Database,
  Eye,
  FileText,
  GitBranch,
  Layers,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import CaseStudyLayout from './CaseStudyLayout'

const objectives = [
  ['API FUNCTIONALITY', 'Verify GET, POST, PUT, and DELETE operations.', ClipboardCheck],
  ['DATA ACCURACY', 'Validate request payloads and returned product data.', Database],
  ['RESPONSE VALIDATION', 'Verify status codes and response content.', Braces],
  ['UI CONSISTENCY', 'Confirm API changes are reflected in the POS application.', Monitor],
  ['REGRESSION', 'Ensure existing workflows remain unaffected.', RefreshCw],
] as const

const contributions = [
  ['API TESTING', 'Executed GET, POST, PUT, and DELETE requests using Postman.', Braces],
  ['REQUEST VALIDATION', 'Validated request bodies, headers, and payloads.', ClipboardCheck],
  ['RESPONSE VALIDATION', 'Checked status codes, response bodies, and product data.', CheckCircle2],
  ['NEGATIVE TESTING', 'Tested invalid requests and unexpected inputs.', CircleSlash],
  ['API / UI VALIDATION', 'Compared API results with product behavior in the POS UI.', Monitor],
  ['DEFECT MANAGEMENT', 'Logged, retested, and collaborated with developers on defects.', Bug],
  ['REGRESSION TESTING', 'Validated related product workflows after changes and fixes.', RefreshCw],
] as const

const testCases = [
  ['API-001', 'GET', 'Retrieve products', 'Product list returned'],
  ['API-002', 'GET', 'Retrieve product data', 'Correct product details returned'],
  ['API-003', 'POST', 'Add new product', 'Product created successfully'],
  ['API-004', 'PUT', 'Update existing product', 'Product successfully updated'],
  ['API-005', 'DELETE', 'Delete product', 'Product removed successfully'],
  ['API-006', 'POST', 'Invalid product data', 'Request rejected appropriately'],
  ['API-007', 'PUT', 'Invalid update data', 'Request rejected appropriately'],
  ['API-008', 'GET', 'Validate returned data', 'API data matches expected UI data'],
  ['API-009', 'DELETE', 'Delete and verify UI', 'Product no longer appears'],
]

const retestCases = [
  ['RT-API-001', 'Update existing product', 'Existing product updated'],
  ['RT-API-002', 'Retrieve updated product', 'Updated data returned'],
  ['RT-API-003', 'Verify product in UI', 'Updated product displayed'],
  ['RT-API-004', 'Check duplicate record', 'No duplicate created'],
]

const regressionCases = [
  ['REG-API-001', 'Retrieve products', 'Product list loads'],
  ['REG-API-002', 'Add product', 'Product created'],
  ['REG-API-003', 'Update product', 'Existing product updated'],
  ['REG-API-004', 'Delete product', 'Product removed'],
  ['REG-API-005', 'POS UI display', 'API changes reflected in UI'],
  ['REG-API-006', 'Data consistency', 'API and UI remain consistent'],
]

const lifecycle = [
  'TEST',
  'DEFECT IDENTIFIED',
  'AZURE DEVOPS',
  'DEVELOPER INVESTIGATION',
  'FIX IMPLEMENTED',
  'RETEST',
  'REGRESSION',
  'RELEASE VALIDATION',
]

const strategies = [
  ['FUNCTIONAL', 'Validated that each endpoint performed its intended operation.', CheckCircle2],
  ['NEGATIVE', 'Tested invalid inputs and unsuccessful request scenarios.', CircleSlash],
  ['DATA VALIDATION', 'Verified product information against expected values.', Database],
  ['REGRESSION', 'Ensured API changes did not break existing product workflows.', RefreshCw],
  ['API / UI CONSISTENCY', 'Confirmed API results were reflected correctly in the POS UI.', Monitor],
] as const

function DataTable({
  headers,
  rows,
  className = '',
}: {
  headers: string[]
  rows: string[][]
  className?: string
}) {
  return (
    <div className="api-table-scroll">
      <table className={`api-data-table ${className}`}>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ApiTestingCaseStudy() {
  return (
    <CaseStudyLayout
      category="QA CASE STUDY"
      title="API Testing and Validation"
      subtitle="CASHLESS POINT OF SALE SYSTEM"
      lead="An anonymized QA case study demonstrating API testing using Postman."
      heroImage={{
        src: '/case-study-preview/case-study-two.png',
        alt: 'API testing and validation case study preview',
      }}
      tags={['API Testing', 'GET · POST · PUT · DELETE', 'Postman', 'Azure DevOps']}
    >
      <div className="api-case-study-content">
        <section className="section section-muted">
          <div className="container api-overview-grid">
            <article className="api-summary-panel">
              <h2><FileText aria-hidden="true" /> PROJECT OVERVIEW</h2>
              <p>The Cashless POS system manages product information through REST APIs that support core product-management operations.</p>
              <h3>The API layer handles:</h3>
              <ul className="api-method-list">
                <li><strong className="method-get">GET</strong><span>Retrieve product information</span></li>
                <li><strong className="method-post">POST</strong><span>Add new products</span></li>
                <li><strong className="method-put">PUT</strong><span>Update existing products</span></li>
                <li><strong className="method-delete">DELETE</strong><span>Delete products</span></li>
              </ul>
              <p>As a QA Analyst, I used Postman to validate requests and responses, including status codes, headers, authentication, request data, and returned product information. I also compared API results with the POS UI to verify backend operations were reflected correctly.</p>
            </article>

            <article className="api-summary-panel">
              <h2 className="api-accent-heading"><Activity aria-hidden="true" /> QA OBJECTIVE</h2>
              <p>Validate that product-related APIs correctly process requests, return expected responses, and maintain data consistency between the API and application UI.</p>
              <ul className="api-check-list">
                {objectives.map(([title, description, Icon]) => (
                  <li key={title}>
                    <CheckCircle2 aria-hidden="true" />
                    <div><strong>{title}</strong><span>{description}</span></div>
                  </li>
                ))}
              </ul>
            </article>

            <article className="api-summary-panel api-contributions-panel">
              <h2 className="api-accent-heading"><UserRound aria-hidden="true" /> MY QA CONTRIBUTIONS</h2>
              <ul className="api-contribution-list">
                {contributions.map(([title, description, Icon]) => (
                  <li key={title}>
                    <Icon aria-hidden="true" />
                    <div><strong>{title}</strong><span>{description}</span></div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container api-two-column">
            <article className="api-panel api-scope-panel">
              <h2><GitBranch aria-hidden="true" /> API TEST SCOPE</h2>
              <div className="api-method-flow">
                {[
                  ['GET', 'Retrieve products', Search],
                  ['POST', 'Add product', Plus],
                  ['PUT', 'Update product', RefreshCw],
                  ['DELETE', 'Delete product', Trash2],
                ].map(([method, label, Icon]) => {
                  const MethodIcon = Icon as typeof Search
                  return <div className={`api-method-step method-${String(method).toLowerCase()}`} key={String(method)}><strong>{String(method)}</strong><MethodIcon aria-hidden="true" /><span>{String(label)}</span></div>
                })}
              </div>
              <div className="api-process-flow">
                {[
                  ['REQUEST', 'Send API request', Braces],
                  ['API PROCESS', 'Process request', Activity],
                  ['RESPONSE', 'Status code and response body', FileText],
                  ['DATA VALIDATION', 'Validate product data', Database],
                  ['UI VALIDATION', 'Verify in POS UI', Monitor],
                ].map(([title, description, Icon], index) => {
                  const StepIcon = Icon as typeof Braces
                  return <div className="api-process-step" key={String(title)}><span className="api-process-icon"><StepIcon aria-hidden="true" /></span><strong>{String(title)}</strong><small>{String(description)}</small>{index < 4 && <ArrowRight className="api-process-arrow" aria-hidden="true" />}</div>
                })}
              </div>
            </article>

            <article className="api-panel api-strategy-panel">
              <h2 className="api-accent-heading"><ShieldCheck aria-hidden="true" /> TEST STRATEGY</h2>
              <p>A combination of test approaches was used to ensure quality.</p>
              <div className="api-strategy-grid">
                {strategies.map(([title, description, Icon]) => (
                  <div className="api-strategy-card" key={title}>
                    <Icon aria-hidden="true" />
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container api-two-column">
            <article className="api-panel">
              <h2><ClipboardCheck aria-hidden="true" /> SAMPLE API TEST COVERAGE</h2>
              <DataTable
                className="api-coverage-table"
                headers={['ID', 'Method', 'Scenario', 'Expected Result']}
                rows={testCases}
              />
            </article>

            <article className="api-panel">
              <h2 className="api-defect-heading"><Bug aria-hidden="true" /> TOP DEFECTS IDENTIFIED</h2>
              <div className="api-defect-grid">
                <div className="api-defect-card">
                  <span className="api-defect-id">DEFECT 01</span>
                  <h3>Product Not Displayed Correctly</h3>
                  <div className="api-defect-meta"><span>Severity: High</span><span>Priority: High</span></div>
                  <p>After successful product creation, the product did not appear in the POS application.</p>
                  <strong>EXPECTED</strong><p>Product information is correctly displayed in the POS UI.</p>
                  <strong>ACTUAL</strong><p>The product was not shown as expected.</p>
                  <strong>IMPACT</strong><p>Product information could become inconsistent between the API and application UI.</p>
                </div>
                <div className="api-defect-card">
                  <span className="api-defect-id">DEFECT 02</span>
                  <h3>PUT Created a New Product Instead of Updating</h3>
                  <div className="api-defect-meta"><span>Severity: High</span><span>Priority: High</span></div>
                  <p>When updating an existing product using a PUT request, the system created a new product instead of updating the existing one.</p>
                  <strong>EXPECTED</strong><p>The existing product is updated with the submitted values.</p>
                  <strong>ACTUAL</strong><p>A new product was created instead of updating the existing product.</p>
                  <strong>IMPACT</strong><p>Duplicate products and inconsistent product information could result.</p>
                </div>
              </div>
              <div className="api-defect-actions"><strong>QA ACTIONS</strong><span>Reproduce the issue, validate the API response, verify the POS UI, and discuss findings with the team.</span></div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container api-two-column">
            <article className="api-panel">
              <h2><RefreshCw aria-hidden="true" /> DEFECT LIFECYCLE</h2>
              <p>From detection to release validation.</p>
              <div className="api-lifecycle">
                {lifecycle.map((step, index) => (
                  <div className="api-lifecycle-step" key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{step}</strong>
                    {index < lifecycle.length - 1 && <ArrowRight aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div className="api-insight-callout"><ShieldCheck aria-hidden="true" /><span>A defect was not complete after the initial fix. The affected scenario was retested, followed by regression testing of related functionality.</span></div>
            </article>

            <article className="api-panel">
              <h2><FileText aria-hidden="true" /> SAMPLE BUG REPORT <span>(AZURE DEVOPS TICKET)</span></h2>
              <div className="api-bug-report">
                <div className="api-bug-title"><strong>BUG-001</strong><span>PUT request creates a new product instead of updating existing product</span></div>
                <div className="api-bug-meta"><span>Severity: High</span><span>Priority: High</span><span>Environment: UAT</span><span>Initial Test: Failed</span><span>Retest: Passed</span><span>Status: Resolved</span></div>
                <div className="api-bug-grid">
                  <div><strong>REPRODUCTION STEPS</strong><ol><li>Select the PUT endpoint.</li><li>Send a request with a product ID.</li><li>Verify the API response.</li><li>Verify the product in the POS UI.</li></ol></div>
                  <div><strong>EXPECTED RESULTS</strong><p>The existing product is updated with the submitted information.</p><strong>ACTUAL RESULTS</strong><p>A new product is created instead of updating the existing product.</p></div>
                  <div><strong>ACCEPTANCE CRITERIA</strong><p>The PUT request updates the existing product, creates no duplicate, and displays updated information in the POS UI.</p></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container api-two-column">
            <article className="api-panel">
              <h2><CheckCircle2 aria-hidden="true" /> SAMPLE RETEST TASK</h2>
              <p className="api-panel-intro">Verify that the reported product-update defect was resolved.</p>
              <DataTable
                className="api-result-table"
                headers={['ID', 'Retest', 'Expected Result', 'Result']}
                rows={retestCases.map((row) => [...row, '✓ Pass'])}
              />
              <div className="api-result-callout"><strong>RETEST RESULT</strong><span>The PUT request correctly updated the existing product without creating a duplicate record.</span></div>
            </article>

            <article className="api-panel">
              <h2><RefreshCw aria-hidden="true" /> SAMPLE REGRESSION</h2>
              <p className="api-panel-intro">Verify that the API changes did not affect existing functionality.</p>
              <DataTable
                className="api-result-table"
                headers={['ID', 'Regression Test', 'Expected Result', 'Result']}
                rows={regressionCases.map((row) => [...row, '✓ Pass'])}
              />
              <div className="api-result-callout"><strong>REGRESSION RESULT</strong><span>The updated product APIs continued to support expected operations without breaking related workflows.</span></div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="container api-demonstrates-panel">
            <h2>WHAT THIS CASE STUDY DEMONSTRATES</h2>
            <div className="api-demonstrates-grid">
              {[
                ['REST API TESTING', 'Validated product APIs using Postman.', Braces],
                ['HTTP METHODS', 'GET · POST · PUT · DELETE', GitBranch],
                ['VALIDATION', 'Request, response, status codes, and data.', CheckCircle2],
                ['NEGATIVE TESTING', 'Invalid inputs and error handling.', CircleSlash],
                ['API / UI CONSISTENCY', 'Verified API results in the POS UI.', Monitor],
                ['DEFECT LIFECYCLE', 'Found defects, worked with Dev, retested.', Bug],
                ['REGRESSION', 'Ensured no impact to existing workflows.', RefreshCw],
              ].map(([title, description, Icon]) => {
                const DemonstrationIcon = Icon as typeof Braces
                return <div className="api-demonstrates-card" key={String(title)}><DemonstrationIcon aria-hidden="true" /><strong>{String(title)}</strong><span>{String(description)}</span></div>
              })}
            </div>
            <div className="api-key-insight">
              <div><Activity aria-hidden="true" /><strong>KEY QA INSIGHT</strong><p>A successful API response does not always mean the business operation succeeded. Validate the actual outcome and data consistency in the application.</p></div>
              <a href="/documents/case-study-one.pdf" target="_blank" rel="noreferrer"><FileText aria-hidden="true" /><span><strong>QA ARTIFACT</strong><small>View Full Case Study in PDF</small></span><ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </div>
    </CaseStudyLayout>
  )
}