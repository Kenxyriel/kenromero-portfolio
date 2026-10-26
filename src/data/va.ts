// Content for the /va (virtual assistant / creative) portfolio.
// Source: Canva site "Ken Romero - Creative Portfolio v.1.3".
//
// Image paths point into /public/va (work samples in /public/va/work, cropped
// from the Canva creative portfolio). Leave `image` empty to show a labelled
// placeholder until the real asset is added.

/**
 * A work sample. `image` is the still (or video poster); `video` is an MP4 in
 * public/va/work that plays in place of the still once added. `tall` marks a
 * vertical (9:16) sample such as a short-form clip. `brand` names the client
 * a sample was made for (shown in the animated food showcase).
 */
export type VAImage = { image?: string; video?: string; label: string; tall?: boolean; brand?: string }

export const vaLinks = {
  instagram: { label: '@heyitskhenn', href: 'https://www.instagram.com/heyitskhenn/' },
  aboutMe: { label: 'More about me', href: 'https://jobseekers.ph/kenxyrieldemesaromero' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kenxyrielromero/' },
  handle: 'kenromero.goesdigital_',
}

// Official tool logos, cropped to circles, in public/va/tools.
export const toolIcons = {
  'CapCut Pro': '/va/tools/capcut-pro.png',
  OpusClip: '/va/tools/opusclip.png',
  Canva: '/va/tools/canva.png',
  'Riverside.fm': '/va/tools/riverside.png',
  ChatGPT: '/va/tools/chatgpt.png',
  Claude: '/va/tools/claude.png',
  ElevenLabs: '/va/tools/elevenlabs.svg',
  'Gemini AI': '/va/tools/gemini.svg',
  'Meta Business': '/va/tools/meta.png',
  Buffer: '/va/tools/buffer.png',
  Metricool: '/va/tools/metricool.png',
  Notion: '/va/tools/notion.svg',
  'Google Drive': '/va/tools/google-drive.png',
  'Google Suite': '/va/tools/google.png',
  Asana: '/va/tools/asana.svg',
  Trello: '/va/tools/trello.svg',
}

export type ToolName = keyof typeof toolIcons

export const vaHome = {
  meta: {
    title: 'Ken Romero | Social Media Manager, Podcast Editor & Graphic Designer',
    description:
      'Ken Romero - social media management, podcast editing, graphic design, and content support for small businesses.',
  },
  hero: {
    roles: ['Podcast Editor', 'Graphic Designer', 'Social Media Manager'],
    tagline: 'Built on Process, Driven by Results',
    photo: { image: '', label: 'Hero portrait' } as VAImage,
  },
  about: {
    eyebrow: 'Get to know me',
    greeting: 'Hi, I’m Ken.',
    motto: 'Creative Thinking. Strategic Execution. Reliable Support.',
    body: 'I’m a Social Media Manager and Content Specialist helping businesses turn ideas into content that connects, engages, and builds a consistent online presence. I work across social media, content, and podcasts, combining strategy, creative design, video editing, and content management to take projects from idea to execution.',
    signature: 'Social Media • Content • Podcasts',
    photo: { image: '', label: 'About portrait' } as VAImage,
    numbersTitle: 'Small Brands. Bigger Opportunities.',
    numbers: [
      { value: '4+', label: 'Platforms', detail: 'Facebook · Instagram · TikTok · YouTube' },
      { value: '4+', label: 'Years', detail: 'Professional Experience' },
      { value: '100+', label: 'Posts', detail: 'Created & Managed' },
      { value: '5+', label: 'Clients', detail: 'Across Different Projects' },
      { value: '30+', label: 'Videos', detail: 'Edited & Published' },
      { value: '30+', label: 'Podcasts', detail: 'Produced & Edited' },
    ],
  },
  whatIDo: {
    eyebrow: 'Your Content Partner',
    title: 'What I Do',
    closing: 'Turning ideas into impact',
    items: [
      { title: 'Social Media Management', description: 'Strategy, content, and consistent posting.' },
      { title: 'Podcast Production', description: 'Editing, clips, and show assets.' },
      { title: 'Content Strategy & Planning', description: 'Ideas that align with your goals.' },
      { title: 'Content Writing & Captions', description: 'Clear, engaging, and on-brand.' },
      { title: 'Graphic Design & Canva', description: 'Scroll-stopping visuals for your brand.' },
      { title: 'Scheduling & Publishing', description: 'So you can focus on your business.' },
      { title: 'Short-form Video Editing', description: 'Reels, TikToks, and engaging clips.' },
      { title: 'AI Tools & Workflow Optimization', description: 'Smarter systems for better results.' },
    ],
  },
  tools: {
    title: 'Tools I Use',
    description:
      'A curated collection of tools and platforms that power my workflow and help me deliver high-quality work.',
    groups: [
      { title: 'Content Creation', tools: ['CapCut Pro', 'OpusClip', 'Canva', 'Riverside.fm'] },
      { title: 'AI & Content Strategy', tools: ['ChatGPT', 'Claude', 'ElevenLabs', 'Gemini AI'] },
      { title: 'Social Media Management', tools: ['Meta Business', 'Buffer', 'Metricool', 'Notion'] },
      { title: 'Workflow & Collaboration', tools: ['Google Drive', 'Google Suite', 'Asana', 'Trello'] },
    ] as { title: string; tools: ToolName[] }[],
  },
  services: {
    eyebrow: 'My Services',
    // Mascot illustrations (public/va/services) come from the Canva creative portfolio.
    title: 'Creative Support for Bigger Results',
    description: 'From editing to strategy, I help businesses turn ideas into impactful content.',
    items: [
      {
        title: 'Podcast & Video',
        tagline: 'Turn Conversations into Opportunities',
        items: ['Podcast Editing', 'Video Editing', 'Short-Form Content'],
        path: '/va/podcast-editing',
        image: '/va/services/podcast.png',
      },
      {
        title: 'Social Media',
        tagline: 'Create. Connect. Convert.',
        items: ['Content Management', 'Caption Writing', 'Hashtag Research'],
        path: '/va/social-media-content',
        image: '/va/services/social.png',
      },
      {
        title: 'Design & Branding',
        tagline: 'Ideas into Visuals',
        items: ['Brand Kit Design', 'Graphic Design', 'Thumbnail & Visuals'],
        path: '/va/design-branding',
        image: '/va/services/design.png',
      },
      {
        title: 'Content & Strategy',
        tagline: 'Clear Plan, Better Results',
        items: ['Engaging Stories', 'Social Media Audit', 'Content Strategy', 'Recommendations'],
        image: '/va/services/strategy.png',
      },
      {
        title: 'Report & Analytics',
        tagline: 'Track Record. Grow.',
        items: ['Monthly Report', 'Performance Insights', 'Growth Opportunities'],
        image: '/va/services/report.png',
      },
    ] as { title: string; tagline: string; items: string[]; image: string; path?: string }[],
  },
  featured: {
    title: 'Featured Projects',
    tagline: 'Crafted with strategy, built with purpose.',
    // Real samples shown inside the "Selected work" cards on the home page.
    // Swap any path for another file in public/va/work/ to change a preview.
    previews: {
      design: [
        { image: '/va/work/design/brand-kit-1.jpg', label: 'JJJ Tax and Accounting brand kit' },
        { image: '/va/work/design/accounting-7.jpg', label: 'JJJ Tax and Accounting Q4 graphic' },
        { image: '/va/work/design/food-3.jpg', label: 'Bun Riot combo poster' },
      ],
      podcast: {
        teaser: { image: '/va/work/podcast/intro-teaser.jpg', video: '/va/work/podcast/intro-teaser.mp4', label: 'intro teaser clip' },
        clip: { image: '/va/work/podcast/ai-clip-1.jpg', video: '/va/work/podcast/ai-clip-1.mp4', label: 'short-form podcast clip' },
      },
      social: [
        { image: '/va/work/social/post-kr.jpg', label: 'KR Digital Solutions post' },
        { image: '/va/work/social/post-yuki.jpg', label: 'Yuki Plays post' },
      ],
    },
    groups: [
      {
        title: 'Design & Branding',
        path: '/va/design-branding',
        items: [
          { image: '/va/work/design/brand-kit-1.jpg', label: 'Brand Kit' },
          { image: '/va/work/design/promo-2.jpg', label: 'Graphic Design' },
          { image: '/va/work/design/content-visual-4.jpg', label: 'Content Visuals' },
        ] as VAImage[],
      },
      {
        title: 'Podcast Editing',
        path: '/va/podcast-editing',
        items: [
          { image: '/va/work/podcast/thumbnail.jpg', label: 'Podcast Thumbnail' },
          { image: '/va/work/podcast/intro-teaser.jpg', label: 'Intro Teaser' },
        ] as VAImage[],
      },
      {
        title: 'Social Media Content',
        path: '/va/social-media-content',
        items: [
          { image: '/va/work/social/post-jjj.jpg', label: 'Caption Writing' },
          { image: '/va/work/social/content-calendar.jpg', label: 'Content Management and Caption Research' },
        ] as VAImage[],
      },
    ],
  },
  closing: {
    eyebrow: 'Good Content Creates Opportunities',
    title: 'Let’s Build Something Amazing Together',
  },
}

// Client onboarding timeline, shown on the home page and the package pages.
export const vaOnboarding = {
  eyebrow: 'How we work',
  title: 'From first message to your first posts',
  description: 'What happens after you reach out, and roughly how long each step takes.',
  steps: [
    { time: 'Day 0', title: 'Inquiry', text: 'Send a message through the contact form. I reply within 24 hours.' },
    { time: 'Days 1–2', title: 'Free discovery call', text: 'A free 30-minute call about your brand, goals, platforms and audience.' },
    { time: 'Days 2–3', title: 'Proposal and package', text: 'I recommend a package, then we confirm the scope, price and terms.' },
    { time: 'Days 3–5', title: 'Onboarding kit', text: 'You share your brand assets, access and a short questionnaire. I set up our shared folder and content calendar.' },
    { time: 'Week 2', title: 'First draft and approval', text: 'Your first batch of posts, graphics or edits comes to you for feedback. Revision rounds depend on your package.' },
    { time: 'Week 2 onward', title: 'Launch and monthly rhythm', text: 'Content goes live on schedule, with a monthly recap and a planning check-in.' },
  ],
  cta: 'Book a discovery call',
}

// Client testimonials as shown on the creative portfolio.
export const vaTestimonials = [
  {
    id: 'jeffrey-james',
    name: 'Jeffrey James',
    role: 'Business Owner, Founder of JJJ Accounting and Tax Services',
    rating: 5,
    quote:
      'Ken showed initiative in proposing content series, improving layout clarity, and aligning designs with the brand’s tone. With continued focus on optimizing text density and expanding into short-form video content, their work reflects a high level of professionalism and growth as an SMM. He maintained consistent brand visuals and messaging across Facebook and Instagram, using clear calls to action that encouraged inquiries. The posts balanced education and engagement, making complex topics easier for small business owners to understand. Job well done, Ken.',
  },
  {
    id: 'bethany',
    name: 'Bethany',
    role: 'Business Owner',
    rating: 4.5,
    quote:
      'Ken was absolutely amazing to work with. He is incredibly professional, kind, and clearly takes so much pride in his work. From start to finish, everything was handled with care, precision, and attention to detail. His expertise and calm presence made the entire experience seamless, and the quality of his work truly exceeded our expectations. We are beyond thankful for everything he did and would highly recommend him to anyone looking for someone they can trust to do an outstanding job. Thank you, Ken. We are so grateful.',
  },
]

export type SamplePost = { account: string; caption: string; image?: string }

export const samplePosts: SamplePost[] = [
  {
    account: 'JJJ Tax Services',
    image: '/va/work/social/post-jjj.jpg',
    caption:
      'Why did you start your business? ❤️🚀 Paperwork and tax deadlines can drain your time and energy. This Love Month, let JJJ Accounting Services handle compliance so you can focus on growing your business and doing what you love. Happy Friday and Happy Valentine’s Day in advance! 🌹✨ Ready to bring the spark back? Let’s talk. 📩 #JJJAccountingServices #LoveYourBusiness #EntrepreneurLife #TaxSupport #BusinessGrowth #FridayVibes',
  },
  {
    account: 'Yuki Plays',
    image: '/va/work/social/post-yuki.jpg',
    caption:
      'Are you ready? ⚔️🔥 The fight begins now. We’re diving into Valheim tonight. Build, survive, and conquer together. Going live at 8PM PH time. Join the fun on Discord. See you in Valhalla. 🎮✨ #Valheim #GamingNight #LiveStreamPH #GamerLife #DiscordGaming #FridayGameNight',
  },
  {
    account: 'KR Digital Solutions',
    image: '/va/work/social/post-kr.jpg',
    caption:
      'Innovation is what sets leaders apart. 💡🚀 True growth doesn’t come from following trends. It comes from building smarter systems, creating better solutions, and making forward-thinking decisions. At KR Digital Solutions, we help brands move ahead with purpose and strategy. Lead with innovation. Grow with confidence. ✨📈 #KRDigitalSolutions #InnovationDriven #LeadershipMindset #DigitalSolutions #BusinessGrowth #StartupThinking',
  },
  {
    account: 'Husay Coaching Co.',
    image: '/va/work/social/post-husay.jpg',
    caption:
      'Clarity before confidence. ✨ Progress does not start with motivation. It starts with direction. When you understand where you are going, confidence follows naturally. In Podcast Episode 2, we talk about how clarity creates momentum and why knowing your next step matters more than having everything figured out. Listen, reflect, and move forward with purpose. 🎧🤍 #PodcastEpisode #ClarityBeforeConfidence #PurposeDriven #MindsetGrowth #PersonalDevelopment #CoachingJourney',
  },
]

export const designBranding = {
  meta: {
    title: 'Design & Branding | Ken Romero',
    description: 'Brand kits, graphic design, and content visuals by Ken Romero.',
  },
  title: 'Design & Branding',
  tagline: 'Crafted with strategy, built with purpose.',
  intro:
    'Creating cohesive visuals that make your brand look professional, recognizable, and ready to connect with your audience.',
  sections: [
    {
      title: 'Brand Kit',
      detail: 'Colors • Typography • Visual Direction',
      galleries: [{ title: '', items: [1, 2, 3, 4].map((n) => ({ image: `/va/work/design/brand-kit-${n}.jpg`, label: `Brand Kit ${n}` })) }],
    },
    {
      title: 'Graphic Design',
      detail: 'Social Posts • Carousels • Promotional Graphics',
      galleries: [
        {
          title: 'Accounting Firm Graphics',
          items: [4, 5, 6, 7, 8, 9, 1, 2, 3].map((n) => ({ image: `/va/work/design/accounting-${n}.jpg`, label: `Accounting firm graphic ${n}` })),
        },
        { title: 'Business Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/business-${n}.jpg`, label: `Business graphic ${n}` })) },
        { title: 'Book and Podcast Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/book-podcast-${n}.jpg`, label: `Book and podcast graphic ${n}` })) },
        { title: 'Game Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/game-${n}.jpg`, label: `Game graphic ${n}` })) },
        { title: 'Promotional Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/promo-${n}.jpg`, label: `Promotional graphic ${n}` })) },
        {
          title: 'Food Graphics',
          showcase: true,
          items: [
            { image: '/va/work/design/food-1.jpg', brand: 'Bun Riot', label: 'Build Your Own' },
            { image: '/va/work/design/food-2.jpg', brand: 'Bun Riot', label: 'Triple Threat' },
            { image: '/va/work/design/food-3.jpg', brand: 'Bun Riot', label: 'Riot Combo' },
            { image: '/va/work/design/food-8.jpg', brand: 'Bun Riot', label: 'Weekend Burger Deal' },
            { image: '/va/work/design/food-4.jpg', brand: 'Kape at Kuwento', label: 'Brown Sugar Latte' },
            { image: '/va/work/design/food-5.jpg', brand: 'Kape at Kuwento', label: 'Matcha Latte' },
            { image: '/va/work/design/food-6.jpg', brand: 'Kape at Kuwento', label: 'Hojicha Latte' },
            { image: '/va/work/design/food-7.jpg', brand: 'Kape at Kuwento', label: 'Strawberry Matcha' },
          ],
        },
      ],
    },
    {
      title: 'Content Visuals',
      detail: 'Stories • Thumbnails • Branded Content',
      galleries: [{ title: '', items: [1, 2, 3, 4].map((n) => ({ image: `/va/work/design/content-visual-${n}.jpg`, label: `Content visual ${n}` })) }],
    },
  ] as { title: string; detail: string; galleries: { title: string; items: VAImage[]; showcase?: boolean }[] }[],
  cta: {
    eyebrow: 'Your brand has the vision.',
    title: 'Let’s Make It Worth Remembering.',
    description: 'Your brand deserves visuals that are consistent, professional, and built to connect.',
    button: 'Let’s Build Your Brand',
    path: '/va#contact',
    points: ['Strategic Design', 'Consistent Branding', 'Made to Connect'],
  },
}

export const socialMedia = {
  meta: {
    title: 'Social Media Content | Ken Romero',
    description: 'Content planning, caption writing, hashtag research, and publishing strategy by Ken Romero.',
  },
  title: 'Social Media Content',
  tagline: 'Crafted with strategy, built with purpose.',
  intro: 'Strategic content, consistent execution, and research-driven growth.',
  planning: {
    title: 'Content Planning & Management',
    subtitle: 'Content Calendar',
    description:
      'I organize content schedules, coordinate publishing, and keep social media activity consistent across platforms.',
    image: { image: '/va/work/social/content-calendar.jpg', label: 'Content calendar' } as VAImage,
    organizeTitle: 'How I Organize Content',
    organize: ['Content Pillar', 'Content Status', 'Design and Description', 'Design Type'],
  },
  research: {
    title: 'Caption Bank & Content Research',
    subtitle: 'Plus Hashtag Research',
    description:
      'I develop organized caption banks and research relevant topics, hooks, and messaging angles to keep content engaging and purposeful.',
    hooksTitle: 'Hook Development',
    hooksNote: 'Scroll-stopping hooks built around the strongest insight from each clip.',
    hooks: [
      {
        hook: 'AI Saved Her Evenings.',
        body: 'Dr. Emily stopped taking chart notes home every night after integrating AI into her workflow. Now her documentation gets done in real time while still improving patient care. More efficiency. Less burnout. Better outcomes. 🚀 That’s what smart AI adoption actually looks like.',
        tags: '#789Podcast #HealthcareFounder #Telemedicine #AIForBusiness #WomenInBusiness #ScalingUp #Entrepreneur #BusinessPodcast',
      },
      {
        hook: 'She Scaled During Chaos.',
        body: 'Most healthcare practices were trying to survive. Dr. Emily scaled from 1 provider and 1 staff to 3 providers and 8 staff in just a few years. Technology didn’t replace the human side of the business. It amplified it. 🚀',
        tags: '#789Podcast #WomenInBusiness #HealthcareFounder #ScalingUp #BusinessGrowth #Entrepreneur #BusinessPodcast #KMGrowth',
      },
      {
        hook: 'She Built Across 17 States.',
        body: 'Dr. Emily built a healthcare business that reaches patients across 17 states through telemedicine and field clinics. Instead of making patients travel… she brought healthcare closer to them. 🌎 The future belongs to businesses that remove friction and improve accessibility.',
        tags: '#789Podcast #Telemedicine #HealthcareFounder #WomenInBusiness #BusinessGrowth #ScalingUp #Entrepreneur #KMGrowth',
      },
    ],
    hashtagTitle: 'Hashtag Research',
    hashtags:
      '#789Podcast #FounderStory #WomenInBusiness #Telemedicine #HealthcareFounder #ScalingUp #Entrepreneur #Audiologist #KMGrowth #BusinessPodcast #ServiceBusiness #Alaska',
    platformReady: 'One conversation → multiple platform-ready messages',
  },
  publishing: {
    title: 'Content Publishing and Strategy',
    description:
      'I organize content around platform behavior, audience engagement, and a consistent publishing rhythm to make every piece of content work harder.',
    distributionImage: { image: '/va/work/social/caption-bank.jpg', label: 'Caption bank & content research' } as VAImage,
    platforms: [
      { name: 'YouTube', role: 'Long-form authority', detail: 'Full podcast episodes and Shorts.' },
      { name: 'Instagram', role: 'Reach & engagement', detail: 'Reels and visual content designed for discovery.' },
      { name: 'Facebook', role: 'Community & reach', detail: 'Reels and repurposed content for broader audiences.' },
      { name: 'LinkedIn', role: 'Business positioning', detail: 'Founder insights, business lessons, and professional content.' },
      { name: 'TikTok', role: 'Discovery & short-form reach', detail: 'Short, high-retention clips.' },
    ],
    postingTools: ['Meta Business Suite', 'Buffer'],
  },
  captionsTitle: 'Captions Idea',
  cta: {
    eyebrow: 'Your content has potential.',
    title: 'Let’s Make It Work Harder.',
    description:
      'From content planning to publishing, I turn your ideas into consistent, platform-ready content built to reach and engage your audience.',
    button: 'Let’s Grow Your Content',
    path: '/va#contact',
    points: ['Plan', 'Create', 'Publish', 'Optimize'],
  },
}

/**
 * JJJ Tax & Accounting, October 2026 campaign. Copied from Ken's Notion
 * content calendar (post titles, dates, pillar, format, platforms, status
 * only; scripts, captions and internal notes stay in Notion).
 */
export type JJJPillar = 'tax' | 'books' | 'myths' | 'trust'
export type JJJPost = {
  date: string
  title: string
  pillar: JJJPillar
  format: 'Static' | 'Reel' | 'Carousel'
  status: 'Scheduled' | 'For Review' | 'Idea'
}

export const jjjCalendar = {
  eyebrow: 'Case study · JJJ Tax & Accounting',
  title: 'October 2026 Content Calendar',
  description:
    'A month of educational posts for an accounting firm, planned in Notion: every post tagged by content pillar, format, platform, and production status.',
  platforms: ['Facebook', 'Instagram', 'TikTok'],
  pillars: [
    { id: 'tax', name: 'Tax & Compliance' },
    { id: 'books', name: 'Bookkeeping & Business Finance' },
    { id: 'myths', name: 'FAQs, Myths & Mistakes' },
    { id: 'trust', name: 'Services, Process & Trust' },
  ] as { id: JJJPillar; name: string }[],
  statuses: ['Scheduled', 'For Review', 'Idea'] as JJJPost['status'][],
  // Monday of each week shown, Monday to Friday.
  weeks: ['2026-09-28', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26'],
  posts: [
    { date: '2026-09-30', title: 'Q4 Is Here', pillar: 'books', format: 'Static', status: 'Scheduled' },
    { date: '2026-10-02', title: 'Your Business Is Growing. Your Accounting Should Keep Up.', pillar: 'books', format: 'Static', status: 'Scheduled' },
    { date: '2026-10-05', title: 'Teachers’ Day', pillar: 'trust', format: 'Static', status: 'Scheduled' },
    { date: '2026-10-06', title: 'Before You File, Let JJJ Handle the Details', pillar: 'tax', format: 'Static', status: 'Scheduled' },
    { date: '2026-10-07', title: 'Your Books Shouldn’t Be a Mystery', pillar: 'books', format: 'Static', status: 'Scheduled' },
    { date: '2026-10-09', title: 'Revenue Is Not the Same as Profit', pillar: 'books', format: 'Reel', status: 'Scheduled' },
    { date: '2026-10-12', title: 'More Than Numbers. Business Support.', pillar: 'books', format: 'Static', status: 'Idea' },
    { date: '2026-10-14', title: 'When Your Numbers Start Getting Complicated', pillar: 'books', format: 'Static', status: 'For Review' },
    { date: '2026-10-16', title: 'When Your Accountant Asks for the Receipts', pillar: 'books', format: 'Reel', status: 'Idea' },
    { date: '2026-10-19', title: 'Growing Business? Get the Right Financial Support.', pillar: 'tax', format: 'Static', status: 'Idea' },
    { date: '2026-10-21', title: 'Trust Starts Behind the Scenes', pillar: 'trust', format: 'Static', status: 'Idea' },
    { date: '2026-10-23', title: 'What JJJ Can Actually Help With', pillar: 'trust', format: 'Reel', status: 'Idea' },
    { date: '2026-10-26', title: 'Your Business Needs More Than Tax Filing', pillar: 'myths', format: 'Static', status: 'Idea' },
    { date: '2026-10-27', title: 'Don’t Wait Until You Need the Documents', pillar: 'tax', format: 'Static', status: 'Idea' },
    { date: '2026-10-28', title: 'Busy Business? You Still Need Financial Clarity.', pillar: 'books', format: 'Static', status: 'Idea' },
    { date: '2026-10-30', title: 'Don’t Let the Accounting Side Haunt You', pillar: 'tax', format: 'Reel', status: 'Idea' },
  ] as JJJPost[],
  notes: [
    'Mon · Wed · Fri posting rhythm',
    'A Reel every Friday',
    'Hooks, scripts, and captions drafted per post in Notion',
  ],
}

export const podcastEditing = {
  meta: {
    title: 'Podcast Editing & Content Management | Ken Romero',
    description: 'Podcast editing, short-form clips, and podcast content management by Ken Romero.',
  },
  title: 'Podcast Editing',
  subtitle: '& Content Management',
  intro: 'From raw recordings to content that gets people watching.',
  tools: ['ChatGPT', 'Claude', 'Canva', 'Google Drive', 'Google Suite', 'Riverside.fm', 'OpusClip'] as ToolName[],
  editing: {
    title: 'Featured Projects',
    notice: {
      tag: 'Client work',
      title: 'These videos belong to my clients',
      body: 'Every episode and clip here is client property, shown only as featured work from projects I edited. Please don\u2019t download, repost or reuse them.',
    },
    items: [
      { image: '/va/work/podcast/episode-15-min.jpg', video: '/va/work/podcast/episode-15-min.mp4', label: '15 Min Episode (first minute)' },
      { image: '/va/work/podcast/intro.jpg', video: '/va/work/podcast/intro.mp4', label: 'Intro' },
      { image: '/va/work/podcast/outro.jpg', video: '/va/work/podcast/outro.mp4', label: 'Outro' },
      { image: '/va/work/podcast/intro-teaser.jpg', video: '/va/work/podcast/intro-teaser.mp4', label: 'Intro Teaser Clip' },
      { image: '/va/work/podcast/ai-clip-1.jpg', video: '/va/work/podcast/ai-clip-1.mp4', label: 'AI Generated Clip', tall: true },
      { image: '/va/work/podcast/ai-clip-2.jpg', video: '/va/work/podcast/ai-clip-2.mp4', label: 'AI Generated Clip 2', tall: true },
      { image: '/va/work/podcast/manual-clip-1.jpg', video: '/va/work/podcast/manual-clip-1.mp4', label: 'Manual Curated Clip', tall: true },
      { image: '/va/work/podcast/manual-clip-2.jpg', video: '/va/work/podcast/manual-clip-2.mp4', label: 'Manual Curated Clip 2', tall: true },
      { image: '/va/work/podcast/manual-clip-3.jpg', video: '/va/work/podcast/manual-clip-3.mp4', label: 'Manual Curated Clip 3', tall: true },
      { image: '/va/work/podcast/manual-clip-4.jpg', video: '/va/work/podcast/manual-clip-4.mp4', label: 'Manual Curated Clip 4', tall: true },
      { image: '/va/work/podcast/thumbnail.jpg', label: 'Thumbnail' },
    ] as VAImage[],
  },
  management: {
    title: 'More than editing.',
    description: 'I help turn your podcast into content that gets seen.',
    items: [
      { image: '/va/work/podcast/episode-details.jpg', label: 'Episode Details' },
      { image: '/va/work/podcast/production-calendar.jpg', label: 'Production Calendar' },
      { image: '/va/work/podcast/caption-bank.jpg', label: 'Caption Bank' },
      { image: '/va/work/podcast/posting-calendar.jpg', label: 'Posting Calendar' },
      { image: '/va/work/podcast/posting-strategy.jpg', label: 'Posting Strategy / Summary' },
    ] as VAImage[],
  },
  cta: {
    eyebrow: 'Your podcast has the content.',
    title: 'Let’s Make It Worth Watching.',
    description: 'From raw recordings to polished, engaging content that helps you grow your audience.',
    button: 'Let’s Talk About Your Podcast',
    path: '/va#contact',
    points: ['Engaging Edits', 'Audience-Focused', 'Made for Growth'],
  },
}

export type Package = {
  name: string
  price: string
  unit: string
  badge?: string
  bestFor?: string
  note?: string
  intro?: string
  features: string[]
  extra?: { title: string; items: string[] }
}

export const podcastPackages = {
  meta: {
    title: 'Podcast Editing Packages | Ken Romero',
    description: 'Podcast editing per-episode packages, monthly packages, and a podcast management retainer.',
  },
  title: 'Podcast Editing Packages',
  perEpisode: [
    {
      name: 'Starter',
      price: '$45',
      unit: '/ episode',
      intro: 'Podcast Basic Editing',
      features: [
        'Edit podcast to required length',
        'Remove filler words, dead air, and repetitive statements',
        'Improve pacing and flow',
        'Focus on key insights and audience value',
        'Final export ready for publishing',
        'Up to 3 revisions included',
        '3-5 clip recommendations with timestamps',
      ],
      note: 'Clip recommendations only. Clip editing is available as an add-on. Includes up to 60 minutes of raw podcast footage. Additional editing time may incur an extra fee.',
      extra: {
        title: 'Deliverables',
        items: [
          'Final edited podcast episode',
          'Export-ready audio/video file',
          'Improved pacing and flow',
          'Filler words, dead air, and repetitive statements removed',
          '3-5 clip recommendations with timestamps',
          'Up to 3 revisions',
          'Turnaround time: 3-5 business days',
        ],
      },
    },
    {
      name: 'Premium',
      price: '$85',
      unit: '/ episode',
      badge: 'Most Complete Package',
      intro: 'Everything included in the Starter Package, plus Content Growth & Management',
      features: [
        'Up to 90 minutes raw footage per episode',
        'Content calendar management',
        'Episode scheduling and tracking',
        'Content workflow organization',
        '3-5 optimized title suggestions',
        'Platform-ready content recommendations',
        'Episode summary',
        'Social media caption',
        'Key highlights and takeaways',
        'Hashtag recommendations',
      ],
      extra: {
        title: 'Deliverables',
        items: [
          'Final edited podcast episode',
          '3-5 edited short-form clips',
          'Episode summary',
          'Social media caption',
          '3-5 optimized title suggestions',
          'Timestamp reference sheet',
          'Publishing-ready content',
          'Up to 3 revisions',
          'Turnaround time: 2-4 business days',
        ],
      },
    },
  ] as Package[],
  premiumWhy: [
    '🎙 Professional podcast editing',
    '✂️ AI-assisted short-form clips',
    '📝 Captions and episode summaries',
    '📅 Content Management',
    '⚡ Priority turnaround',
    '🚀 Content Ready for Publishing',
  ],
  addOns: [
    {
      name: 'Content Growth & Management',
      price: '+$15',
      items: [
        'Podcast production calendar maintenance',
        'Episode scheduling and tracking',
        'Content workflow organization',
        'Episode summary',
        'Social media caption',
        'Key highlights and takeaways',
        '3-5 thumbnail/title suggestions',
        'Audience-focused title optimization',
        'YouTube and social media title recommendations',
        'Hashtag recommendations (optional)',
        'Publishing-ready content',
      ],
    },
    {
      name: 'AI-Assisted Clip Editing',
      price: '+$15 / clip',
      items: [
        '3-5 short-form clips per episode',
        'AI-generated clip selection',
        'Review all suggested clips',
        'Make minor revisions where needed',
        'Deliver final export-ready files',
      ],
    },
    {
      name: 'Manual Clip Editing',
      price: '+$20 / clip',
      items: [
        'Manually review episode content',
        'Identify high-impact moments',
        'Edit for Shorts, Reels, and TikTok',
        'Refine pacing and engagement',
        'Export-ready vertical video',
        'Human-curated clip selection',
      ],
    },
  ],
  clipDiscount: 'Manual clipping discount package: 3 Clips - $50 · 5 Clips - $75',
  monthly: [
    {
      name: 'Monthly Starter',
      price: '$135',
      unit: '/ month',
      bestFor: 'For consistent podcast editing',
      badge: 'Save $25/month',
      intro: 'Includes:',
      features: [
        'Up to 4 episodes/month',
        'Up to 60 min raw footage/episode',
        'Podcast editing',
        'Filler word/dead air removal',
        'Pacing improvements',
        'Export-ready episode',
        '3-5 clip recommendations',
        'Up to 2 revisions/episode',
        '3-5 business day turnaround',
      ],
    },
    {
      name: 'Monthly Growth',
      price: '$300',
      unit: '/ month',
      bestFor: 'For podcast + social content',
      badge: 'Most Popular · Save $40/month',
      intro: 'Everything in Monthly Starter, plus:',
      features: [
        'Up to 90 min raw footage',
        '3-5 AI-assisted clips/episode',
        'Human review',
        'Episode summary',
        'Social media caption',
        'Key highlights',
        '3-5 title suggestions',
        'Content calendar support',
        'Episode scheduling and tracking',
        'Monthly content calendar maintenance',
        'Content workflow organization',
        '2-4 business day turnaround',
      ],
    },
    {
      name: 'Monthly Done-For-You',
      price: '$500',
      unit: '/ month',
      bestFor: 'For clients who want content handled',
      intro: 'Everything in Growth, plus:',
      features: [
        'Publishing-ready content',
        'Content organization',
        'Platform-specific recommendations',
        'Thumbnail/title suggestions',
        'Publishing coordination',
        'Priority turnaround',
        'Up to 3 revisions/episode',
        'Content workflow management',
        '3-5 optimized clips/episode',
      ],
    },
  ] as Package[],
  monthlyReminders: [
    'Up to 4 episodes/month.',
    'Pricing applies to the selected package.',
    'Raw footage limits apply per episode.',
    'AI-assisted clips include human review.',
    'Manual clip editing is available as an add-on.',
    'Additional episodes or custom requests are quoted separately.',
    'Client must provide the necessary platform access and permissions for scheduling and publishing.',
  ],
  retainer: {
    name: 'Podcast Management Retainer',
    price: '$800',
    unit: '/ month',
    perfectFor: ['Business podcasts', 'Personal brand podcasts', 'Coaches and consultants', 'Teams that need production support'],
    why: [
      'Focus on recording, not administration',
      'Never miss an episode deadline',
      'Streamlined guest communication',
      'Organized production workflow',
      'Consistent publishing schedule',
    ],
    commitment: [
      'Dedicated part-time podcast management',
      'Regular daily support based on production priorities and deadlines',
      'Monday to Friday during business hours',
    ],
    includes: [
      { title: 'Production', items: ['Episode editing', 'Quality control', 'Production calendar', 'Episode tracking'] },
      { title: 'Guest Management', items: ['Guest communication', 'Scheduling', 'Follow-ups', 'Coordination'] },
      { title: 'Content', items: ['Episode summaries', 'Social content', 'Content planning', 'Publishing coordination'] },
      { title: 'Management', items: ['Weekly updates', 'Priority communication', 'Workflow management'] },
    ],
    deliverables: [
      'Up to 4 podcast episodes per month',
      'Production calendar management',
      'Guest coordination support',
      'Publishing workflow management',
      'Content organization and tracking',
      'End-to-end podcast production support',
    ],
    outOfScope: [
      'Unlimited revisions',
      'Guest sourcing/outreach',
      'Paid advertising',
      'Community management',
      'Graphic design projects',
      'Website management',
    ],
    note: 'This is a part-time monthly retainer that provides ongoing podcast management and production support during business hours. Work is prioritized based on production schedules, deadlines, and active projects. Additional episodes and custom requests are billed separately.',
  },
  custom: 'Need a custom package? Contact me for a tailored solution.',
}

type Currency = 'usd' | 'php'

const smmFeatures = (reels: { growth: number; full: number }) => [
  [
    '1 Social Media Platform',
    '6 Static / Carousel Posts per Month',
    '2 Short-form Videos / Reels per Month',
    'Captions for All Content',
    'Basic Hashtag Research',
    'Monthly Content Calendar',
    'Scheduling & Publishing',
    'Up to 2 Revision Rounds',
    'Basic Monthly Performance Summary',
  ],
  [
    'Up to 2 Social Media Platforms',
    '8 Static / Carousel Posts per Month',
    `${reels.growth} Short-form Videos / Reels per Month`,
    'Captions for All Content',
    'Hashtag & Keyword Research',
    'Monthly Content Planning & Calendar',
    'Scheduling & Publishing',
    'Content Repurposing',
    'Basic Community Management',
    'Monthly Analytics Report',
    'Up to 2 Revision Rounds',
  ],
  [
    'Up to 3 Social Media Platforms',
    '10 Static / Carousel Posts per Month',
    `${reels.full} Short-form Videos / Reels per Month`,
    'Captions for All Content',
    'In-depth Hashtag & Keyword Research',
    'Monthly Content Strategy',
    'Content Calendar',
    'Scheduling & Publishing',
    'Content Repurposing',
    'Basic Community Management',
    'Engagement Monitoring',
    'Monthly Analytics Report',
    'Monthly Strategy Review',
    'Up to 2 Revision Rounds',
  ],
]

const smmTiers = [
  {
    name: 'Starter Package',
    tagline: 'Keep Your Content Consistent',
    bestFor: 'Small businesses that already have an established social presence but need consistent, professional content.',
  },
  {
    name: 'Growth Package',
    tagline: 'Build a stronger online presence.',
    bestFor: 'Businesses that want consistent content across multiple platforms and need support in managing their content workflow.',
  },
  {
    name: 'Full SMM Package',
    tagline: 'A Complete Social Media Partner',
    bestFor: 'Businesses that want end-to-end social media management and ongoing support to grow their brand and online presence.',
  },
]

const smmPrices: Record<Currency, { packages: string[]; unit: string; addOns: string[] }> = {
  usd: {
    packages: ['$450', '$700', '$950'],
    unit: 'USD / month',
    addOns: ['$20 / piece', '$30 / reel', '$35 / round', '$100 / month', '$50 / design', '+$30 / piece'],
  },
  php: {
    packages: ['₱10,000', '₱15,000', '₱18,000'],
    unit: '/ month',
    addOns: ['₱500 / piece', '₱800 / reel', '₱1,000 / round', '₱2,000 / month', '₱800 / design', '+₱350 / piece'],
  },
}

const smmAddOns = [
  { name: 'Additional Static / Carousel Post', description: 'Need more posts? Add extra static or carousel content to your plan.' },
  { name: 'Additional Short-form Reel', description: 'Create more engaging short-form videos to reach a wider audience.' },
  { name: 'Additional Revision Round', description: 'Need more changes? Add an extra round of revisions.' },
  { name: 'Additional Platform', description: 'Expand your reach! Add another social media platform to your package.' },
  { name: 'Custom Graphic Design', description: 'Need a special graphic? Get a custom design for promotions, announcements or other special content.' },
  { name: 'Rush Content', description: 'Need it sooner? Get your content fast with our rush service.' },
]

export function getSmmPackages(currency: Currency) {
  const features = smmFeatures(currency === 'usd' ? { growth: 4, full: 6 } : { growth: 3, full: 5 })
  const prices = smmPrices[currency]
  return {
    packages: smmTiers.map((tier, index) => ({
      ...tier,
      price: prices.packages[index],
      unit: prices.unit,
      features: features[index],
    })),
    addOns: smmAddOns.map((addOn, index) => ({ ...addOn, price: prices.addOns[index] })),
  }
}

export const smmPackages = {
  meta: {
    title: 'Social Media Management Packages | Ken Romero',
    description: 'Social media management packages, add-ons, and terms.',
  },
  title: 'Social Media Management Packages',
  tagline: 'Consistent Content, Real Results',
  pillars: ['Strategy', 'Content', 'Design', 'Management', 'Results'],
  addOnNotes: [
    'Add-ons are available upon request and are subject to availability.',
    'Additional work outside the agreed package scope will be quoted separately.',
    'Reels are created using client-provided footage/assets.',
  ],
  notes: [
    {
      title: 'Content & Assets',
      items: [
        'Client provides required photos, videos, logos, brand assets, and other necessary materials.',
        'Reels are created using client-provided footage/assets.',
        'Original photography, videography, or on-site content production is not included.',
      ],
    },
    {
      title: 'Revisions',
      items: [
        'Each package includes 1 consolidated revision round per monthly content batch.',
        'Additional revision rounds are available as an add-on.',
        'Major changes outside the original brief may be quoted separately.',
      ],
    },
    {
      title: 'Content & Scheduling',
      items: [
        'Content is created based on the agreed content strategy and monthly calendar.',
        'Client approval is required before content is published.',
        'Posting schedules may be adjusted based on platform requirements and content availability.',
      ],
    },
    {
      title: 'Scope',
      items: [
        'Package limits apply to the number of platforms and content pieces listed.',
        'Additional content, platforms, rush requests, or services outside the package are charged separately.',
        'Paid advertising management, influencer management, and extensive DM sales support are not included unless agreed separately.',
      ],
    },
    {
      title: 'Turnaround',
      items: [
        'Content must be approved and required assets provided within the agreed timeline.',
        'Delays in receiving feedback or materials may affect the publishing schedule.',
      ],
    },
  ],
  thanks: 'This helps us work together more efficiently and create the best results for your brand.',
}
