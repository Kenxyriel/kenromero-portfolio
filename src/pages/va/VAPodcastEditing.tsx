import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { podcastEditing as content } from '../../data/va'
import VALayout, { ToolBadge, VACta, VAImg, VAPageHero, VASectionTitle } from './VALayout'

export default function VAPodcastEditing() {
  return (
    <VALayout meta={content.meta}>
      <VAPageHero title={content.title} subtitle={content.subtitle} intro={content.intro} />

      {/* The work comes first: the first episode sits right under the page title. */}
      <section className="va-section va-section-first" aria-labelledby="va-podcast-work">
        <div className="container">
          <h2 id="va-podcast-work" className="sr-only">
            {content.editing.title}
          </h2>
          <ClientNotice />
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
          <div className="va-plan">
            <h3>{content.management.plan.title}</h3>
            <dl className="va-plan-stats">
              {content.management.plan.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ol className="va-plan-rhythm" aria-label="Weekly posting rhythm">
              {content.management.plan.rhythm.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="va-plan-platforms">{content.management.plan.platforms}</p>
          </div>
          <div className="va-sheet-grid">
            {content.management.items.map((item) => (
              <div className="va-sheet" key={item.label}>
                <VAImg item={item} />
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="va-section va-section-tight">
        <div className="container va-podcast-tools">
          <p className="va-kicker">Tools I use</p>
          <ul className="va-tool-row">
            {content.tools.map((tool, index) => (
              <ToolBadge key={tool} name={tool} index={index} />
            ))}
          </ul>
        </div>
      </section>

      <VACta cta={content.cta} />
    </VALayout>
  )
}

// Note that the samples are client property. It slides in the first time it
// scrolls into view; visitors who prefer reduced motion just see it in place.
function ClientNotice() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const { tag, title, body } = content.editing.notice
  return (
    <div ref={ref} className={`va-client-notice${visible ? ' is-visible' : ''}`} role="note">
      <span className="va-client-notice-icon" aria-hidden="true">
        <ShieldCheck size={22} />
      </span>
      <div>
        <p className="va-client-notice-tag">{tag}</p>
        <p className="va-client-notice-title">{title}</p>
        <p className="va-client-notice-body">{body}</p>
      </div>
    </div>
  )
}
