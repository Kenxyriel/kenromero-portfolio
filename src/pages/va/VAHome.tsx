import { ArrowRight, ArrowUpRight, Instagram, Linkedin, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactForm from '../../components/ContactForm'
import TestimonialsCarousel from '../../components/TestimonialsCarousel'
import { profile } from '../../data/profile'
import { vaHome as content, vaLinks, vaTestimonials } from '../../data/va'
import VALayout, { VAImg, VASectionTitle } from './VALayout'

export default function VAHome() {
  return (
    <VALayout meta={content.meta}>
      {/* HERO */}
      <section className="va-hero">
        <div className="container va-hero-grid">
          <div className="va-hero-copy">
            <h1>
              <span>Ken</span>
              <span>Romero</span>
            </h1>
            <ul className="va-hero-roles">
              {content.hero.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <p className="va-hero-tagline">{content.hero.tagline}</p>
            <div className="va-hero-links">
              <a href={vaLinks.instagram.href} target="_blank" rel="noreferrer">
                <Instagram size={16} aria-hidden="true" /> Instagram
              </a>
              <a href={vaLinks.linkedin.href} target="_blank" rel="noreferrer">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
              <a href={vaLinks.aboutMe.href} target="_blank" rel="noreferrer">
                <UserRound size={16} aria-hidden="true" /> {vaLinks.aboutMe.label}
              </a>
            </div>
          </div>
          <div className="va-hero-photo">
            {content.hero.photo.image ? (
              <img src={content.hero.photo.image} alt={profile.name} />
            ) : (
              <img src="/ken-romero.JPG" alt={profile.name} />
            )}
          </div>
        </div>
      </section>

      {/* ABOUT + NUMBERS */}
      <section id="about" className="va-section">
        <div className="container va-about-grid">
          <div className="va-about-copy">
            <p className="va-script">{content.about.eyebrow}</p>
            <h2 className="va-display">
              About <span>Me</span>
            </h2>
            <p className="va-greeting">{content.about.greeting}</p>
            <p className="va-motto">{content.about.motto}</p>
            <p>{content.about.body}</p>
            <p className="va-signature">
              <span className="va-script">{profile.name}</span>
              {content.about.signature}
            </p>
          </div>
          <div className="va-numbers">
            <p className="va-numbers-kicker">by the Numbers</p>
            <h3>{content.about.numbersTitle}</h3>
            <div className="va-numbers-grid">
              {content.about.numbers.map((item) => (
                <div className="va-number" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="va-section va-section-dark">
        <div className="container">
          <VASectionTitle eyebrow={content.whatIDo.eyebrow} title={content.whatIDo.title} />
          <div className="va-whatido-grid">
            {content.whatIDo.items.map((item) => (
              <div className="va-whatido-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <p className="va-script va-centered">{content.whatIDo.closing}</p>
        </div>
      </section>

      {/* TOOLS */}
      <section className="va-section">
        <div className="container va-tools">
          <div>
            <h2 className="va-display">{content.tools.title}</h2>
            <p>{content.tools.description}</p>
          </div>
          <ul className="va-chip-grid">
            {content.tools.items.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle
            eyebrow={content.services.eyebrow}
            title={content.services.title}
            description={content.services.description}
          />
          <div className="va-services-grid">
            {content.services.items.map((service) => (
              <article className="va-service-card" key={service.title}>
                <span className="va-service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p className="va-service-tagline">{service.tagline}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {service.path && (
                  <Link className="va-text-link" to={service.path}>
                    View Work <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="work" className="va-section">
        <div className="va-band">
          <h2>{content.featured.title}</h2>
          <p>{content.featured.tagline}</p>
        </div>
        <div className="container">
          {content.featured.groups.map((group) => (
            <div className="va-featured-group" key={group.title}>
              <div className="va-featured-head">
                <h3>{group.title}</h3>
                <Link className="va-text-link" to={group.path}>
                  See all <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <div className="va-gallery">
                {group.items.map((item) => (
                  <VAImg key={item.label} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="va-section va-section-cream">
        <div className="container">
          <VASectionTitle eyebrow="Kind words" title="Client Testimonials" />
          <TestimonialsCarousel testimonials={vaTestimonials} />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="va-section va-contact">
        <div className="container">
          <VASectionTitle eyebrow={content.closing.eyebrow} title={content.closing.title} />
          <ContactForm intro="Need help with social media, content, podcast editing, or design? Send a message and tell me about your business." />
        </div>
      </section>
    </VALayout>
  )
}
