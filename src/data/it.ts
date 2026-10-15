// Content for the /it (software development) portfolio.
//
// Content rule (see Notion "02 - Content Inventory"): only publish claims that
// are supported by real work. Empty arrays hide their section in production and
// show a "content pending" placeholder while running `npm run dev`.

export type SkillGroup = { title: string; items: string[] }

export type DevProject = {
  title: string
  status: string
  description: string
  stack: string[]
  highlights: string[]
  links: { label: string; href: string }[]
}

export type ExperienceItem = {
  title: string
  context: string
  summary: string
}

export const itContent = {
  meta: {
    title: 'Ken Romero | Software Development Portfolio',
    description:
      'Ken Romero - IT professional and developer building web applications with React and TypeScript.',
  },
  roleLabel: 'Application System Engineer',
  hero: {
    eyebrow: 'SOFTWARE DEVELOPMENT · APPLICATION SYSTEMS',
    lead: 'IT professional with 4+ years of experience working with enterprise applications, building web applications with React and TypeScript.',
  },
  about: [
    'I’m an IT professional with 4+ years of experience working with enterprise applications.',
    'My background in quality assurance shapes how I build software: I start from requirements and expected behavior, think about edge cases early, and validate my work before it ships.',
  ],
  highlights: ['4+ years in IT', 'Enterprise applications', 'React + TypeScript', 'Quality-first delivery'],
  skills: [
    {
      title: 'Frontend Development',
      items: ['TypeScript', 'React', 'React Router', 'Vite', 'HTML & CSS', 'Responsive Design'],
    },
    {
      title: 'Workflow & Delivery',
      items: ['Git', 'GitHub', 'GitHub Actions', 'Azure DevOps', 'Jira', 'Vercel'],
    },
    {
      title: 'APIs & Testing',
      items: ['API Testing', 'Postman', 'Swagger', 'Playwright', 'Selenium WebDriver'],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      title: 'Multi-Audience Portfolio Platform',
      status: 'In active development',
      description:
        'The website you are viewing. One React and TypeScript codebase serves separate portfolios for QA, software development, and virtual assistant audiences from a single domain, each with its own entry point and navigation.',
      stack: ['React', 'TypeScript', 'Vite', 'React Router', 'CSS', 'Vercel'],
      highlights: [
        'Route-per-audience architecture (/qa, /it, /va) on one domain',
        'Shared component library with data-driven page content',
        'Responsive layouts and keyboard-accessible navigation',
        'SPA routing on Vercel with redirects for legacy URLs',
      ],
      links: [{ label: 'Live site', href: 'https://www.kenromerogoestdigital.space/' }],
    },
  ] satisfies DevProject[],
  // TODO: add verified roles (title, company or anonymized context, summary).
  experience: [] as ExperienceItem[],
  contactIntro:
    'Hiring for a development role or have a software project in mind? Send a message and introduce yourself.',
}
