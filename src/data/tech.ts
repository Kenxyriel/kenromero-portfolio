// Content for the combined QA + software development portfolio (/qa).
// Only publish claims that are supported by real work.

export const techContent = {
  meta: {
    title: 'Ken Romero | QA Engineer & Web Developer',
    description:
      'Ken Romero - QA and software development portfolio: manual and automation testing, API testing, and web applications built with React and TypeScript.',
  },
  hero: {
    status: 'Open to QA & development roles',
    rotating: ['Quality Assurance', 'Test Automation', 'API Testing', 'Web Development'],
    lead: 'IT professional with 4+ years of experience working with enterprise applications. I find what breaks, document it clearly, and build web applications with React and TypeScript.',
    chips: ['4+ years in IT', 'Manual + Automation QA', 'React · TypeScript'],
  },
  // Real cases from the API Testing and Validation case study (shown on its project card).
  testWindow: [
    { id: 'API-001', method: 'GET', name: 'Retrieve products', expected: 'Product list returned' },
    { id: 'API-003', method: 'POST', name: 'Add new product', expected: 'Product created successfully' },
    { id: 'API-004', method: 'PUT', name: 'Update existing product', expected: 'Product successfully updated' },
    { id: 'API-005', method: 'DELETE', name: 'Delete product', expected: 'Product removed successfully' },
    { id: 'API-006', method: 'POST', name: 'Invalid product data', expected: 'Request rejected appropriately' },
  ],
  tools: [
    { name: 'Playwright', icon: '/icons/playwright-mono.svg' },
    { name: 'Selenium WebDriver', icon: '/icons/selenium-mono.svg' },
    { name: 'TypeScript', icon: '/icons/typescript-mono.svg' },
    { name: 'Postman', icon: '/icons/postman-mono.svg' },
    { name: 'Git', icon: '/icons/git-mono.svg' },
    { name: 'GitHub', icon: '/icons/github-mono.svg' },
    { name: 'GitHub Actions', icon: '/icons/github-actions-mono.svg' },
    { name: 'Azure DevOps', icon: '/icons/azure-devops-mono.svg' },
    { name: 'Jira', icon: '/icons/jira-mono.svg' },
  ],
  about: {
    paragraphs: [
      'I’m an IT professional and QA Analyst with 4+ years of experience working with enterprise applications and helping teams deliver reliable, quality software.',
      'I enjoy understanding how a system is supposed to work, breaking down requirements, and looking beyond the happy path to find the cases that can easily be missed.',
      'That same mindset carries into how I build: I start from expected behavior, think about edge cases early, and validate my work before it ships.',
    ],
    quote: 'What I enjoy most is the investigation: asking “What happens if…?”, finding where things can break, and making sure fixes solve the problem without creating another one.',
    stats: [
      { value: '4+', label: 'Years in IT' },
      { value: '5+', label: 'IT / digital projects' },
      { value: '2', label: 'Detailed QA case studies' },
      { value: '1', label: 'Live web platform built' },
    ],
  },
  disciplines: [
    {
      key: 'qa',
      kicker: '01 · Quality Engineering',
      title: 'I make sure it works.',
      text: 'Structured testing across expected, negative, and edge-case scenarios, with clear defect reports and verified fixes.',
      groups: [
        { title: 'Functional QA', items: ['Manual & Functional Testing', 'Positive / Negative', 'Boundary Testing', 'Regression & Retesting'] },
        { title: 'Test Design', items: ['Test Scenarios', 'Test Cases & Suites', 'Requirements & Acceptance Criteria', 'Release Validation'] },
        { title: 'API & Automation', items: ['API Testing', 'Postman & Swagger', 'Playwright & TypeScript', 'Selenium WebDriver'] },
      ],
    },
    {
      key: 'dev',
      kicker: '02 · Software Development',
      title: 'I build it, too.',
      text: 'Responsive web applications with a component-based frontend, version control, and automated delivery.',
      groups: [
        { title: 'Frontend', items: ['TypeScript', 'React', 'React Router', 'Vite', 'HTML & CSS', 'Responsive Design'] },
        { title: 'Workflow & Delivery', items: ['Git & GitHub', 'GitHub Actions', 'Azure DevOps', 'Jira', 'Vercel'] },
      ],
    },
  ],
  projects: [
    {
      type: 'qa' as const,
      category: 'Manual / Functional QA',
      title: 'Authentication & Proactive Lockout Testing',
      description:
        'Authentication behavior, failed attempts, and proactive lockout: test design, execution, defect reporting, retesting, and regression.',
      tags: ['Authentication', 'Lockout', 'Defects', 'Regression'],
      visual: 'image' as const,
      image: '/case-study-preview/case-study-one.webp',
      link: { label: 'Read case study', to: '/qa/projects/authentication-testing' },
    },
    {
      type: 'qa' as const,
      category: 'API / Functional QA',
      title: 'API Testing and Validation',
      description:
        'GET, POST, PUT, and DELETE validation: request and response checks, negative scenarios, API-to-UI comparison, and regression.',
      tags: ['Postman', 'REST API', 'Negative Testing', 'Regression'],
      // Shows sample test cases from this case study instead of a picture.
      visual: 'tests' as const,
      image: '/case-study-preview/case-study-two.webp',
      link: { label: 'Read case study', to: '/qa/projects/api-testing' },
    },
    {
      type: 'dev' as const,
      category: 'Web Development',
      title: 'Multi-Audience Portfolio Platform',
      description:
        'One React and TypeScript codebase that builds separate portfolio sites per audience, with shared components, data-driven content, and per-site builds on Vercel.',
      tags: ['React', 'TypeScript', 'Vite', 'React Router', 'Vercel'],
      visual: 'browser' as const,
      image: '',
      link: { label: 'Visit live site', href: 'https://www.kenromerogoestdigital.space/' },
    },
  ],
  process: [
    { title: 'Understand', text: 'Requirements and expected behavior' },
    { title: 'Design', text: 'Test scenarios and test cases' },
    { title: 'Execute', text: 'Run tests and record results' },
    { title: 'Compare', text: 'Expected vs actual' },
    { title: 'Report', text: 'Clear, reproducible defects' },
    { title: 'Retest', text: 'Verify the fix' },
    { title: 'Regression', text: 'Nothing else broke' },
  ],
  contactIntro:
    'Hiring for QA or development, or have a project that needs testing or building? Send a message and introduce yourself.',
}
