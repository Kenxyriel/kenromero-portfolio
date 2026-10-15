import { ArrowUpRight, FileText, Github } from 'lucide-react'
import AudienceHero from '../../components/AudienceHero'
import ContactForm from '../../components/ContactForm'
import PendingContent from '../../components/PendingContent'
import SectionHeading from '../../components/SectionHeading'
import SiteFooter from '../../components/SiteFooter'
import SiteHeader, { type NavItem } from '../../components/SiteHeader'
import usePageMeta from '../../components/usePageMeta'
import { itContent as content } from '../../data/it'
import { profile } from '../../data/profile'

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const showExperience = content.experience.length > 0 || import.meta.env.DEV

export default function ITHome() {
  usePageMeta(content.meta.title, content.meta.description)

  return (
    <div className="site-shell theme-it">
      <SiteHeader
        brandRole="SOFTWARE DEVELOPMENT"
        navItems={navItems.filter((item) => item.href !== '#experience' || showExperience)}
        cta={{ label: "Let's Connect", href: '#contact' }}
      />

      <main id="top">
        <AudienceHero
          eyebrow={content.hero.eyebrow}
          role={content.roleLabel}
          lead={content.hero.lead}
          primary={{ label: 'View Projects', href: '#projects' }}
          secondary={{ label: "Let's Connect", href: '#contact' }}
          photo="/ken-romero-hero.JPG"
        />

        <section id="about" className="section">
          <div className="container aud-about">
            <SectionHeading eyebrow="ABOUT ME" title="Building software with a tester’s eye." />
            <div className="aud-about-body">
              {content.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="aud-chip-row">
                {content.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-muted">
          <div className="container">
            <SectionHeading
              eyebrow="TECHNICAL SKILLS"
              title="Tools and technologies I work with."
            />
            <div className="aud-card-grid">
              {content.skills.map((group, index) => (
                <article className="aud-card" key={group.title}>
                  <span className="aud-card-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{group.title}</h3>
                  <div className="aud-chip-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <SectionHeading eyebrow="DEVELOPMENT PROJECTS" title="Things I’ve built." />
            <div className="aud-project-list">
              {content.projects.map((project) => (
                <article className="aud-project" key={project.title}>
                  <div className="aud-project-head">
                    <span className="aud-status">{project.status}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="aud-project-links">
                      {project.links.map((link) => (
                        <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="aud-project-detail">
                    <p className="aud-label">HIGHLIGHTS</p>
                    <ul>
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="aud-label">STACK</p>
                    <div className="aud-chip-row">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <PendingContent label="Add more development projects in src/data/it.ts (projects)." />
          </div>
        </section>

        {showExperience && (
          <section id="experience" className="section section-muted">
            <div className="container">
              <SectionHeading eyebrow="EXPERIENCE" title="Where I’ve worked." />
              <div className="aud-card-grid">
                {content.experience.map((item) => (
                  <article className="aud-card" key={item.title}>
                    <span className="aud-status">{item.context}</span>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>
              {content.experience.length === 0 && (
                <PendingContent label="Add verified roles in src/data/it.ts (experience)." />
              )}
            </div>
          </section>
        )}

        <section className="section aud-links-section">
          <div className="container aud-link-grid">
            <a className="aud-link-card" href={profile.github.href} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              <span>
                <strong>GitHub</strong>
                <small>{profile.github.label}</small>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="aud-link-card"
              href={`mailto:${profile.email}?subject=${encodeURIComponent('Resume request')}`}
            >
              <FileText aria-hidden="true" />
              <span>
                <strong>Resume</strong>
                <small>Available on request</small>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <ContactForm intro={content.contactIntro} />
          </div>
        </section>
      </main>

      <SiteFooter role={content.roleLabel} />
    </div>
  )
}
