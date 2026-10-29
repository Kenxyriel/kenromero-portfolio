// Privacy Policy and Terms of Use shown on both portfolios.
// Plain-language templates for a freelancer based in the Philippines. They are
// not legal advice: review them, and update them whenever the site starts
// collecting something new (a new form, tracking tool, or payment).
import { profile } from './profile'

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] }
export type LegalDoc = {
  slug: 'privacy' | 'terms'
  title: string
  description: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const updated = '26 October 2026'

export const privacyPolicy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  description: 'How Ken Romero collects, uses, and protects personal information on this website.',
  updated,
  intro: `This website is the portfolio of ${profile.name}, a freelancer based in ${profile.location}. This policy explains what personal information the site collects, why, and what you can do about it. It follows the Philippine Data Privacy Act of 2012 (Republic Act No. 10173).`,
  sections: [
    {
      heading: 'Who is responsible for your information',
      paragraphs: [
        `${profile.name} is the personal information controller for this website. For any privacy question or request, email ${profile.email}.`,
      ],
    },
    {
      heading: 'What I collect',
      list: [
        'Contact form: your name, email address, message, and the page you sent it from. This is only collected when you choose to send a message.',
        'Messages you send directly by email or WhatsApp.',
        'Basic technical data: like every website, the hosting provider (Vercel) receives your IP address, browser type, and the pages you request. It is used to deliver the site and protect it from abuse.',
        'Anonymous visit statistics through Vercel Web Analytics: page views, the site that referred you, country, and device type. It uses no cookies and does not identify you personally.',
        'Visit statistics through Google Analytics: pages viewed, how you reached the site, approximate location (city or country), device and browser type. It sets cookies to tell repeat visits apart, and IP addresses are not logged or stored.',
      ],
      after: [
        'The site has no user accounts, takes no payments, and does not use advertising cookies. The only cookies are the Google Analytics ones above, which you can block in your browser settings or with the Google Analytics opt-out add-on (tools.google.com/dlpage/gaoptout). I do not sell or rent your information to anyone.',
      ],
    },
    {
      heading: 'Why I use it',
      list: [
        'To read and reply to your message and talk about possible work together.',
        'To deliver a project you hire me for, and keep the records that go with it.',
        'To keep the website working, secure, and free of spam.',
        'To understand, in aggregate, which pages are useful so I can improve the site.',
      ],
      after: [
        'I process your information because you chose to contact me (consent), to take steps toward a contract you asked for, and for my legitimate interest in running a secure website.',
      ],
    },
    {
      heading: 'Who it is shared with',
      paragraphs: [
        'Only with the service providers that run the site, each bound by its own privacy and security commitments:',
      ],
      list: [
        'Vercel Inc. (website hosting and analytics).',
        'Resend (delivers contact form messages to my inbox).',
        'Google (Google Analytics visit statistics, and my Gmail inbox, where messages are received).',
      ],
    },
    {
      heading: 'International transfers',
      paragraphs: [
        'These providers may store data on servers outside the Philippines, including in the United States. I only use providers that protect data with industry-standard security.',
      ],
    },
    {
      heading: 'How long I keep it',
      paragraphs: [
        'I keep messages for as long as needed to reply and, if we work together, for the length of the project plus a reasonable period for records, usually no more than two years after our last contact. You can ask me to delete them sooner.',
      ],
    },
    {
      heading: 'How it is protected',
      paragraphs: [
        'The site is served only over HTTPS. The email service key is stored on the server and never sent to your browser. The contact form has spam and abuse protection, and only I have access to the messages.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: ['Under the Data Privacy Act of 2012 you have the right to:'],
      list: [
        'Be informed about how your personal information is used.',
        'Access the information I hold about you.',
        'Correct inaccurate or outdated information.',
        'Object to processing, or withdraw your consent.',
        'Have your information erased or blocked.',
        'Get a copy of your information in a common format (data portability).',
        'Be compensated for damages caused by unlawful processing.',
        'File a complaint with the National Privacy Commission (privacy.gov.ph).',
      ],
    },
    {
      heading: 'Other websites',
      paragraphs: [
        'Links to LinkedIn, Instagram, TikTok, WhatsApp, GitHub, Google Sheets, and other sites are governed by those sites’ own privacy policies.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: ['This site is meant for businesses and adults. I do not knowingly collect information from children.'],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: ['If this policy changes, the new version will be posted here with a new “last updated” date.'],
    },
  ],
}

export const termsOfUse: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Use',
  description: 'The terms for using Ken Romero’s portfolio website and its content.',
  updated,
  intro: `These terms apply to your use of this website, the portfolio of ${profile.name}. By using the site you agree to them.`,
  sections: [
    {
      heading: 'Purpose of the site',
      paragraphs: [
        'This site shows my work and services for information only. Nothing on it is an offer that becomes a contract by itself.',
      ],
    },
    {
      heading: 'Ownership of the content',
      paragraphs: [
        `The site’s design, text, photos of me, and my original work are © ${profile.name}. All rights reserved.`,
        'Client work is shown with permission, for portfolio purposes only. Copyright, trademarks, and logos in that work belong to the respective clients and brands.',
        'Please do not copy, download for reuse, republish, sell, or use any content from this site, including for training AI models, without written permission.',
      ],
    },
    {
      heading: 'Third-party names and logos',
      paragraphs: [
        'Names and logos of tools and platforms (for example Canva, CapCut, Notion, ChatGPT, Meta, and Google) belong to their owners. They appear only to show which tools I use and do not mean those companies endorse me.',
      ],
    },
    {
      heading: 'Reporting a copyright concern',
      paragraphs: [
        `If you believe something on this site uses your work or brand without permission, email ${profile.email} with a link to the item and a short explanation. I will review it and remove it promptly if the concern is valid.`,
      ],
    },
    {
      heading: 'Services and prices',
      paragraphs: [
        'Packages and prices shown on the site are a guide and may change. The final scope, price, timeline, and payment terms for any project are set in a written agreement or confirmed by email before work starts.',
      ],
    },
    {
      heading: 'Testimonials and results',
      paragraphs: [
        'Testimonials come from real clients and colleagues and are shared with their permission. Results depend on each business, so past results do not guarantee future ones.',
      ],
    },
    {
      heading: 'Using the contact form',
      paragraphs: [
        'Please use the form only for genuine inquiries. Do not send spam, malware, or unlawful, abusive, or confidential material. Messages that look automated may be blocked.',
      ],
    },
    {
      heading: 'No warranty',
      paragraphs: [
        'I keep the site accurate and available, but it is provided “as is”. To the extent the law allows, I am not liable for losses that come from using the site or relying on its content.',
      ],
    },
    {
      heading: 'Links to other sites',
      paragraphs: ['Links to other websites are for convenience. I am not responsible for their content or practices.'],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of the Republic of the Philippines.'],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        `I may update these terms, and the new version will be posted here with a new date. Questions? Email ${profile.email}.`,
      ],
    },
  ],
}

export const legalDocs = { privacy: privacyPolicy, terms: termsOfUse }
