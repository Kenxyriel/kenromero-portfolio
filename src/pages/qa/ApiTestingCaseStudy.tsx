import {
  Activity,
  Braces,
  Bug,
  CheckCircle2,
  CircleSlash,
  ClipboardCheck,
  Database,
  FileText,
  GitBranch,
  Monitor,
  RefreshCw,
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
  IconCards,
  Id,
  Method,
  Pass,
  Steps,
} from './case-study/blocks'

const chapters = [
  { id: 'context', label: 'The system' },
  { id: 'plan', label: 'Scope and strategy' },
  { id: 'execution', label: 'Test coverage' },
  { id: 'defects', label: 'Defects found' },
  { id: 'verification', label: 'Retest and regression' },
  { id: 'outcome', label: 'Outcome' },
]

const methods = [
  ['GET', 'Retrieve product information'],
  ['POST', 'Add new products'],
  ['PUT', 'Update existing products'],
  ['DELETE', 'Delete products'],
]

const objectives = [
  'API functionality: GET, POST, PUT, and DELETE operations',
  'Data accuracy: request payloads and returned product data',
  'Response validation: status codes and response content',
  'UI consistency: API changes reflected in the POS application',
  'Regression: existing workflows remain unaffected',
]

const contributions = [
  { title: 'API testing', text: 'Executed GET, POST, PUT, and DELETE requests using Postman.', icon: Braces },
  { title: 'Request validation', text: 'Validated request bodies, headers, and payloads.', icon: ClipboardCheck },
  { title: 'Response validation', text: 'Checked status codes, response bodies, and product data.', icon: CheckCircle2 },
  { title: 'Negative testing', text: 'Tested invalid requests and unexpected inputs.', icon: CircleSlash },
  { title: 'API / UI validation', text: 'Compared API results with product behavior in the POS UI.', icon: Monitor },
  { title: 'Defect management', text: 'Logged, retested, and collaborated with developers on defects.', icon: Bug },
  { title: 'Regression testing', text: 'Validated related product workflows after changes and fixes.', icon: RefreshCw },
]

const strategy = [
  { title: 'Functional', text: 'Validated that each endpoint performed its intended operation.', icon: CheckCircle2 },
  { title: 'Negative', text: 'Tested invalid inputs and unsuccessful request scenarios.', icon: CircleSlash },
  { title: 'Data validation', text: 'Verified product information against expected values.', icon: Database },
  { title: 'Regression', text: 'Ensured API changes did not break existing product workflows.', icon: RefreshCw },
  { title: 'API / UI consistency', text: 'Confirmed API results were reflected correctly in the POS UI.', icon: Monitor },
]

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

const retests = [
  ['RT-API-001', 'Update existing product', 'Existing product updated'],
  ['RT-API-002', 'Retrieve updated product', 'Updated data returned'],
  ['RT-API-003', 'Verify product in UI', 'Updated product displayed'],
  ['RT-API-004', 'Check duplicate record', 'No duplicate created'],
]

const regression = [
  ['REG-API-001', 'Retrieve products', 'Product list loads'],
  ['REG-API-002', 'Add product', 'Product created'],
  ['REG-API-003', 'Update product', 'Existing product updated'],
  ['REG-API-004', 'Delete product', 'Product removed'],
  ['REG-API-005', 'POS UI display', 'API changes reflected in UI'],
  ['REG-API-006', 'Data consistency', 'API and UI remain consistent'],
]

const lifecycle = [
  'Test',
  'Defect identified',
  'Azure DevOps',
  'Developer investigation',
  'Fix implemented',
  'Retest',
  'Regression',
  'Release validation',
]

const demonstrates = [
  { title: 'REST API testing', text: 'Validated product APIs using Postman.', icon: Braces },
  { title: 'HTTP methods', text: 'GET · POST · PUT · DELETE', icon: GitBranch },
  { title: 'Validation', text: 'Request, response, status codes, and data.', icon: CheckCircle2 },
  { title: 'Negative testing', text: 'Invalid inputs and error handling.', icon: CircleSlash },
  { title: 'API / UI consistency', text: 'Verified API results in the POS UI.', icon: Monitor },
  { title: 'Defect lifecycle', text: 'Found defects, worked with Dev, retested.', icon: Bug },
  { title: 'Regression', text: 'Ensured no impact to existing workflows.', icon: RefreshCw },
]

export default function ApiTestingCaseStudy() {
  return (
    <CaseStudyPage
      kicker="// case study 02 · API testing"
      title="API Testing and Validation"
      system="Cashless point of sale system"
      lead="An anonymized case study of testing product APIs in Postman and checking that every change showed up correctly in the POS app."
      tags={['API testing', 'GET · POST · PUT · DELETE', 'Postman', 'Azure DevOps']}
      heroImage={{
        src: '/case-study-preview/case-study-two.webp',
        alt: 'Diagram of a POS terminal and laptop calling an authentication API',
      }}
      stats={[
        { value: '9', label: 'API test cases' },
        { value: '2', label: 'High-severity defects' },
        { value: '4/4', label: 'Retests passed' },
        { value: '6/6', label: 'Regression checks passed' },
      ]}
      summary={{
        problem:
          'A cashless POS system manages its products through REST APIs. Each API call had to do the right thing and the POS screen had to show the same data.',
        role: 'QA Analyst: tested requests and responses in Postman, compared results with the POS UI, and logged, retested, and regression tested defects.',
        approach: 'Functional, negative, data validation, regression, and API/UI consistency testing across GET, POST, PUT, and DELETE.',
        result:
          'Found 2 high-severity defects, including a PUT request that created duplicate products. After the fixes, all retests and regression checks passed.',
      }}
      chapters={chapters}
      pdf="/documents/case-study-two.pdf"
    >
      <Chapter
        id="context"
        title="The system"
        intro="The Cashless POS system manages product information through REST APIs that support core product-management operations."
      >
        <div className="cs-grid-2">
          <Block title="The API layer handles" icon={GitBranch}>
            <ul className="cs-methods">
              {methods.map(([method, text]) => (
                <li key={method}>
                  <Method name={method} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block
            title="QA objective"
            icon={Activity}
            note="Validate that product APIs process requests correctly, return the expected responses, and keep data consistent between the API and the app."
          >
            <Checklist columns={1} items={objectives} />
          </Block>
        </div>
      </Chapter>

      <Chapter
        id="plan"
        title="Scope and strategy"
        intro="I used Postman to validate requests and responses, including status codes, headers, authentication, request data, and returned product information, then checked the result in the POS UI."
      >
        <Block title="From request to screen">
          <Steps
            steps={[
              { label: 'Request', detail: 'Send API request', icon: Braces },
              { label: 'API process', detail: 'Process request', icon: Activity },
              { label: 'Response', detail: 'Status code and response body', icon: FileText },
              { label: 'Data validation', detail: 'Validate product data', icon: Database },
              { label: 'UI validation', detail: 'Verify in POS UI', icon: Monitor },
            ]}
          />
        </Block>
        <Block title="What I did">
          <IconCards items={contributions} />
        </Block>
        <Block title="Test strategy" note="A combination of test approaches was used to ensure quality.">
          <IconCards items={strategy} />
        </Block>
      </Chapter>

      <Chapter
        id="execution"
        title="Test coverage"
        intro="Nine cases covered every method, including invalid data and checking the result in the UI."
      >
        <Block title="Sample API test coverage">
          <DataTable
            caption="API test coverage"
            columns={['ID', 'Method', 'Scenario', 'Expected result']}
            rows={testCases.map(([id, method, scenario, expected]) => [<Id>{id}</Id>, <Method name={method} />, scenario, expected])}
          />
        </Block>
      </Chapter>

      <Chapter
        id="defects"
        title="Defects found"
        intro="Both defects passed at the API level but broke the business result, which is why I always checked the UI too."
      >
        <div className="cs-grid-2">
          <DefectCard
            defect={{
              id: 'Defect 01',
              title: 'Product not displayed correctly',
              summary: 'After successful product creation, the product did not appear in the POS application.',
              expected: 'Product information is correctly displayed in the POS UI.',
              actual: 'The product was not shown as expected.',
              impact: 'Product information could become inconsistent between the API and application UI.',
            }}
          />
          <DefectCard
            defect={{
              id: 'Defect 02',
              title: 'PUT created a new product instead of updating',
              summary:
                'When updating an existing product using a PUT request, the system created a new product instead of updating the existing one.',
              expected: 'The existing product is updated with the submitted values.',
              actual: 'A new product was created instead of updating the existing product.',
              impact: 'Duplicate products and inconsistent product information could result.',
            }}
          />
        </div>
        <Callout title="QA actions">
          Reproduce the issue, validate the API response, verify the POS UI, and discuss findings with the team.
        </Callout>
        <BugReport
          id="BUG-001"
          title="PUT request creates a new product instead of updating the existing product"
          steps={['Select the PUT endpoint.', 'Send a request with a product ID.', 'Verify the API response.', 'Verify the product in the POS UI.']}
          expected="The existing product is updated with the submitted information."
          actual="A new product is created instead of updating the existing product."
          acceptance="The PUT request updates the existing product, creates no duplicate, and displays updated information in the POS UI."
        />
        <Block title="Defect lifecycle" note="From detection to release validation.">
          <Steps steps={lifecycle.map((label) => ({ label }))} />
          <Callout>
            A defect was not complete after the initial fix. The affected scenario was retested, followed by regression
            testing of related functionality.
          </Callout>
        </Block>
      </Chapter>

      <Chapter
        id="verification"
        title="Retest and regression"
        intro="Retests confirmed the PUT fix; regression confirmed the rest of the product workflow still worked."
      >
        <div className="cs-grid-2">
          <Block title="Sample retest task" note="Verify the reported product-update defect was resolved.">
            <DataTable
              caption="Retest results"
              columns={['ID', 'Retest', 'Expected result', 'Result']}
              rows={retests.map(([id, test, expected]) => [<Id>{id}</Id>, test, expected, <Pass />])}
            />
            <Callout tone="pass" title="Retest result">
              The PUT request correctly updated the existing product without creating a duplicate record.
            </Callout>
          </Block>
          <Block title="Sample regression" note="Verify the API changes did not affect existing functionality.">
            <DataTable
              caption="Regression results"
              columns={['ID', 'Regression test', 'Expected result', 'Result']}
              rows={regression.map(([id, test, expected]) => [<Id>{id}</Id>, test, expected, <Pass />])}
            />
            <Callout tone="pass" title="Regression result">
              The updated product APIs kept supporting expected operations without breaking related workflows.
            </Callout>
          </Block>
        </div>
      </Chapter>

      <Chapter id="outcome" title="Outcome">
        <Callout title="Key QA insight">
          A successful API response does not always mean the business operation succeeded. Validate the actual outcome
          and data consistency in the application.
        </Callout>
        <Block title="What this case study demonstrates">
          <IconCards items={demonstrates} />
        </Block>
      </Chapter>
    </CaseStudyPage>
  )
}
