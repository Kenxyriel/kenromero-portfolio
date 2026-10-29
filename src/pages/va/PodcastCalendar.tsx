import { podcastCalendar as cal, type PodPlatform, type PodStatus } from '../../data/va'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const PLATFORM: Record<PodPlatform, { short: string; name: string }> = {
  youtube: { short: 'YT', name: 'YouTube' },
  shorts: { short: 'YT', name: 'YouTube Shorts' },
  instagram: { short: 'IG', name: 'Instagram' },
  facebook: { short: 'FB', name: 'Facebook' },
}

// Dates stay in UTC so the grid never shifts a day in the visitor's timezone.
function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function dayLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`
}

const statusClass = (status: PodStatus) => `pod-status is-${status.toLowerCase().replace(' ', '-')}`

function Status({ value }: { value: PodStatus }) {
  return <span className={statusClass(value)}>{value}</span>
}

export default function PodcastCalendar() {
  return (
    <div className="pod-cal">
      <ul className="jjj-stats">
        {cal.stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <ProductionTracker />
      <PostingWeek />
      <OpusCalendar />
      <EpisodePack />
    </div>
  )
}

function ProductionTracker() {
  return (
    <article className="pod-board">
      <header className="pod-board-head">
        <p className="va-kicker">Google Sheets · Production calendar</p>
        <h3>Every episode, from raw recording to posted</h3>
      </header>

      <ol className="pod-pipeline" aria-label="Production steps">
        {cal.pipeline.map((item) => (
          <li key={item.step}>
            <strong>{item.step}</strong>
            <span>{item.count}</span>
          </li>
        ))}
      </ol>

      <div className="pod-table-wrap">
        <table className="pod-table">
          <caption className="sr-only">A sample of the production tracker</caption>
          <thead>
            <tr>
              <th scope="col">Ep.</th>
              <th scope="col">Episode</th>
              <th scope="col">Edit</th>
              <th scope="col">Clips</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {cal.tracker.map((row) => (
              <tr key={row.topic}>
                <td className="pod-ep">{row.ep}</td>
                <th scope="row">{row.topic}</th>
                <td data-label="Edit"><Status value={row.edit} /></td>
                <td data-label="Clips"><Status value={row.clips} /></td>
                <td data-label="Thumbnail"><Status value={row.thumb} /></td>
                <td data-label="Status"><Status value={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="pod-note">7 of 45 rows shown. Guest names and links are left out.</p>
    </article>
  )
}

function PostingWeek() {
  const { week } = cal
  return (
    <article className="pod-board">
      <header className="pod-board-head">
        <p className="va-kicker">Google Sheets · Posting calendar</p>
        <h3>{week.label}</h3>
      </header>
      <p className="pod-rule">{week.rule}</p>
      <ol className="pod-week">
        {week.days.map((day) => (
          <li key={day.date}>
            <p className="pod-week-day">
              <strong>{day.day}</strong> {day.date}
            </p>
            {day.posts.map((post) => (
              <div key={post.hook + post.ep} className={`pod-post pod-post-${post.type.toLowerCase()}`}>
                <p className="pod-post-meta">
                  <span>{post.type === 'Episode' ? 'Full episode' : 'Clip'}</span> · Ep {post.ep} · {post.time}
                </p>
                <p className="pod-post-hook">{post.hook}</p>
                <p className="pod-post-foot">
                  <span className="pod-role">{post.role}</span>
                  <span className="pod-status is-posted">Posted</span>
                </p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </article>
  )
}

function OpusCalendar() {
  const { opus } = cal
  const weeks = [0, 7, 14].map((offset) => addDays(opus.start, offset))
  const total = Object.values(opus.days).reduce((sum, day) => sum + day.posts.length + (day.more ?? 0), 0)
  return (
    <article className="pod-opus">
      <header className="pod-opus-head">
        <div>
          <p className="pod-opus-kicker">OpusClip · Scheduler</p>
          <h3>{opus.label}</h3>
        </div>
        <p className="pod-opus-count">
          <strong>{total}</strong> reels scheduled and posted
        </p>
      </header>
      <div className="pod-opus-grid" role="table" aria-label="Reels scheduled in OpusClip">
        <div className="pod-opus-row pod-opus-row-head" role="row">
          {WEEKDAYS.map((day) => (
            <span key={day} role="columnheader">
              {day}
            </span>
          ))}
        </div>
        {weeks.map((sunday) => (
          <div className="pod-opus-row" role="row" key={sunday}>
            {WEEKDAYS.map((weekday, i) => {
              const date = addDays(sunday, i)
              const day = opus.days[date]
              return (
                <div key={date} role="cell" className={day ? 'pod-opus-cell' : 'pod-opus-cell is-empty'}>
                  <span className="pod-opus-date">
                    <span className="pod-opus-dow">{weekday}, </span>
                    {dayLabel(date)}
                  </span>
                  {day?.posts.map((post) => (
                    <div className="pod-opus-post" key={post.hook}>
                      <p className="pod-opus-line">
                        <span className={`pod-opus-icon is-${post.platform}`} title={PLATFORM[post.platform].name}>
                          {PLATFORM[post.platform].short}
                        </span>
                        <span className="pod-opus-time">{post.time}</span>
                        <span className="pod-opus-posted">Posted</span>
                      </p>
                      <p className="pod-opus-hook">{post.hook}</p>
                    </div>
                  ))}
                  {day?.more ? <span className="pod-opus-more">+{day.more} more</span> : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </article>
  )
}

function EpisodePack() {
  const { pack } = cal
  return (
    <article className="pod-board">
      <header className="pod-board-head">
        <p className="va-kicker">Episode details · Caption bank</p>
        <h3>What one episode turns into</h3>
      </header>
      <ul className="pod-deliverables" aria-label="Made for every episode">
        {pack.deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="pod-pack">
        <section>
          <h4>{pack.label}: what you’ll hear</h4>
          <ul className="pod-checks">
            {pack.hear.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <h4>Clip hooks</h4>
          <ol className="pod-hooks">
            {pack.hooks.map((hook) => (
              <li key={hook}>{hook}</li>
            ))}
          </ol>
        </section>
        <section>
          <h4>Reel caption · Clip 2</h4>
          <blockquote className="pod-caption">
            {pack.caption.map((line, i) => (i === 0 ? <strong key={line}>{line}</strong> : <p key={line}>{line}</p>))}
          </blockquote>
          <h4>SEO tags</h4>
          <ul className="pod-tags">
            {pack.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
