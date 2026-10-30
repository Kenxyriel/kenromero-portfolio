import { imageProps } from '../../components/responsiveImage'
import { samplePosts, socialMedia as content } from '../../data/va'
import CaptionBank from './CaptionBank'
import JJJCalendar from './JJJCalendar'
import VALayout, { VACta, VATicketHero, VASectionTitle } from './VALayout'

export default function VASocialMedia() {
  const { research, publishing } = content

  return (
    <VALayout meta={content.meta}>
      <VATicketHero title={content.title} tagline={content.tagline} intro={content.intro} links={content.jump} />

      {/* PLANNING: how I organize content, shown on the real JJJ calendar from Notion */}
      <JJJCalendar />

      {/* RESEARCH + HOOKS */}
      <section className="va-section va-section-cream" id="research">
        <div className="container">
          <VASectionTitle eyebrow={research.subtitle} title={research.title} description={research.description} />
          <p className="va-kicker">{research.hooksTitle}</p>
          <div className="va-hooks">
            {research.hooks.map((hook) => (
              <article className="va-hook" key={hook.hook}>
                <h3>{hook.hook}</h3>
                <p>{hook.body}</p>
                <small>{hook.tags}</small>
              </article>
            ))}
          </div>
          <p className="va-note">{research.hooksNote}</p>
          <div className="va-hashtags">
            <p className="va-kicker">{research.hashtagTitle}</p>
            <p>{research.hashtags}</p>
            <strong>{research.platformReady}</strong>
          </div>
        </div>
      </section>

      {/* PUBLISHING */}
      <section className="va-section" id="publishing">
        <div className="container">
          <VASectionTitle title={publishing.title} description={publishing.description} />
          <div className="va-platforms">
            {publishing.platforms.map((platform) => (
              <article key={platform.name}>
                <h3>{platform.name}</h3>
                <strong>{platform.role}</strong>
                <p>{platform.detail}</p>
              </article>
            ))}
          </div>
          <CaptionBank />
          <p className="va-kicker va-centered">Posting tools: {publishing.postingTools.join(' · ')}</p>
        </div>
      </section>

      {/* CAPTION SAMPLES */}
      <section className="va-section va-section-dark" id="caption-ideas">
        <div className="container">
          <VASectionTitle title={content.captionsTitle} />
          <div className="va-posts">
            {samplePosts.map((post) =>
              post.image ? (
                // The screenshot already shows the account and caption.
                <figure className="va-post-shot" key={post.account}>
                  <img {...imageProps(post.image, '(max-width: 760px) 45vw, 260px')} alt={`${post.account} post: ${post.caption}`} loading="lazy" />
                </figure>
              ) : (
                <article className="va-post" key={post.account}>
                  <header>
                    <span className="va-post-avatar" aria-hidden="true">
                      {post.account[0]}
                    </span>
                    <div>
                      <strong>{post.account}</strong>
                      <small>1hr</small>
                    </div>
                  </header>
                  <p>{post.caption}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <VACta cta={content.cta} />
    </VALayout>
  )
}
