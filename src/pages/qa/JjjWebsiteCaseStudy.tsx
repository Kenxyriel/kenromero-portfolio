import {
  Accessibility,
  BadgeCheck,
  Cookie,
  FileSearch,
  Gauge,
  Globe,
  LayoutTemplate,
  Mail,
  Palette,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import CaseStudyPage from './case-study/CaseStudyPage'
import { Block, Callout, Chapter, Checklist, DataTable, Gallery, IconCards, Steps } from './case-study/blocks'

const chapters = [
  { id: 'context', label: 'The brief' },
  { id: 'build', label: 'What I built' },
  { id: 'contact', label: 'The contact form' },
  { id: 'quality', label: 'Pre-launch checks' },
  { id: 'next', label: 'Where it stands' },
]

const features = [
  { title: 'Brand kept intact', text: 'The firm\'s blue identity and tagline, with navy, pale blue and restrained gold accents.', icon: Palette },
  { title: '15 pages', text: 'Home, about, services, four service pages, who we serve, four audience pages, contact and legal pages.', icon: LayoutTemplate },
  { title: 'Phone friendly', text: 'Responsive layouts checked from 360 px phones up to wide desktop screens.', icon: Smartphone },
  { title: 'Search ready', text: 'Unique titles and descriptions, canonical URLs, share images, a sitemap and robots.txt.', icon: Globe },
  { title: 'Privacy first', text: 'Self-hosted fonts and analytics that load only after a visitor accepts cookies.', icon: Cookie },
  { title: 'Legal pages', text: 'A privacy policy written for the Philippine Data Privacy Act, plus terms and conditions.', icon: FileSearch },
]

const formFlow = [
  { label: 'Visitor', detail: 'Fills in the inquiry form', icon: Send },
  { label: 'Browser checks', detail: 'Inline errors, focus on the first one', icon: BadgeCheck },
  { label: 'Server route', detail: 'Validates and cleans every field', icon: Server },
  { label: 'Resend', detail: 'Emails the firm\'s inbox', icon: Mail },
]

const spamChecks = [
  'Hidden honeypot field that only bots fill in',
  '"Too fast" trap for forms sent in under a few seconds',
  'Rate limit of 5 inquiries per 10 minutes per visitor',
  'Origin check so other sites cannot post to it',
  'Cloudflare Turnstile ready, switched on with the firm\'s keys',
  'API key kept on the server, never sent to the browser',
]

const checks = [
  ['Lighthouse, desktop', '98 to 99', '5 pages, local production build'],
  ['Lighthouse, mobile', '91 to 96', 'Simulated slow 4G and a slower CPU'],
  ['Accessibility (axe)', '0 violations', '15 pages at phone and desktop width'],
  ['Internal links', '0 broken', 'Every link and anchor crawled'],
  ['Images', '7.2 MB to 0.43 MB', 'Four largest images compressed'],
  ['Automated tests', '37 tests', 'Contact API, SEO, consent, rate limit and content'],
]

export default function JjjWebsiteCaseStudy() {
  return (
    <CaseStudyPage
      kicker="// project · client website"
      status="Pre-launch"
      title="JJJ Tax and Accounting Website"
      system="Business website for a Philippine accounting firm"
      lead="A multi-page website that explains the firm's services clearly and turns visitors into inquiries, built with Next.js and checked page by page before launch."
      tags={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Resend', 'Vitest']}
      heroImage={{
        src: '/projects/jjj-website/home.webp',
        alt: 'JJJ Tax and Accounting home page with the headline Optimize your growing business. With us.',
      }}
      stats={[
        { value: '15', label: 'Pages' },
        { value: '37', label: 'Automated tests' },
        { value: '0', label: 'Accessibility violations' },
        { value: '91–99', label: 'Lighthouse performance' },
      ]}
      summary={{
        problem:
          'An accounting firm needed a credible site where visitors quickly understand the services, trust the business, and know how to get in touch.',
        role: 'Website design and development, from page structure to the contact form and pre-launch checks.',
        approach:
          'Next.js with reusable components, the firm\'s existing brand, and a server-side contact route that emails inquiries through Resend.',
        result:
          'Feature-complete and checked on a local production build. Waiting for the firm\'s domain and email keys before going live.',
      }}
      resultLabel="Where it stands"
      chapters={chapters}
      next={{ title: 'SalinLibro-CMS Client Management', to: '/qa/projects/salinlibro-cms' }}
    >
      <Chapter
        id="context"
        title="The brief"
        intro="JJJ Tax and Accounting Services helps individuals and businesses with bookkeeping, tax, business registration and advisory. The site had to carry the firm's tagline, Optimize your growing business with us, and make inquiries easy."
      >
        <Callout>
          No invented claims: service details, credentials and contact information are confirmed with the firm before
          they go on the site.
        </Callout>
      </Chapter>

      <Chapter id="build" title="What I built">
        <Block>
          <IconCards items={features} />
        </Block>
        <Block title="Screens" note="From the local build, before the firm's domain is connected.">
          <Gallery
            layout="paired"
            items={[
              { src: '/projects/jjj-website/services.webp', alt: 'Services page listing tax services and accounting and assurance', caption: 'Services overview, grouped into clear service areas.' },
              { src: '/projects/jjj-website/mobile-services.webp', alt: 'Services page on a phone', caption: 'Services on a phone.' },
              { src: '/projects/jjj-website/contact.webp', alt: 'Contact page with an inquiry form', caption: 'Contact page with a short, guided inquiry form.' },
              { src: '/projects/jjj-website/mobile-home.webp', alt: 'Home page on a phone', caption: 'Home on a phone.' },
            ]}
          />
        </Block>
      </Chapter>

      <Chapter
        id="contact"
        title="The contact form"
        intro="The form is the point of the site, so it gets the most protection: checks in the browser, the same checks again on the server, and several layers against spam."
      >
        <Block title="From form to inbox">
          <Steps steps={formFlow} />
        </Block>
        <Block title="Spam and abuse protection" icon={ShieldCheck}>
          <Checklist items={spamChecks} />
        </Block>
      </Chapter>

      <Chapter
        id="quality"
        title="Pre-launch checks"
        intro="Before calling it ready, every page was measured on a production build. These are the numbers from the October 2026 pre-launch report."
      >
        <Block title="Results" icon={Gauge}>
          <DataTable caption="Pre-launch check results" columns={['Check', 'Result', 'Scope']} rows={checks} />
        </Block>
        <Callout title="Not verified yet">
          Real email delivery, spam protection with live keys, and speed on the final host can only be checked once the
          site is on the firm's domain.
        </Callout>
      </Chapter>

      <Chapter id="next" title="Where it stands">
        <div className="cs-grid-2">
          <Block title="Done" icon={BadgeCheck}>
            <Checklist
              columns={1}
              items={[
                'All 15 pages, legal pages and a custom 404',
                'Contact form with server-side validation',
                'SEO, share images, sitemap and robots.txt',
                'CI runs type checks, tests and a build',
              ]}
            />
          </Block>
          <Block title="Before launch" icon={Accessibility}>
            <Checklist
              columns={1}
              items={[
                'Connect the firm\'s domain and force HTTPS',
                'Add the email, spam protection and analytics keys',
                'Send a real test inquiry end to end',
                'Firm reviews the legal pages',
              ]}
            />
          </Block>
        </div>
      </Chapter>
    </CaseStudyPage>
  )
}
