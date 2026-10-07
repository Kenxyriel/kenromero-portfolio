type TestCaseSectionProps = {
  title: string
  description: string
  scenario: string
  expectedResult: string
  actualResult: string
  status: string
  muted?: boolean
}

export default function TestCaseSection({
  title,
  description,
  scenario,
  expectedResult,
  actualResult,
  status,
  muted = false,
}: TestCaseSectionProps) {
  return (
    <section className={`section${muted ? ' section-muted' : ''}`}>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">TEST CASES &amp; EXECUTION</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="safe-table">
          <div className="safe-table-row safe-table-head">
            <span>Test Case</span>
            <span>Scenario</span>
            <span>Expected Result</span>
            <span>Actual Result</span>
            <span>Status</span>
          </div>
          <div className="safe-table-row">
            <span>Placeholder</span>
            <span>{scenario}</span>
            <span>{expectedResult}</span>
            <span>{actualResult}</span>
            <span>{status}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
