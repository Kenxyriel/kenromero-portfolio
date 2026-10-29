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
    // The word in `mark` gets the amber highlighter.
    promise: { before: 'I find what', mark: 'breaks', after: 'before your users do.' },
    lead: 'I’m Ken Romero, a QA analyst who also builds with React and TypeScript. 4+ years testing enterprise applications: I find what breaks, document it clearly, and check the fix.',
  },
  // The hero test run: real cases and the real defect from the Authentication case study.
  testRun: {
    title: 'Login lockout',
    system: 'HR & Payroll',
    cases: [
      { id: 'TC-003', name: '3 invalid attempts, no lockout' },
      { id: 'TC-004', name: '4th attempt, 60-second lockout' },
      { id: 'TC-009', name: '9th attempt, 4-hour lockout' },
      { id: 'BUG-001', name: 'Lockout message matches the count', bug: 'Message did not match the failed attempt count' },
      { id: 'TC-012', name: 'Session timeout state' },
    ],
    totals: [
      { value: '12', label: 'cases' },
      { value: '2', label: 'defects found' },
      { value: '7/7', label: 'retests' },
      { value: '9/9', label: 'regression' },
    ],
    link: '/qa/projects/authentication-testing',
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
      kicker: 'Quality engineering',
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
      kicker: 'Software development',
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
      evidence: '12 cases · 2 defects · 7/7 retests',
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
      evidence: '9 API cases · 2 defects · 4/4 retests',
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
      category: 'Full-stack Development',
      title: 'SalinLibro-CMS Client Management',
      evidence: '7 E2E tests · 1 real bug caught',
      status: 'Paused',
      description:
        'Client records for accounting firms in Vue, Express and MySQL, with a Playwright suite that runs on its own test database and caught a real search bug.',
      tags: ['Vue 3', 'Express', 'MySQL', 'Playwright'],
      visual: 'image' as const,
      image: '/projects/salinlibro/dashboard.webp',
      link: { label: 'Read case study', to: '/qa/projects/salinlibro-cms' },
    },
    {
      type: 'dev' as const,
      category: 'Full-stack Development',
      title: 'SARIPOINT Point of Sale',
      evidence: '180+ endpoints · 120+ components',
      status: 'In progress',
      description:
        'A point of sale for sari-sari stores and minimarts: checkout, receipts, shifts, store credit, stock and reports, on React, Express and MySQL.',
      tags: ['React', 'TypeScript', 'Express', 'MySQL'],
      visual: 'image' as const,
      image: '/projects/saripoint/login.webp',
      link: { label: 'Read case study', to: '/qa/projects/saripoint' },
    },
    {
      type: 'dev' as const,
      category: 'Client Website',
      title: 'JJJ Tax and Accounting Website',
      evidence: '37 tests · 0 accessibility violations',
      status: 'Pre-launch',
      description:
        'A 15-page Next.js site for an accounting firm, with a protected contact form, 37 automated tests, and zero accessibility violations before launch.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Resend'],
      visual: 'image' as const,
      image: '/projects/jjj-website/home.webp',
      link: { label: 'Read case study', to: '/qa/projects/jjj-website' },
    },
    {
      type: 'dev' as const,
      category: 'Web Development',
      title: 'Multi-Audience Portfolio Platform',
      evidence: '1 codebase · 2 sites',
      description:
        'One React and TypeScript codebase that builds separate portfolio sites per audience, with shared components, data-driven content, and per-site builds on Vercel.',
      tags: ['React', 'TypeScript', 'Vite', 'React Router', 'Vercel'],
      visual: 'image' as const,
      image: '/projects/portfolio/sites.webp',
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
  workingWithMe: {
    kicker: 'Working with me',
    description: 'For a testing or development project, or a role on your team: what happens after you reach out.',
    steps: [
      { time: 'day 0', title: 'Intro message', text: 'Send a project brief or a role through the contact form. I reply within 24 hours.' },
      { time: 'days 1–3', title: 'Scoping call', text: 'We go over the product, the risks, the test environment and what “done” means.' },
      { time: 'week 1', title: 'Test plan or build plan', text: 'A short written plan with scope, test cases or features, tools and dates, for you to approve.' },
      { time: 'weeks 1–4', title: 'Execution with weekly updates', text: 'I test or build, log defects with steps and evidence, and send a status update every week.' },
      { time: 'handover', title: 'Handover', text: 'A test summary report, open defects and a regression checklist, or the code and its docs.' },
    ],
  },
  // The discovery call, written as a test case (QAHome BookingCase).
  bookingCase: {
    id: 'TC-030',
    title: 'Book a free 30-minute discovery call',
    precondition: 'You have a project to test or build, or a role on your team.',
    steps: ['Pick a time on my calendar', 'We talk for 30 minutes about your product, risks or role', 'You leave with a clear next step'],
    expected: 'You know whether I’m the right fit, at no cost.',
    actual: 'Not run yet. This one’s waiting on you.',
    button: 'Run it: book a call',
    note: 'Opens my calendar in a new tab. Free, no commitment.',
  },
  contactIntro:
    'Tell me what you’re building and what worries you about it. I’ll tell you how I’d test it.',
}
