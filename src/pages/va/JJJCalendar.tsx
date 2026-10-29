import { jjjCalendar as cal, socialMedia, type JJJPost } from '../../data/va'
import { VASectionTitle } from './VALayout'

const planning = socialMedia.planning
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Dates stay in UTC so the grid never shifts a day in the visitor's timezone.
function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function dayLabel(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`)
  return { month: MONTHS[d.getUTCMonth()], day: d.getUTCDate() }
}

const statusClass = (status: JJJPost['status']) => `is-${status.toLowerCase().replace(' ', '-')}`

export default function JJJCalendar() {
  const byDate = new Map(cal.posts.map((post) => [post.date, post]))
  const reels = cal.posts.filter((post) => post.format === 'Reel').length
  const stats = [
    { value: cal.posts.length, label: 'Posts planned' },
    { value: cal.pillars.length, label: 'Content pillars' },
    { value: cal.platforms.length, label: 'Platforms' },
    { value: `${cal.posts.length - reels} / ${reels}`, label: 'Static / Reels' },
  ]

  return (
    <section className="va-section" aria-labelledby="jjj-calendar-title">
      <div className="container">
        <VASectionTitle eyebrow={planning.title} title={planning.subtitle} description={planning.description} />

        <div className="jjj-organize">
          <p className="va-kicker">{planning.organizeTitle}</p>
          <ul className="va-chip-grid">
            {planning.organize.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <ul className="jjj-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="jjj-board">
          <header className="jjj-board-head">
            <div>
              <p className="va-kicker">{cal.eyebrow} · Notion</p>
              <h3 id="jjj-calendar-title">{cal.title}</h3>
            </div>
            <p className="jjj-platforms">{cal.platforms.join(' · ')}</p>
          </header>

          <p className="jjj-intro">{cal.description}</p>

          <ul className="jjj-legend" aria-label="Content pillars">
            {cal.pillars.map((pillar) => (
              <li key={pillar.id} className={`jjj-pillar-${pillar.id}`}>
                {pillar.name}
              </li>
            ))}
          </ul>

          <div className="jjj-grid" role="table" aria-label="JJJ October 2026 posting calendar">
            <div className="jjj-row jjj-row-head" role="row">
              {DAYS.map((day) => (
                <span key={day} role="columnheader">
                  {day}
                </span>
              ))}
            </div>
            {cal.weeks.map((monday) => (
              <div className="jjj-row" role="row" key={monday}>
                {DAYS.map((_, i) => {
                  const date = addDays(monday, i)
                  const post = byDate.get(date)
                  const { month, day } = dayLabel(date)
                  return (
                    <div
                      key={date}
                      role="cell"
                      className={post ? `jjj-cell jjj-pillar-${post.pillar}` : 'jjj-cell jjj-cell-empty'}
                    >
                      <span className="jjj-date">
                        <span className="jjj-dow">{DAYS[i]}, </span>
                        {month} {day}
                      </span>
                      {post && (
                        <>
                          <p className="jjj-title">{post.title}</p>
                          <div className="jjj-meta">
                            <span className={`jjj-format jjj-format-${post.format.toLowerCase()}`}>{post.format}</span>
                            <span className={`jjj-status ${statusClass(post.status)}`}>{post.status}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <ul className="jjj-notes">
            {cal.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
