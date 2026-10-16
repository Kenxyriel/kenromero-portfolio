import { podcastEditing as content } from '../../data/va'
import VALayout, { ToolBadge, VACta, VAImg, VAPageHero, VASectionTitle } from './VALayout'

export default function VAPodcastEditing() {
  return (
    <VALayout meta={content.meta}>
      <VAPageHero title={content.title} subtitle={content.subtitle} intro={content.intro} />

      <section className="va-section va-section-tight">
        <div className="container va-tools-row">
          <p className="va-kicker">Tools:</p>
          <ul className="va-tool-row">
            {content.tools.map((tool, index) => (
              <ToolBadge key={tool} name={tool} index={index} />
            ))}
          </ul>
        </div>
      </section>

      <section className="va-section">
        <div className="va-band">
          <h2>{content.editing.title}</h2>
          <p>Podcast Editing &amp; Content Management</p>
        </div>
        <div className="container">
          <p className="va-kicker">Long-form episodes &amp; video</p>
          <div className="va-gallery va-gallery-wide">
            {content.editing.items
              .filter((item) => !item.tall)
              .map((item) => (
                <VAImg key={item.label} item={item} caption />
              ))}
          </div>
          <p className="va-kicker">Short-form clips</p>
          <div className="va-gallery va-gallery-tall">
            {content.editing.items
              .filter((item) => item.tall)
              .map((item) => (
                <VAImg key={item.label} item={item} caption />
              ))}
          </div>
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle eyebrow="Content management" title={content.management.title} description={content.management.description} />
          <div className="va-stack">
            {content.management.items.map((item) => (
              <div key={item.label}>
                <p className="va-kicker">{item.label}</p>
                <VAImg item={item} className="va-img-wide" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <VACta cta={content.cta} />
    </VALayout>
  )
}
