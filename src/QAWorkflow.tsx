import {
  type LucideIcon,
  ShieldCheck,
} from 'lucide-react'

export type QAValidationStep = {
  title: string
  description: string
  icon: LucideIcon
}

export type QAWorkflowProps = {
  title: string
  steps?: readonly string[]
  validationSteps?: readonly QAValidationStep[]
}

export default function QAWorkflow({ title, steps = [], validationSteps }: QAWorkflowProps) {
  return (
    <section className={`section ${validationSteps ? 'qa-validation-section' : ''}`}>
      <div className="container">
        {validationSteps ? (
          <>
            <div className="qa-validation-heading">
              <h2>{title}</h2>
            </div>
            <div className="qa-validation-flow">
              {validationSteps.map(({ title: stepTitle, description, icon: Icon }) => (
                <article className="qa-validation-step" key={stepTitle}>
                  <div className="qa-validation-art">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{stepTitle}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="qa-validation-callout">
              <ShieldCheck aria-hidden="true" />
              <p>
                <strong>Retest</strong> confirms the defect was fixed.{' '}
                <strong>Regression</strong> confirms the fix did not break related functionality.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="section-heading compact">
              <p className="eyebrow">QA WORKFLOW</p>
              <h2>{title}</h2>
            </div>
            <div className="case-workflow">
              {steps.map((step, index) => (
                <div className="case-workflow-step" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
