// Shared identity and contact details used by every audience route (/qa, /it, /va).
// Only publish details that are intended for public portfolio use.
export const profile = {
  name: 'Ken Romero',
  email: 'kenromero.digital@gmail.com',
  whatsapp: { label: '+63 921 503 6956', href: 'https://wa.me/639215036956' },
  location: 'Taytay, Rizal, Philippines 1920',
  linkedin: {
    label: 'linkedin.com/in/kenxyrielromero',
    href: 'https://www.linkedin.com/in/kenxyrielromero/',
  },
  github: { label: 'github.com/kenxyriel', href: 'https://github.com/kenxyriel' },
  // Public booking page for the free discovery call (a Google Calendar
  // appointment schedule link). Until it is set, the button opens an email.
  bookingUrl: 'https://calendly.com/kenromero-digital/30min',
}

/** Where the "book a discovery call" buttons go, and whether it opens a new tab. */
export const bookingLink = profile.bookingUrl
  ? { href: profile.bookingUrl, external: true }
  : { href: `mailto:${profile.email}?subject=${encodeURIComponent('Discovery call request')}`, external: false }
