import { designBranding as content } from '../../data/va'
import VALayout, { VACta, VAImg, VAPageHero } from './VALayout'

export default function VADesignBranding() {
  return (
    <VALayout meta={content.meta}>
      <VAPageHero title={content.title} tagline={content.tagline} intro={content.intro} />

      <section className="va-section">
        <div className="container">
          <p className="va-script va-centered">my creations</p>
          {content.sections.map((section) => (
            <div className="va-work-section" key={section.title}>
              <div className="va-work-head">
                <h2>{section.title}</h2>
                <span>{section.detail}</span>
              </div>
              {section.galleries.map((gallery, index) => (
                <div className="va-work-gallery" key={gallery.title || index}>
                  {gallery.title && <h3>{gallery.title}</h3>}
                  <div className="va-gallery">
                    {gallery.items.map((item) => (
                      <VAImg key={item.label} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <VACta cta={content.cta} />
    </VALayout>
  )
}
