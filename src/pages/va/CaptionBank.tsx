import { socialMedia } from '../../data/va'

const bank = socialMedia.publishing.captionBank

export default function CaptionBank() {
  return (
    <article className="pod-board cap-bank">
      <header className="pod-board-head">
        <p className="va-kicker">Google Sheets · Captions bank</p>
        <h3>{bank.title}</h3>
      </header>
      <p className="pod-rule">{bank.note}</p>
      <div className="cap-grid">
        {bank.episodes.map((episode) => (
          <section className="cap-ep" key={episode.ep}>
            <p className="cap-ep-head">
              <strong>{episode.ep}</strong> {episode.topic}
            </p>
            <h4>Reels &amp; Shorts hooks</h4>
            <ol className="cap-hooks">
              {episode.hooks.map((hook) => (
                <li key={hook}>{hook}</li>
              ))}
            </ol>
            <dl className="cap-copy">
              <div>
                <dt>X / Twitter</dt>
                <dd>{episode.x}</dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>{episode.linkedin}</dd>
              </div>
              <div>
                <dt>TikTok</dt>
                <dd>{episode.tiktok}</dd>
              </div>
            </dl>
            <p className="cap-tags">{episode.tags}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
