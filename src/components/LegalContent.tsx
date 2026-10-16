import type { LegalDoc } from '../data/legal'

// The body of a legal page, shared by the tech and creative portfolio shells.
export default function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <article className="legal-doc">
      <p className="legal-kicker">Last updated {doc.updated}</p>
      <h1>{doc.title}</h1>
      <p className="legal-intro">{doc.intro}</p>
      {doc.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.after?.map((text) => <p key={text}>{text}</p>)}
        </section>
      ))}
    </article>
  )
}
