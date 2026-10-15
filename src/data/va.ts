// Content for the /va (virtual assistant) portfolio.
//
// Content rule (see Notion "02 - Content Inventory"): only publish claims that
// are supported by real work. Empty arrays hide their section in production and
// show a "content pending" placeholder while running `npm run dev`.

export type Service = { title: string; description: string }
export type WorkSample = { title: string; category: string; description: string; href?: string }
export type ProcessStep = { title: string; description: string }

export const vaContent = {
  meta: {
    title: 'Ken Romero | Virtual Assistant',
    description:
      'Ken Romero - virtual assistant for social media management, content creation, podcast editing, and digital support.',
  },
  roleLabel: 'Virtual Assistant',
  hero: {
    eyebrow: 'VIRTUAL ASSISTANT · SOCIAL MEDIA · DIGITAL SUPPORT',
    lead: 'Dependable support for business owners: social media management, content creation, podcast editing, and day-to-day digital tasks.',
  },
  about: [
    'I help business owners hand off the work that keeps their business visible and organized, so they can focus on running it.',
    'I take time to understand what you need before I start, communicate clearly while I work, and pay close attention to detail in everything I deliver.',
  ],
  // TODO: refine each description with your exact deliverables.
  services: [
    {
      title: 'Social Media Management',
      description: 'Planning, publishing, and keeping your social media channels active and consistent.',
    },
    {
      title: 'Content Creation',
      description: 'Creating posts and visual content that fit your brand and your audience.',
    },
    {
      title: 'Podcast Editing',
      description: 'Editing episodes into clean, ready-to-publish audio.',
    },
    {
      title: 'Digital & Admin Support',
      description: 'Handling the recurring online tasks that keep your business running smoothly.',
    },
  ] satisfies Service[],
  // TODO: list the tools you actually use (e.g. scheduling, design, audio editing).
  tools: [] as string[],
  // TODO: add sanitized, client-approved work samples.
  workSamples: [] as WorkSample[],
  // TODO: confirm this matches how you onboard and work with clients.
  process: [
    { title: 'Discovery', description: 'We talk through your goals, tasks, and how you like to work.' },
    { title: 'Plan', description: 'I confirm the scope, priorities, tools, and communication schedule.' },
    { title: 'Deliver', description: 'I get the work done and keep you updated along the way.' },
    { title: 'Review', description: 'We review results together and adjust what needs improving.' },
  ] satisfies ProcessStep[],
  contactIntro:
    'Need help with social media, content, podcast editing, or day-to-day tasks? Send a message and tell me about your business.',
}
