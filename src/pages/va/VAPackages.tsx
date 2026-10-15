import { useState } from 'react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getSmmPackages, podcastPackages, smmPackages, type Package } from '../../data/va'
import VALayout, { VAPageHero, VASectionTitle } from './VALayout'

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className={`va-package${pkg.badge ? ' va-package-featured' : ''}`}>
      {pkg.badge && <span className="va-package-badge">{pkg.badge}</span>}
      <h3>{pkg.name}</h3>
      {pkg.bestFor && <p className="va-package-for">{pkg.bestFor}</p>}
      <p className="va-price">
        <strong>{pkg.price}</strong> <span>{pkg.unit}</span>
      </p>
      {pkg.intro && <p className="va-package-intro">{pkg.intro}</p>}
      <ul className="va-checklist">
        {pkg.features.map((feature) => (
          <li key={feature}>
            <Check size={14} aria-hidden="true" /> {feature}
          </li>
        ))}
      </ul>
      {pkg.extra && (
        <>
          <p className="va-kicker">{pkg.extra.title}</p>
          <ul className="va-checklist">
            {pkg.extra.items.map((item) => (
              <li key={item}>
                <Check size={14} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </>
      )}
      {pkg.note && <p className="va-note">{pkg.note}</p>}
      <Link className="va-button" to="/va#contact">
        Let’s Work Together
      </Link>
    </article>
  )
}

function PackagesNav({ active }: { active: 'smm' | 'podcast' }) {
  return (
    <nav className="va-tabs" aria-label="Package type">
      <Link className={active === 'smm' ? 'is-active' : ''} to="/va/smm-packages">
        Social Media Management
      </Link>
      <Link className={active === 'podcast' ? 'is-active' : ''} to="/va/podcast-packages">
        Podcast Editing
      </Link>
    </nav>
  )
}

export function VASmmPackages() {
  const [currency, setCurrency] = useState<'usd' | 'php'>('usd')
  const { packages, addOns } = getSmmPackages(currency)

  return (
    <VALayout meta={smmPackages.meta}>
      <VAPageHero title={smmPackages.title} tagline={smmPackages.tagline} intro={smmPackages.pillars.join(' | ')} />

      <section className="va-section va-section-tight">
        <div className="container">
          <PackagesNav active="smm" />
          <div className="va-currency" role="group" aria-label="Currency">
            <button className={currency === 'usd' ? 'is-active' : ''} onClick={() => setCurrency('usd')} aria-pressed={currency === 'usd'}>
              USD
            </button>
            <button className={currency === 'php' ? 'is-active' : ''} onClick={() => setCurrency('php')} aria-pressed={currency === 'php'}>
              PHP (PH Local)
            </button>
          </div>
          <div className="va-packages">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={{ ...pkg, bestFor: pkg.tagline, intro: `Best for: ${pkg.bestFor}` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle eyebrow="Flexible Options for Your Extra Needs" title="Add-Ons" />
          <div className="va-addons">
            {addOns.map((addOn) => (
              <article key={addOn.name}>
                <h3>{addOn.name}</h3>
                <p>{addOn.description}</p>
                <strong>{addOn.price}</strong>
              </article>
            ))}
          </div>
          <ul className="va-fineprint">
            {smmPackages.addOnNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="va-section">
        <div className="container">
          <VASectionTitle eyebrow="A few things to keep in mind" title="Important Notes" />
          <div className="va-notes">
            {smmPackages.notes.map((note, index) => (
              <article key={note.title}>
                <span className="va-service-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{note.title}</h3>
                <ul>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="va-note va-centered">
            Thank you for your understanding! {smmPackages.thanks}
          </p>
        </div>
      </section>
    </VALayout>
  )
}

export function VAPodcastPackages() {
  const content = podcastPackages
  const { retainer } = content

  return (
    <VALayout meta={content.meta}>
      <VAPageHero title={content.title} />

      <section className="va-section va-section-tight">
        <div className="container">
          <PackagesNav active="podcast" />
          <VASectionTitle title="Per Episode" />
          <div className="va-packages va-packages-2">
            {content.perEpisode.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
          <div className="va-why">
            <p className="va-kicker">⭐ Why Choose Premium?</p>
            <ul className="va-chip-grid">
              {content.premiumWhy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle title="Optional Add-Ons" />
          <div className="va-addons">
            {content.addOns.map((addOn) => (
              <article key={addOn.name}>
                <h3>{addOn.name}</h3>
                <strong>{addOn.price}</strong>
                <ul>
                  {addOn.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="va-note va-centered">{content.clipDiscount}</p>
        </div>
      </section>

      <section className="va-section">
        <div className="container">
          <VASectionTitle eyebrow="Save vs paying per episode" title="Monthly Packages" />
          <div className="va-packages">
            {content.monthly.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
          <div className="va-reminders">
            <p className="va-kicker">Important Reminders</p>
            <ul>
              {content.monthlyReminders.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="va-section va-section-dark">
        <div className="container">
          <VASectionTitle title={retainer.name} />
          <p className="va-price va-centered">
            <strong>{retainer.price}</strong> <span>{retainer.unit}</span>
          </p>
          <div className="va-retainer">
            {retainer.includes.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="va-retainer va-retainer-3">
            <article>
              <h3>Perfect for</h3>
              <ul>
                {retainer.perfectFor.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Why hire a retainer package?</h3>
              <ul>
                {retainer.why.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Deliverables</h3>
              <ul>
                {retainer.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Commitment</h3>
              <ul>
                {retainer.commitment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Out of scope</h3>
              <ul>
                {retainer.outOfScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="va-note va-centered">{retainer.note}</p>
          <p className="va-centered">
            <Link className="va-button" to="/va#contact">
              {content.custom}
            </Link>
          </p>
        </div>
      </section>
    </VALayout>
  )
}
