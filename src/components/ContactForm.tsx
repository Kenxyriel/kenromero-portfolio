import { useState, type FormEvent } from 'react'
import { Linkedin, Mail, MapPin, Send, Smartphone } from 'lucide-react'
import { profile } from '../data/profile'

type ContactFormProps = {
  intro?: string
}

const defaultIntro =
  'Have a QA project, testing opportunity, or collaboration in mind? Send a message and introduce yourself.'

export default function ContactForm({ intro = defaultIntro }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-form-card">
      <div className="contact-info">
        <p className="eyebrow">CONTACT</p>
        <h2>Get in touch</h2>
        <p className="contact-intro">{intro}</p>

        <ul className="contact-details">
          <li>
            <Mail size={17} aria-hidden="true" />
            <div>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </li>
          <li>
            <Smartphone size={17} aria-hidden="true" />
            <div>
              <span>WhatsApp</span>
              <a href={profile.whatsapp.href} target="_blank" rel="noreferrer">
                {profile.whatsapp.label}
              </a>
            </div>
          </li>
          <li>
            <MapPin size={17} aria-hidden="true" />
            <div>
              <span>Location</span>
              <p>{profile.location}</p>
            </div>
          </li>
          <li>
            <Linkedin size={17} aria-hidden="true" />
            <div>
              <span>LinkedIn</span>
              <a href={profile.linkedin.href} target="_blank" rel="noreferrer">
                {profile.linkedin.label}
              </a>
            </div>
          </li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <label>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your full name" required />
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" placeholder="Your email address" required />
          </label>
        </div>

        <label>
          <span>Message</span>
          <textarea name="message" rows={6} placeholder="Write something..." required />
        </label>

        <div className="contact-form-footer">
          <button className="button button-primary contact-submit" type="submit">
            Send Message <Send size={16} />
          </button>
          {submitted && (
            <small className="contact-form-status">
              Form UI is ready. A live email endpoint still needs to be connected before messages can be delivered.
            </small>
          )}
        </div>
      </form>
    </div>
  )
}
