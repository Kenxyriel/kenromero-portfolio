import { useState, type CSSProperties } from 'react'
import { designBranding as content } from '../../data/va'
import VALayout, { VACta, VAImg, VAPageHero } from './VALayout'

export default function VADesignBranding() {
  const [active, setActive] = useState<string>('All')
  const sections = content.sections.filter((section) => active === 'All' || section.title === active)

  return (
    <VALayout meta={content.meta}>
      <VAPageHero title={content.title} tagline={content.tagline} intro={content.intro} />

      <section className="va-section va-design">
        <div className="container va-design-inner">
          <div className="va-filter" role="group" aria-label="Filter work">
            {['All', ...content.sections.map((section) => section.title)].map((title) => (
              <button
                key={title}
                type="button"
                className={active === title ? 'is-active' : ''}
                aria-pressed={active === title}
                onClick={() => setActive(title)}
              >
                {title}
              </button>
            ))}
          </div>

          {sections.map((section) => (
            <div className="va-design-section" key={section.title}>
              <header className="va-design-head">
                <h2>{section.title}</h2>
                <p>{section.detail}</p>
              </header>
              {section.galleries.map((gallery, index) => (
                <div className="va-design-gallery" key={gallery.title || index}>
                  {gallery.title && <h3>{gallery.title}</h3>}
                  <div className="va-design-grid" style={{ '--cols': Math.min(gallery.items.length, 4) } as CSSProperties}>
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
