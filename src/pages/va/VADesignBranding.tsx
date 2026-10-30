import { useState, type CSSProperties } from 'react'
import { designBranding as content } from '../../data/va'
import VAEmailShowcase from './VAEmailShowcase'
import VAFoodShowcase from './VAFoodShowcase'
import VALayout, { VACta, VAImg, VATicketHero } from './VALayout'

// Columns that fill every row: 9 samples sit 3 × 3 rather than 4 + 4 + 1.
// Section anchors for the header's jump links ("Brand Kit" -> "brand-kit").
const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const jumpLinks = content.sections.map((section) => ({ label: section.title, id: slug(section.title) }))

const columnsFor = (count: number) => (count <= 4 ? count : count % 4 === 0 ? 4 : count % 3 === 0 ? 3 : 4)

export default function VADesignBranding() {
  const [active, setActive] = useState<string>('All')
  const sections = content.sections.filter((section) => active === 'All' || section.title === active)

  return (
    <VALayout meta={content.meta}>
      <VATicketHero title={content.title} tagline={content.tagline} intro={content.intro} links={jumpLinks} onJump={() => setActive('All')} />

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
            <div className="va-design-section" id={slug(section.title)} key={section.title}>
              <header className="va-design-head">
                <h2>{section.title}</h2>
                <p>{section.detail}</p>
              </header>
              {section.galleries.map((gallery, index) => (
                <div className="va-design-gallery" key={gallery.title || index}>
                  {gallery.title && <h3>{gallery.title}</h3>}
                  {gallery.showcase ? (
                    <VAFoodShowcase items={gallery.items} />
                  ) : gallery.emails ? (
                    <VAEmailShowcase items={gallery.items} />
                  ) : (
                    <div className="va-design-grid" style={{ '--cols': columnsFor(gallery.items.length) } as CSSProperties}>
                      {gallery.items.map((item) => (
                        <VAImg key={item.label} item={item} />
                      ))}
                    </div>
                  )}
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
