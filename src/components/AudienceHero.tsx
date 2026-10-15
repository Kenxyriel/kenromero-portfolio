import { ArrowRight } from 'lucide-react'
import type { NavItem } from './SiteHeader'
import { profile } from '../data/profile'

type AudienceHeroProps = {
  eyebrow: string
  role: string
  lead: string
  primary: NavItem
  secondary: NavItem
  photo: string
}

// Two-column hero used by the /it and /va homepages.
export default function AudienceHero({ eyebrow, role, lead, primary, secondary, photo }: AudienceHeroProps) {
  return (
    <section className="aud-hero">
      <div className="container aud-hero-grid">
        <div className="aud-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{profile.name}</h1>
          <p className="aud-hero-role">{role}</p>
          <p className="aud-hero-lead">{lead}</p>
          <div className="button-row">
            <a className="button button-primary" href={primary.href}>
              {primary.label} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href={secondary.href}>
              {secondary.label}
            </a>
          </div>
        </div>
        <div className="aud-hero-photo">
          <img src={photo} alt={profile.name} />
        </div>
      </div>
    </section>
  )
}
