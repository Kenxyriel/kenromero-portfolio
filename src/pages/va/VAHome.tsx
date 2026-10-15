import { ArrowUpRight, CalendarCheck, Headphones, Megaphone, PenTool } from 'lucide-react'
import AudienceHero from '../../components/AudienceHero'
import ContactForm from '../../components/ContactForm'
import PendingContent from '../../components/PendingContent'
import SectionHeading from '../../components/SectionHeading'
import SiteFooter from '../../components/SiteFooter'
import SiteHeader, { type NavItem } from '../../components/SiteHeader'
import TestimonialsCarousel from '../../components/TestimonialsCarousel'
import usePageMeta from '../../components/usePageMeta'
import { testimonials } from '../../data/testimonials'
import { vaContent as content } from '../../data/va'

const serviceIcons = [Megaphone, PenTool, Headphones, CalendarCheck]

const showTools = content.tools.length > 0 || import.meta.env.DEV
const showWork = content.workSamples.length > 0 || import.meta.env.DEV

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  ...(showWork ? [{ label: 'Work', href: '#work' }] : []),
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function VAHome() {
  usePageMeta(content.meta.title, content.meta.description)

  return (
    <div className="site-shell theme-va">
      <SiteHeader
        brandRole="VIRTUAL ASSISTANT"
        navItems={navItems}
        cta={{ label: "Let's Work Together", href: '#contact' }}
      />

      <main id="top">
        <AudienceHero
          eyebrow={content.hero.eyebrow}
          role={content.roleLabel}
          lead={content.hero.lead}
          primary={{ label: 'View Services', href: '#services' }}
          secondary={{ label: "Let's Work Together", href: '#contact' }}
          photo="/ken-romero.JPG"
        />

        <section id="about" className="section">
          <div className="container aud-about">
            <SectionHeading eyebrow="ABOUT ME" title="Support you can rely on." />
            <div className="aud-about-body">
              {content.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section section-muted">
          <div className="container">
            <SectionHeading eyebrow="SERVICES" title="How I can help your business." />
            <div className="aud-card-grid aud-card-grid-4">
              {content.services.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length]
                return (
                  <article className="aud-card" key={service.title}>
                    <Icon className="aud-card-icon" aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                )
              })}
            </div>
            {showTools && (
              <div className="aud-tools">
                <p className="aud-label">TOOLS I USE</p>
                {content.tools.length > 0 ? (
                  <div className="aud-chip-row">
                    {content.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                ) : (
                  <PendingContent label="Add the tools you use in src/data/va.ts (tools)." />
                )}
              </div>
            )}
          </div>
        </section>

        {showWork && (
          <section id="work" className="section">
            <div className="container">
              <SectionHeading eyebrow="CLIENT WORK" title="Selected work samples." />
              <div className="aud-card-grid">
                {content.workSamples.map((sample) => (
                  <article className="aud-card" key={sample.title}>
                    <span className="aud-status">{sample.category}</span>
                    <h3>{sample.title}</h3>
                    <p>{sample.description}</p>
                    {sample.href && (
                      <a className="text-link" href={sample.href} target="_blank" rel="noreferrer">
                        View sample <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
              {content.workSamples.length === 0 && (
                <PendingContent label="Add sanitized, client-approved samples in src/data/va.ts (workSamples)." />
              )}
            </div>
          </section>
        )}

        <section id="process" className="section">
          <div className="container">
            <SectionHeading eyebrow="WORK PROCESS" title="Simple, clear, and organized." />
            <ol className="aud-process">
              {content.process.map((step, index) => (
                <li key={step.title}>
                  <span className="aud-card-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="testimonials" className="section section-muted">
          <div className="container">
            <SectionHeading
              eyebrow="TESTIMONIALS"
              title="Client feedback"
              description="Feedback from business owners I’ve worked with."
              compact
            />
            <TestimonialsCarousel testimonials={testimonials} />
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
