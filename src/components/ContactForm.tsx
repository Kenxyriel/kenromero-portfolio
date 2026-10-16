import { useState, type FormEvent } from 'react'
import { Linkedin, Mail, MapPin, Send, Smartphone } from 'lucide-react'
import { profile } from '../data/profile'

type ContactFormProps = {
  intro?: string
}

const defaultIntro =
  'Have a QA project, testing opportunity, or collaboration in mind? Send a message and introduce yourself.'

const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ intro = defaultIntro }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!accessKey) {
      setStatus('error')
      return
    }

    const data = new FormData(form)
    data.append('access_key', accessKey)
    data.append('subject', `New portfolio message from ${data.get('name')}`)
    data.append('from_name', 'Ken Romero Portfolio')
    data.append('page', window.location.href)

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
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

        <input
          type="checkbox"
          name="botcheck"
          className="contact-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <label>
          <span>Message</span>
          <textarea name="message" rows={6} placeholder="Write something..." required />
        </label>

        <div className="contact-form-footer">
          <p className={`contact-form-status is-${status}`} role="status" aria-live="polite">
            {status === 'sent' && 'Thanks! Your message was sent. I will get back to you soon.'}
            {status === 'error' && (
              <>
                Sorry, the message could not be sent. Please email me at{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a> instead.
              </>
            )}
          </p>
          <button
            className="button button-primary contact-submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
