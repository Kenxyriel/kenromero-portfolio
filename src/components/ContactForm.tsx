import { useRef, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Linkedin, Mail, MapPin, Send, Smartphone } from 'lucide-react'
import { profile } from '../data/profile'

type ContactFormProps = {
  intro?: string
  // false = just the form, for pages that put their own heading and booking call beside it.
  showInfo?: boolean
}

const defaultIntro =
  'Have a QA project, testing opportunity, or collaboration in mind? Send a message and introduce yourself.'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ intro = defaultIntro, showInfo = true }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorText, setErrorText] = useState('')
  // When the form appeared; the server ignores submissions made faster than a person could type.
  const shownAt = useRef(Date.now())
  const privacyPath = useLocation().pathname.startsWith('/va') ? '/va/privacy' : '/privacy'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: window.location.href, elapsed: Date.now() - shownAt.current }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.success) {
        setErrorText(response.status === 429 || response.status === 400 ? result.message ?? '' : '')
        throw new Error(result.message)
      }
      form.reset()
      shownAt.current = Date.now()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={`contact-form-card${showInfo ? '' : ' is-form-only'}`}>
      {showInfo && (
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
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <label>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your full name" autoComplete="name" maxLength={200} required />
          </label>
          <label>
            <span>Email address</span>
            <input
              name="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              maxLength={200}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Enter an email address like name@example.com"
              required
            />
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
          <textarea name="message" rows={6} placeholder="Write something..." minLength={10} maxLength={5000} required />
        </label>

        <p className="contact-privacy-note">
          I only use your details to reply. See the <Link to={privacyPath}>Privacy Policy</Link>.
        </p>

        <div className="contact-form-footer">
          <p className={`contact-form-status is-${status}`} role="status" aria-live="polite">
            {status === 'sent' && 'Thanks! Your message was sent. I will get back to you soon.'}
            {status === 'error' && (
              <>
                {errorText ? `${errorText} ` : 'Sorry, the message could not be sent. '}You can also email me at{' '}
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
