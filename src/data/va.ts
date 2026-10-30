// Content for the /va (virtual assistant / creative) portfolio.
// Source: Canva site "Ken Romero - Creative Portfolio v.1.3".
//
// Image paths point into /public/va (work samples in /public/va/work, cropped
// from the Canva creative portfolio). Leave `image` empty to show a labelled
// placeholder until the real asset is added.

import { vaPath } from '../vaPath'

/**
 * A work sample. `image` is the still (or video poster); `video` is an MP4 in
 * public/va/work that plays in place of the still once added. `tall` marks a
 * vertical (9:16) sample such as a short-form clip. `brand` names the client
 * a sample was made for (shown in the animated food showcase).
 */
export type VAImage = { image?: string; video?: string; label: string; tall?: boolean; brand?: string; long?: boolean }

export const vaLinks = {
  instagram: { label: '@kenromero.goesdigital_', href: 'https://www.instagram.com/kenromero.goesdigital_/' },
  tiktok: { label: '@kenromero.goesdigital_', href: 'https://www.tiktok.com/@kenromero.goesdigital_' },
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
    // The big promise under the name: what a client gets, in one line.
    promise: 'Content that keeps your brand showing up, every week.',
    roles: ['Podcast Editor', 'Graphic Designer', 'Social Media Manager'],
    tagline: 'Built on Process, Driven by Results',
    // A line from a real testimonial (vaTestimonials), shown under the hero buttons.
    proof: {
      quote: '…clear calls to action that encouraged inquiries.',
      name: 'Jeffrey James',
      org: 'JJJ Accounting and Tax Services',
    },
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
        path: vaPath('/va/podcast-editing'),
        image: '/va/services/podcast.webp',
      },
      {
        title: 'Social Media',
        tagline: 'Create. Connect. Convert.',
        items: ['Content Management', 'Caption Writing', 'Hashtag Research'],
        path: vaPath('/va/social-media-content'),
        image: '/va/services/social.webp',
      },
      {
        title: 'Design & Branding',
        tagline: 'Ideas into Visuals',
        items: ['Brand Kit Design', 'Graphic Design', 'Thumbnail & Visuals'],
        path: vaPath('/va/design-branding'),
        image: '/va/services/design.webp',
      },
      {
        title: 'Content & Strategy',
        tagline: 'Clear Plan, Better Results',
        items: ['Engaging Stories', 'Social Media Audit', 'Content Strategy', 'Recommendations'],
        image: '/va/services/strategy.webp',
      },
      {
        title: 'Report & Analytics',
        tagline: 'Track Record. Grow.',
        items: ['Monthly Report', 'Performance Insights', 'Growth Opportunities'],
        image: '/va/services/report.webp',
      },
    ] as { title: string; tagline: string; items: string[]; image: string; path?: string }[],
  },
  featured: {
    title: 'Featured Projects',
    tagline: 'Graphics, episodes and live posts I’ve made.',
    // Real samples shown inside the "Selected work" cards on the home page.
    // Swap any path for another file in public/va/work/ to change a preview.
    previews: {
      design: [
        { image: '/va/work/design/brand-kit-1.webp', label: 'JJJ Tax and Accounting brand kit' },
        { image: '/va/work/design/accounting-7.webp', label: 'JJJ Tax and Accounting Q4 graphic' },
        { image: '/va/work/design/food-3.webp', label: 'Bun Riot combo poster' },
      ],
      podcast: {
        teaser: { image: '/va/work/podcast/intro-teaser.webp', video: '/va/work/podcast/intro-teaser.mp4', label: 'intro teaser clip' },
        clip: { image: '/va/work/podcast/ai-clip-1.webp', video: '/va/work/podcast/ai-clip-1.mp4', label: 'short-form podcast clip' },
      },
      social: [
        { image: '/va/work/social/post-kr.webp', label: 'KR Digital Solutions post' },
        { image: '/va/work/social/post-yuki.webp', label: 'Yuki Plays post' },
      ],
    },
    groups: [
      {
        title: 'Design & Branding',
        path: vaPath('/va/design-branding'),
        items: [
          { image: '/va/work/design/brand-kit-1.webp', label: 'Brand Kit' },
          { image: '/va/work/design/promo-2.webp', label: 'Graphic Design' },
          { image: '/va/work/design/content-visual-4.webp', label: 'Content Visuals' },
        ] as VAImage[],
      },
      {
        title: 'Podcast Editing',
        path: vaPath('/va/podcast-editing'),
        items: [
          { image: '/va/work/podcast/thumbnail.webp', label: 'Podcast Thumbnail' },
          { image: '/va/work/podcast/intro-teaser.webp', label: 'Intro Teaser' },
        ] as VAImage[],
      },
      {
        title: 'Social Media Content',
        path: vaPath('/va/social-media-content'),
        items: [
          { image: '/va/work/social/post-jjj.webp', label: 'Caption Writing' },
          { image: '/va/work/social/content-calendar.webp', label: 'Content Management and Caption Research' },
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
    highlight: 'The posts balanced education and engagement, making complex topics easier for small business owners to understand.',
    quote:
      'Ken showed initiative in proposing content series, improving layout clarity, and aligning designs with the brand’s tone. With continued focus on optimizing text density and expanding into short-form video content, their work reflects a high level of professionalism and growth as an SMM. He maintained consistent brand visuals and messaging across Facebook and Instagram, using clear calls to action that encouraged inquiries. The posts balanced education and engagement, making complex topics easier for small business owners to understand. Job well done, Ken.',
  },
  {
    id: 'bethany',
    name: 'Bethany',
    role: 'Business Owner',
    rating: 4.5,
    highlight: 'The quality of his work truly exceeded our expectations.',
    quote:
      'Ken was absolutely amazing to work with. He is incredibly professional, kind, and clearly takes so much pride in his work. From start to finish, everything was handled with care, precision, and attention to detail. His expertise and calm presence made the entire experience seamless, and the quality of his work truly exceeded our expectations. We are beyond thankful for everything he did and would highly recommend him to anyone looking for someone they can trust to do an outstanding job. Thank you, Ken. We are so grateful.',
  },
]

// Featured client story on the home page. Every fact here comes from JJJ work already on this site.
export const jjjStory = {
  client: 'JJJ Tax & Accounting',
  title: 'Making tax talk easy to follow',
  summary:
    'An accounting firm that wanted to explain tax and bookkeeping to small business owners on Facebook and Instagram. I built the brand look, then planned, designed and wrote the posts.',
  made: [
    { label: 'Brand kit', detail: 'Colours, type and logo use' },
    { label: '9 social graphics', detail: 'Q4 reminders, bookkeeping and tax tips' },
    { label: '2 email designs', detail: 'Monthly newsletter and tax season promo' },
    { label: 'October content calendar', detail: '16 posts across 4 content pillars' },
  ],
  images: {
    kit: { image: '/va/work/design/brand-kit-1.webp', label: 'JJJ Tax and Accounting brand kit' },
    post: { image: '/va/work/design/accounting-7.webp', label: 'JJJ Tax and Accounting Q4 graphic' },
    email: { image: '/va/work/design/email-jjj-newsletter.webp', label: 'JJJ Tax and Accounting monthly newsletter' },
  },
  // An exact line from Jeffrey James's testimonial (vaTestimonials).
  quote: 'Ken showed initiative in proposing content series, improving layout clarity, and aligning designs with the brand’s tone.',
  quoteBy: 'Jeffrey James, Founder',
}

export type SamplePost = { account: string; caption: string; image?: string }

export const samplePosts: SamplePost[] = [
  {
    account: 'JJJ Tax Services',
    image: '/va/work/social/post-jjj.webp',
    caption:
      'Why did you start your business? ❤️🚀 Paperwork and tax deadlines can drain your time and energy. This Love Month, let JJJ Accounting Services handle compliance so you can focus on growing your business and doing what you love. Happy Friday and Happy Valentine’s Day in advance! 🌹✨ Ready to bring the spark back? Let’s talk. 📩 #JJJAccountingServices #LoveYourBusiness #EntrepreneurLife #TaxSupport #BusinessGrowth #FridayVibes',
  },
  {
    account: 'Yuki Plays',
    image: '/va/work/social/post-yuki.webp',
    caption:
      'Are you ready? ⚔️🔥 The fight begins now. We’re diving into Valheim tonight. Build, survive, and conquer together. Going live at 8PM PH time. Join the fun on Discord. See you in Valhalla. 🎮✨ #Valheim #GamingNight #LiveStreamPH #GamerLife #DiscordGaming #FridayGameNight',
  },
  {
    account: 'KR Digital Solutions',
    image: '/va/work/social/post-kr.webp',
    caption:
      'Innovation is what sets leaders apart. 💡🚀 True growth doesn’t come from following trends. It comes from building smarter systems, creating better solutions, and making forward-thinking decisions. At KR Digital Solutions, we help brands move ahead with purpose and strategy. Lead with innovation. Grow with confidence. ✨📈 #KRDigitalSolutions #InnovationDriven #LeadershipMindset #DigitalSolutions #BusinessGrowth #StartupThinking',
  },
  {
    account: 'Husay Coaching Co.',
    image: '/va/work/social/post-husay.webp',
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
  tagline: 'Visuals that make your brand easy to remember.',
  intro:
    'Creating cohesive visuals that make your brand look professional, recognizable, and ready to connect with your audience.',
  sections: [
    {
      title: 'Brand Kit',
      detail: 'Colors • Typography • Visual Direction',
      galleries: [{ title: '', items: [1, 2, 3, 4].map((n) => ({ image: `/va/work/design/brand-kit-${n}.webp`, label: `Brand Kit ${n}` })) }],
    },
    {
      title: 'Graphic Design',
      detail: 'Social Posts • Carousels • Promotional Graphics',
      galleries: [
        {
          title: 'Accounting Firm Graphics',
          items: [4, 5, 6, 7, 8, 9, 1, 2, 3].map((n) => ({ image: `/va/work/design/accounting-${n}.webp`, label: `Accounting firm graphic ${n}` })),
        },
        { title: 'Business Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/business-${n}.webp`, label: `Business graphic ${n}` })) },
        { title: 'Book and Podcast Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/book-podcast-${n}.webp`, label: `Book and podcast graphic ${n}` })) },
        { title: 'Game Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/game-${n}.webp`, label: `Game graphic ${n}` })) },
        { title: 'Promotional Graphics', items: [1, 2, 3].map((n) => ({ image: `/va/work/design/promo-${n}.webp`, label: `Promotional graphic ${n}` })) },
        {
          title: 'Food Graphics',
          showcase: true,
          items: [
            { image: '/va/work/design/food-1.webp', brand: 'Bun Riot', label: 'Build Your Own' },
            { image: '/va/work/design/food-2.webp', brand: 'Bun Riot', label: 'Triple Threat' },
            { image: '/va/work/design/food-3.webp', brand: 'Bun Riot', label: 'Riot Combo' },
            { image: '/va/work/design/food-8.webp', brand: 'Bun Riot', label: 'Weekend Burger Deal' },
            { image: '/va/work/design/food-4.webp', brand: 'Kape at Kuwento', label: 'Brown Sugar Latte' },
            { image: '/va/work/design/food-5.webp', brand: 'Kape at Kuwento', label: 'Matcha Latte' },
            { image: '/va/work/design/food-6.webp', brand: 'Kape at Kuwento', label: 'Hojicha Latte' },
            { image: '/va/work/design/food-7.webp', brand: 'Kape at Kuwento', label: 'Strawberry Matcha' },
          ],
        },
      ],
    },
    {
      title: 'Content Visuals',
      detail: 'Stories • Thumbnails • Branded Content',
      galleries: [{ title: '', items: [1, 2, 3, 4].map((n) => ({ image: `/va/work/design/content-visual-${n}.webp`, label: `Content visual ${n}` })) }],
    },
    {
      title: 'Email Newsletters',
      detail: 'Newsletters • Welcome Emails • Promos • Re-engagement',
      galleries: [
        {
          title: '',
          emails: true,
          items: [
            { image: '/va/work/design/email-jjj-newsletter.webp', brand: 'JJJ Tax and Accounting', label: 'Monthly newsletter' },
            { image: '/va/work/design/email-jjj-promo.webp', brand: 'JJJ Tax and Accounting', label: 'Tax season promo' },
            { image: '/va/work/design/email-kk-welcome.webp', brand: 'KK’s Skin Solutions', label: 'Welcome email' },
            { image: '/va/work/design/email-kk-launch.webp', brand: 'KK’s Skin Solutions', label: 'Product launch' },
            { image: '/va/work/design/email-kr-welcome.webp', brand: 'KR Husay', label: 'Welcome email' },
            { image: '/va/work/design/email-kr-reengage.webp', brand: 'KR Husay', label: 'We miss you' },
            { image: '/va/work/design/email-sf-welcome.webp', brand: 'SaiFit', label: 'Welcome email' },
            { image: '/va/work/design/email-sf-cart.webp', brand: 'SaiFit', label: 'Abandoned cart' },
          ].map((item) => ({ ...item, long: true })),
        },
      ],
    },
  ] as { title: string; detail: string; galleries: { title: string; items: VAImage[]; showcase?: boolean; emails?: boolean }[] }[],
  cta: {
    eyebrow: 'Your brand has the vision.',
    title: 'Let’s Make It Worth Remembering.',
    description: 'Your brand deserves visuals that are consistent, professional, and built to connect.',
    button: 'Let’s Build Your Brand',
    path: vaPath('/va#contact'),
    points: ['Strategic Design', 'Consistent Branding', 'Made to Connect'],
    samples: [
      { image: '/va/work/design/brand-kit-2.webp', label: 'Brand kit' },
      { image: '/va/work/design/accounting-7.webp', label: 'JJJ Tax and Accounting Q4 graphic' },
      { image: '/va/work/design/food-1.webp', label: 'Bun Riot burger poster' },
    ] as VAImage[],
  },
}

export const socialMedia = {
  meta: {
    title: 'Social Media Content | Ken Romero',
    description: 'Content planning, caption writing, hashtag research, and publishing strategy by Ken Romero.',
  },
  title: 'Social Media Content',
  tagline: 'Planned, written and posted on schedule.',
  intro: 'Strategic content, consistent execution, and research-driven growth.',
  planning: {
    title: 'Content Planning & Management',
    subtitle: 'Content Calendar',
    description:
      'I organize content schedules, coordinate publishing, and keep social media activity consistent across platforms.',
    image: { image: '/va/work/social/content-calendar.webp', label: 'Content calendar' } as VAImage,
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
        body: 'She stopped taking chart notes home every night after integrating AI into her workflow. Now her documentation gets done in real time while still improving patient care. More efficiency. Less burnout. Better outcomes. 🚀 That’s what smart AI adoption actually looks like.',
        tags: '#HealthcareFounder #Telemedicine #AIForBusiness #WomenInBusiness #ScalingUp #Entrepreneur #BusinessPodcast',
      },
      {
        hook: 'She Scaled During Chaos.',
        body: 'Most healthcare practices were trying to survive. She scaled from 1 provider and 1 staff to 3 providers and 8 staff in just a few years. Technology didn’t replace the human side of the business. It amplified it. 🚀',
        tags: '#WomenInBusiness #HealthcareFounder #ScalingUp #BusinessGrowth #Entrepreneur #BusinessPodcast',
      },
      {
        hook: 'She Built Across 17 States.',
        body: 'She built a healthcare business that reaches patients across 17 states through telemedicine and field clinics. Instead of making patients travel… she brought healthcare closer to them. 🌎 The future belongs to businesses that remove friction and improve accessibility.',
        tags: '#Telemedicine #HealthcareFounder #WomenInBusiness #BusinessGrowth #ScalingUp #Entrepreneur',
      },
    ],
    hashtagTitle: 'Hashtag Research',
    hashtags:
      '#FounderStory #WomenInBusiness #Telemedicine #HealthcareFounder #ScalingUp #Entrepreneur #BusinessPodcast #ServiceBusiness',
    platformReady: 'One conversation → multiple platform-ready messages',
  },
  publishing: {
    title: 'Content Publishing and Strategy',
    description:
      'I organize content around platform behavior, audience engagement, and a consistent publishing rhythm to make every piece of content work harder.',
    // Recreated from the podcast's Captions Bank tab. Guest and show names are left out.
    captionBank: {
      title: 'Caption bank',
      note: 'Every episode gets five Reels and Shorts hooks, plus its own X, LinkedIn and TikTok copy.',
      episodes: [
        {
          ep: 'Ep 01',
          topic: 'Telehealth founder',
          hooks: ['AI Saved Her Evenings.', 'Everyone Asked Her How.', 'She Scaled During Chaos.', 'AI Bought Back Her Sanity.', 'She Built Across 17 States.'],
          x: 'She had a newborn, 1 clinic, and zero roadmap. Now she’s licensed in 17 states. EP 01 is live.',
          linkedin: 'Most healthcare founders wait for perfect conditions. She didn’t have that luxury. 1. She pioneered telemedicine before it was mainstream…',
          tiktok: 'She flew to remote communities with a newborn to see patients who had no other options. Now she runs a 17-state telehealth practice.',
          tags: '#FounderStory #WomenInBusiness #Telemedicine #HealthcareFounder #ScalingUp',
        },
        {
          ep: 'Ep 02',
          topic: 'Private equity & licensing',
          hooks: ['Care Bears Became A Cash Machine.', 'Emotion Drives Revenue.', '90% Margin Business Model.', 'Warner Bros Built This Formula.', 'Creators Understand Branding.'],
          x: 'Most PE firms look at spreadsheets. He looks at feelings, and built a $500M fund doing it. EP 02 is live.',
          linkedin: 'What does a $500M private equity fund have in common with Care Bears? Emotional connection as a growth strategy.',
          tiktok: 'He manages $500M and says the best investors focus on feelings, not financials. The $369B licensing industry most founders sleep on.',
          tags: '#PrivateEquity #LicensingBusiness #BrandGrowth #InvestorMindset #BusinessStrategy',
        },
        {
          ep: 'Ep 04',
          topic: 'Growth agency founder',
          hooks: ['Most Growth Agencies Think Too Small.', 'The Companies With The Best Data Win.', 'Founders Should Obsess Over Pipeline.', 'Your Network Pulls You Out Of Down Cycles.', 'Customers Matter More Than Investors.'],
          x: 'Most founders think growth comes from marketing or funding. He says it starts inside the company.',
          linkedin: 'He spent nearly 20 years inside some of the world’s largest consumer brands before starting his own agency. His conviction: most companies look for growth in the wrong places.',
          tiktok: '20 years at the biggest consumer brands, then a decade bootstrapping a growth agency. Growth starts inside the company, not in your marketing budget.',
          tags: '#GrowthStrategy #Bootstrapping #FirstPartyData #Fortune500 #FounderStory',
        },
      ],
    },
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
    path: vaPath('/va#contact'),
    points: ['Plan', 'Create', 'Publish', 'Optimize'],
    samples: [
      { image: '/va/work/social/post-kr.webp', label: 'KR Digital Solutions post' },
      { image: '/va/work/social/post-jjj.webp', label: 'JJJ Tax and Accounting post' },
      { image: '/va/work/social/post-yuki.webp', label: 'Yuki Plays post' },
    ] as VAImage[],
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

export type PodStatus = 'Approved' | 'For review' | 'In progress' | 'Not started' | 'Revision' | 'Posted' | 'Guest approval'
export type PodPlatform = 'youtube' | 'shorts' | 'instagram' | 'facebook'

// Recreated from the client's podcast content calendar (Google Sheets) and the
// OpusClip scheduler. Guest names, the show's name and every link are left out on
// purpose: episodes are described by topic and clips by their hook.
export const podcastCalendar = {
  // Counts from the production calendar: 45 episodes on the sheet when it was shared.
  stats: [
    { value: '45', label: 'Episodes edited' },
    { value: '39', label: 'Thumbnails approved' },
    { value: '33', label: 'Reels posted in 2 weeks' },
    { value: '7', label: 'Platforms planned' },
  ],
  pipeline: [
    { step: '15-min edit', count: '40 of 45 approved' },
    { step: '20–60s clips', count: '26 episodes clipped' },
    { step: 'Thumbnail', count: '39 approved' },
    { step: 'Guest approval', count: '32 waiting' },
    { step: 'Posted', count: '7 live' },
  ],
  tracker: [
    { ep: '01', topic: 'Scaling a telehealth practice from 1 provider to 17 states', edit: 'Approved', clips: 'Approved', thumb: 'Approved', status: 'Posted' },
    { ep: '02', topic: 'Turning a nostalgic brand into a $500M private equity playbook', edit: 'Approved', clips: 'Approved', thumb: 'Approved', status: 'Posted' },
    { ep: '03', topic: 'Growing enterprise value through strategic planning', edit: 'Approved', clips: 'Not started', thumb: 'For review', status: 'Posted' },
    { ep: '04', topic: 'Bringing Fortune 500 growth playbooks to the middle market', edit: 'Approved', clips: 'Approved', thumb: 'Approved', status: 'Posted' },
    { ep: '—', topic: 'Helping founders through the $100 trillion wealth transfer', edit: 'Approved', clips: 'Approved', thumb: 'Approved', status: 'Guest approval' },
    { ep: '—', topic: 'From operator to CEO: scaling past $1M with the right team', edit: 'Approved', clips: 'Not started', thumb: 'Approved', status: 'Revision' },
    { ep: '—', topic: 'Taking a food brand from 350 to 16,000+ grocery stores', edit: 'For review', clips: 'Not started', thumb: 'For review', status: 'In progress' },
  ] as { ep: string; topic: string; edit: PodStatus; clips: PodStatus; thumb: PodStatus; status: PodStatus }[],
  // Week 1 of the posting calendar (May 25–30, 2026). Every post went out public.
  week: {
    label: 'Week 1 · May 25–30, 2026',
    days: [
      { day: 'Mon', date: 'May 25', posts: [{ type: 'Clip', ep: '01', hook: 'Scaling healthcare during chaos', time: '8:00 AM', role: 'Teaser' }] },
      {
        day: 'Tue',
        date: 'May 26',
        posts: [
          { type: 'Clip', ep: '01', hook: '17 states. One healthcare practice.', time: '8:00 AM', role: 'Promo link' },
          { type: 'Episode', ep: '01', hook: 'Full episode drop', time: '8:00 AM', role: 'Drop' },
        ],
      },
      {
        day: 'Wed',
        date: 'May 27',
        posts: [
          { type: 'Clip', ep: '01', hook: 'They were ready before everyone else', time: '8:00 AM', role: 'Recap' },
          { type: 'Clip', ep: '02', hook: 'Nostalgia became a cash machine', time: '12:00 PM', role: 'Teaser' },
        ],
      },
      {
        day: 'Thu',
        date: 'May 28',
        posts: [
          { type: 'Clip', ep: '02', hook: 'Emotional brands print royalties', time: '8:00 AM', role: 'Promo link' },
          { type: 'Episode', ep: '02', hook: 'Full episode drop', time: '8:00 AM', role: 'Drop' },
        ],
      },
      {
        day: 'Fri',
        date: 'May 29',
        posts: [
          { type: 'Clip', ep: '01', hook: 'AI bought back her sanity', time: '8:00 AM', role: 'Follow-up' },
          { type: 'Clip', ep: '02', hook: 'Low risk. High margin. Licensing.', time: '12:00 PM', role: 'Recap' },
        ],
      },
      { day: 'Sat', date: 'May 30', posts: [{ type: 'Clip', ep: '02', hook: 'Monetize the brand, not just content', time: '8:00 AM', role: 'Weekend reach' }] },
    ] as { day: string; date: string; posts: { type: 'Clip' | 'Episode'; ep: string; hook: string; time: string; role: string }[] }[],
    rule: 'Two episodes a week (Tue & Thu). Clips tease the day before, drop with a link on the day, then recap through the weekend.',
  },
  // The OpusClip calendar, May 17 – Jun 6, 2026. `more` = posts hidden behind "See more".
  opus: {
    label: 'May 17 – Jun 6, 2026',
    start: '2026-05-17',
    days: {
      '2026-05-19': { posts: [{ platform: 'youtube', time: '1:00 AM', hook: 'She built across 17 states' }] },
      '2026-05-20': { posts: [{ platform: 'youtube', time: '7:31 PM', hook: '7-figure business growth: founders’ real strategies' }] },
      '2026-05-25': {
        posts: [
          { platform: 'youtube', time: '8:00 PM', hook: 'She scaled during chaos' },
          { platform: 'instagram', time: '8:00 PM', hook: 'She scaled during chaos. Most practices were trying to survive…' },
        ],
        more: 1,
      },
      '2026-05-26': {
        posts: [
          { platform: 'facebook', time: '12:00 AM', hook: 'She scaled during chaos' },
          { platform: 'instagram', time: '8:00 PM', hook: 'She built a 17-state practice. With a newborn.' },
        ],
        more: 1,
      },
      '2026-05-27': {
        posts: [
          { platform: 'youtube', time: '8:00 PM', hook: 'Everyone asked her how' },
          { platform: 'instagram', time: '8:00 PM', hook: 'Everyone asked her how. While clinics struggled…' },
        ],
        more: 1,
      },
      '2026-05-28': {
        posts: [
          { platform: 'youtube', time: '12:00 AM', hook: 'How did one brand triple its royalties in 2 years?' },
          { platform: 'instagram', time: '12:00 AM', hook: 'Nostalgia turned into a scalable cash machine' },
        ],
        more: 3,
      },
      '2026-05-29': {
        posts: [
          { platform: 'youtube', time: '8:00 PM', hook: 'How is AI helping founders avoid burnout?' },
          { platform: 'instagram', time: '8:00 PM', hook: 'AI didn’t replace her work. It gave her time back.' },
        ],
        more: 1,
      },
      '2026-05-30': {
        posts: [
          { platform: 'youtube', time: '12:00 AM', hook: 'Why do licensing businesses earn 90–95% margins?' },
          { platform: 'instagram', time: '12:00 AM', hook: '90–95% gross margins. That’s licensing.' },
        ],
        more: 4,
      },
      '2026-05-31': { posts: [{ platform: 'facebook', time: '12:00 AM', hook: 'Why are creators scaling faster than businesses?' }] },
      '2026-06-01': {
        posts: [
          { platform: 'youtube', time: '8:00 PM', hook: 'Why do some businesses lose trust with great AI tools?' },
          { platform: 'instagram', time: '8:00 PM', hook: 'Efficiency alone won’t build loyalty.' },
        ],
        more: 4,
      },
      '2026-06-02': { posts: [{ platform: 'facebook', time: '12:00 AM', hook: 'AI alone won’t build customer trust' }] },
    } as Record<string, { posts: { platform: PodPlatform; time: string; hook: string }[]; more?: number }>,
  },
  // One episode's full package, from the Episode Details and Captions Bank tabs.
  pack: {
    label: 'Episode 03 · Strategic planning',
    deliverables: ['15-min edit', '5 clips, 20–60s', 'Thumbnail', 'YouTube description', 'Timestamped transcript', 'Caption per clip', 'SEO tags'],
    hear: [
      'Why most companies have a wish list instead of a strategic plan',
      'The hidden costs of running without a clear strategy',
      'Why every business should be built as if it’s preparing for sale',
      'How to turn a three-year vision into six-month milestones',
    ],
    hooks: [
      'AI expands your bandwidth.',
      'A 3-year vision means nothing without a 6-month plan.',
      'A strategy isn’t real until it’s measured.',
      'Your best employees don’t leave by accident.',
      'Most businesses don’t have a strategic plan.',
    ],
    caption: [
      'A 3-Year Vision Means Nothing Without a 6-Month Plan.',
      'If you know where you want your business to be in three years, where do you need to be in six months?',
      'If you can’t answer it, you don’t have a plan.',
      'You have a wish list.',
    ],
    tags: ['Strategic planning', 'Enterprise value', 'Exit planning', 'Business valuation', 'Revenue diversification', 'Leadership alignment', 'AI for business'],
  },
}

export const podcastEditing = {
  meta: {
    title: 'Podcast Editing & Content Management | Ken Romero',
    description: 'Podcast editing, short-form clips, and podcast content management by Ken Romero.',
  },
  title: 'Podcast Editing',
  subtitle: '& Content Management',
  intro: 'From raw recordings to content that gets people watching.',
  editing: {
    title: 'Featured Projects',
    notice: {
      tag: 'Client work',
      title: 'This work belongs to my clients',
      body: 'Every episode, clip and thumbnail here is client property, shared with permission as featured work from projects I edited. The people shown are my clients and their guests, and some faces and names are blurred to protect their privacy. Please don\u2019t download, repost or reuse them.',
      takedown: 'Featured in this work and want it removed?',
      takedownLink: 'Email me and I\u2019ll take it down',
    },
    items: [
      { image: '/va/work/podcast/episode-15-min.webp', video: '/va/work/podcast/episode-15-min.mp4', label: '15 Min Episode (first minute)' },
      { image: '/va/work/podcast/intro.webp', video: '/va/work/podcast/intro.mp4', label: 'Intro' },
      { image: '/va/work/podcast/outro.webp', video: '/va/work/podcast/outro.mp4', label: 'Outro' },
      { image: '/va/work/podcast/intro-teaser.webp', video: '/va/work/podcast/intro-teaser.mp4', label: 'Intro Teaser Clip' },
      { image: '/va/work/podcast/ai-clip-1.webp', video: '/va/work/podcast/ai-clip-1.mp4', label: 'CFOs: from accountants to strategists (AI-assisted clip)', tall: true },
      { image: '/va/work/podcast/ai-clip-2.webp', video: '/va/work/podcast/ai-clip-2.mp4', label: '50% of business exits are unplanned (AI-assisted clip)', tall: true },
      { image: '/va/work/podcast/manual-clip-1.webp', video: '/va/work/podcast/manual-clip-1.mp4', label: 'Trust the process, trust your gut (hand-cut clip)', tall: true },
      { image: '/va/work/podcast/manual-clip-2.webp', video: '/va/work/podcast/manual-clip-2.mp4', label: 'Most estate agents won’t survive the next 5 years (hand-cut clip)', tall: true },
      { image: '/va/work/podcast/manual-clip-3.webp', video: '/va/work/podcast/manual-clip-3.mp4', label: 'The property sat unsold for 2 years (hand-cut clip)', tall: true },
      { image: '/va/work/podcast/manual-clip-4.webp', video: '/va/work/podcast/manual-clip-4.mp4', label: 'Insights of a 23-year-old founder (hand-cut clip)', tall: true },
    ] as VAImage[],
    // Guest faces and names are blurred on the 789 Show thumbnails (the first three).
    thumbnails: [
      { image: '/va/work/podcast/thumbnail-stores.webp', label: '350 stores to 16,000+ in 30 months' },
      { image: '/va/work/podcast/thumbnail-renewals.webp', label: '90%+ client renewals' },
      { image: '/va/work/podcast/thumbnail-sqft.webp', label: '500 sq ft to 89,000 sq ft' },
      { image: '/va/work/podcast/thumbnail.webp', label: 'The estate agency model is changing' },
    ] as VAImage[],
    show: { name: 'The 789 Show', label: 'Watch the channel on YouTube', href: 'https://www.youtube.com/@The789Show' },
  },
  management: {
    title: 'More than editing.',
    description: 'I help turn your podcast into content that gets seen.',
  },
  cta: {
    eyebrow: 'Your podcast has the content.',
    title: 'Let’s Make It Worth Watching.',
    description: 'From raw recordings to polished, engaging content that helps you grow your audience.',
    button: 'Let’s Talk About Your Podcast',
    path: vaPath('/va#contact'),
    points: ['Engaging Edits', 'Audience-Focused', 'Made for Growth'],
    samples: [
      { image: '/va/work/podcast/ai-clip-1.webp', label: 'CFOs: from accountants to strategists clip' },
      { image: '/va/work/podcast/thumbnail.webp', label: 'Podcast thumbnail' },
      { image: '/va/work/podcast/ai-clip-2.webp', label: '50% of business exits are unplanned clip' },
    ] as VAImage[],
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
  title: 'Social Media Packages',
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
