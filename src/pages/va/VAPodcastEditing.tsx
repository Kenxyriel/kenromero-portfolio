import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { podcastEditing as content } from '../../data/va'
import { profile } from '../../data/profile'
import PodcastCalendar from './PodcastCalendar'
import VALayout, { VACta, VAImg, VAPageHero, VASectionTitle } from './VALayout'

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
          <p className="va-kicker">Thumbnails</p>
          <div className="va-gallery va-gallery-thumbs">
            {content.editing.thumbnails.map((item) => (
              <VAImg key={item.label} item={item} caption />
            ))}
          </div>
          <p className="va-show-link">
            The first three thumbnails and the content calendar below are for {content.editing.show.name}.{' '}
            <a href={content.editing.show.href} target="_blank" rel="noreferrer">
              {content.editing.show.label} ↗
            </a>
          </p>
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle eyebrow="Content management" title={content.management.title} description={content.management.description} />
          <PodcastCalendar />
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
  const { tag, title, body, takedown, takedownLink } = content.editing.notice
  return (
    <div ref={ref} className={`va-client-notice${visible ? ' is-visible' : ''}`} role="note">
      <span className="va-client-notice-icon" aria-hidden="true">
        <ShieldCheck size={22} />
      </span>
      <div>
        <p className="va-client-notice-tag">{tag}</p>
        <p className="va-client-notice-title">{title}</p>
        <p className="va-client-notice-body">{body}</p>
        <p className="va-client-notice-body va-client-notice-takedown">
          {takedown}{' '}
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio removal request')}`}>{takedownLink}</a>.
        </p>
      </div>
    </div>
  )
}
