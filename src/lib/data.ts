export const profile = {
  name: 'Iqbal Mahmud',
  fullName: 'Md Iqbal Mahmud',
  address: 'Mirpur, Dhaka',
  phone: '+8801670161693',
  years: 7,
  firstName: 'Iqbal',
  lastName: 'Mahmud',
  role: 'Software Engineer',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  email: 'iqbal886mahmud@gmail.com',
  site: 'https://mahmud886.vercel.app',
  cv: '/iqbal_mahmud_7_years.pdf',
  cvName: 'iqbal_mahmud_7_years',
  photo: '/images/profile.jpg',
  currently: 'Software Engineer at Adventure Dhaka Limited',
  tagline: 'I engineer fast, cinematic web experiences.',
  intro:
    'Software Engineer crafting high-performance web applications with Next.js, React and modern frontend ecosystems — scalable under the hood, beautifully animated on the surface.',
  summary:
    'Dedicated Software Engineer with 7+ years of experience across front-end and back-end development. Specialised in React, Next.js and TypeScript, building scalable, high-performance and beautifully animated interfaces. Skilled in writing clean, maintainable, DRY code that speeds up delivery and minimises debugging time. Passionate about continuous learning and staying current with technology.',
  skillsResume: {
    Expertise: ['HTML', 'CSS', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Redux Toolkit'],
    Comfortable: ['TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Supabase'],
    'Motion & 3D': ['GSAP', 'Framer Motion', 'Three.js / R3F'],
    'Quality & Tooling': ['Jest', 'React Testing Library', 'Cypress', 'Storybook', 'Git / GitHub / GitLab', 'CI/CD', 'Scrum'],
  } as Record<string, string[]>,
  manifesto:
    'I turn complex ideas into interfaces that feel alive. Pixel-precise, performance-obsessed, and animated with intent — because the web should feel like magic, not machinery.',
  story: [
    'I started out building company websites and small web apps for clients — the kind of work where you learn fast that a site has to be both beautiful and bulletproof.',
    'At Hogarth I shipped at agency scale: 300+ HTML email templates and 100+ HTML5 and GSAP animations that had to render perfectly on 90+ devices. That is where motion became my second language.',
    'At Nexdecade I owned the UI of an application used by more than two million people a day, revamped interfaces across React, Angular and Laravel, and shipped a six-step encryption–decryption REST API with a 100% success rate.',
    'Today at Adventure Dhaka I build design-system-driven products in Next.js and Storybook — tested, measured and fast — while leading my own experiments in 3D and interactive learning.',
  ],
  roles: ['Frontend Engineer', 'Creative Developer', 'Next.js Specialist', 'Motion & 3D on the Web'],
  socials: [
    { label: 'GitHub', handle: '@mahmud886', href: 'https://github.com/mahmud886' },
    { label: 'LinkedIn', handle: 'in/mahmud886', href: 'https://linkedin.com/in/mahmud886' },
    { label: 'Medium', handle: '@mahmud886', href: 'https://medium.com/@mahmud886' },
  ],
  stats: [
    { value: 7, suffix: '+', label: 'Years shipping for the web' },
    { value: 2, suffix: 'M+', label: 'Daily users served' },
    { value: 300, suffix: '+', label: 'HTML email builds' },
    { value: 100, suffix: '+', label: 'HTML5 / GSAP animations' },
  ],
  skills: {
    Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'Framer Motion', 'Redux Toolkit'],
    'Backend & API': ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST', 'GraphQL'],
    'DevOps & Tools': ['Docker', 'CI/CD', 'Vercel', 'AWS', 'Git', 'Storybook', 'Jest', 'Figma'],
  } as Record<string, string[]>,
  services: [
    {
      title: 'Frontend Engineering',
      text: 'Production React and Next.js apps with clean component architecture, typed end to end, tested with Jest, RTL and Cypress, and shipped through CI/CD.',
    },
    {
      title: 'Motion & 3D',
      text: 'GSAP timelines, scroll-driven storytelling and Three.js scenes that make a product feel premium — without tanking the frame rate.',
    },
    {
      title: 'Performance',
      text: 'SSR, lazy loading, memoization, image and caching strategy. Sub-second LCP is a requirement, not a stretch goal.',
    },
    {
      title: 'Design Systems',
      text: 'Reusable, documented component libraries in Storybook with Tailwind or Styled Components, so teams ship consistent UI faster.',
    },
  ],
  process: [
    { step: 'Understand', text: 'Goals, users and constraints first. I map the flows and agree on what "fast" and "done" mean before writing code.' },
    { step: 'Architect', text: 'Component boundaries, data contracts with the backend, state strategy and a performance budget wired into CI.' },
    { step: 'Build & animate', text: 'Accessible, responsive UI built in small reviewed increments — then motion layered on with intent, never as decoration.' },
    { step: 'Measure & ship', text: 'Tests, Lighthouse and real-user metrics, automated deployments, and iteration after launch based on what the numbers say.' },
  ],
  education: [
    { title: 'B.Sc. in Computer Science & Engineering', place: 'Southeast University, Dhaka', period: '2022', note: 'CGPA 3.02' },
    { title: 'HSC, Science', place: 'Mymensingh Ideal College', period: '2013 — 2015' },
    { title: 'SSC, Science', place: 'B.M High School', period: '2007 — 2013' },
  ],
  certifications: [
    {
      title: 'Reactive Accelerator — Batch 1',
      issuer: 'Learn with Sumit (LWS)',
      period: 'Jan 2024 — Jun 2024',
      credential: 'LWSCTXN-UZELD7KP',
      skills: ['Advanced JS', 'React', 'TypeScript', 'State Management', 'Testing', 'Performance'],
    },
    {
      title: 'Complete Web Development',
      issuer: 'Programming Hero',
      period: 'Jan 2020 — Apr 2020',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
    },
  ],
};

export const experience = [
  {
    slug: 'adventure-dhaka',
    resume: [
      'Spearheaded scalable UI development using JavaScript (ES6+), React.js and Next.js, establishing reusable component-based architectures for consistent design and a better user experience.',
      'Optimised application speed through lazy loading and Next.js SSR, while managing complex data flows with React Context and Redux Toolkit.',
      'Ensured high code quality and smooth deployments with unit/integration testing, rigorous code reviews and Git/GitHub/GitLab within Scrum.',
    ],
    company: 'Adventure Dhaka Limited',
    companyUrl: 'https://www.adventure-global.com/',
    role: 'Software Engineer',
    period: 'Nov 2024 — Present',
    current: true,
    summary:
      'Building and maintaining scalable user interfaces for a global travel platform, with a focus on performance, quality and team collaboration.',
    highlights: ['Scaled design-system packages and Storybook docs for faster onboarding.', 'Introduced performance budgets and dashboards tied to CI.'],
    responsibilities: [
      'Develop and maintain scalable UIs with JavaScript (ES6+), React.js, Next.js and Storybook.',
      'Build reusable, consistent component architectures.',
      'Manage state with React Context and Redux Toolkit.',
      'Optimize performance with lazy loading, memoization and Next.js SSR.',
      'Ensure responsive theming using Tailwind CSS and Styled Components.',
      'Write unit and integration tests with Jest, React Testing Library and Cypress.',
      'Use Git and CI/CD pipelines for automated deployments.',
      'Participate in daily stand-ups, sprint planning, reviews and retrospectives.',
      'Conduct code reviews and enforce best practices.',
    ],
    tech: ['Next.js', 'React', 'Storybook', 'Redux Toolkit', 'Tailwind CSS', 'Styled Components', 'Jest', 'RTL', 'Cypress', 'CI/CD'],
  },
  {
    slug: 'nexdecade',
    resume: [
      'Led development and optimisation of high-traffic applications serving 2M+ daily users, transforming UIs with React, Angular and Laravel for a 30% gain in system efficiency, 31% more user engagement and a 25% performance boost.',
      'Engineered and secured six-step encryption–decryption REST APIs with a 100% success rate, improving reliability by 20%, UX by 30% and cutting debugging time by 62%.',
      'Drove Agile delivery and cross-functional collaboration, improving workflow efficiency by 30%, holding 100% coding-standard adherence and mentoring 2 junior engineers.',
    ],
    company: 'Nexdecade Technology Pvt. Ltd.',
    role: 'Web Developer',
    period: 'Aug 2023 — Oct 2024',
    summary: 'Worked on high-traffic applications and UI revamps, delivering secure APIs and measurable performance gains.',
    highlights: ['Led UI revamp sprints.', 'Partnered with backend to define stable API contracts.'],
    responsibilities: [
      'Led development of high-traffic applications serving 2M+ daily users — 30% better system efficiency, 31% more engagement, 25% faster UI.',
      'Transformed UIs using React, Angular, Laravel and Inertia; reduced debugging time and improved engagement.',
      'Implemented a secure six-step encryption–decryption REST API with a 100% success rate, improving reliability by 20% and cutting debugging time by 62%.',
      'Optimized the UI for a 25% performance boost and faster troubleshooting.',
      'Improved collaboration and workflow efficiency by 30% through adaptive strategies.',
      'Maintained 100% coding-standard adherence and mentored 2 junior engineers.',
      'Implemented Agile methodologies to increase flexibility and adaptability.',
    ],
    tech: ['React', 'Angular', 'Laravel', 'Inertia', 'REST API', 'Agile', 'Git'],
  },
  {
    slug: 'hogarth',
    resume: [
      'Drove digital asset production and UI development: 300+ HTML email templates, 100+ JavaScript animations and responsive web assets with 90%+ device compatibility, lifting engagement by 20–25%.',
      'Engineered secure REST APIs and optimised UI performance — 100% API success rate, 30% better UX and a 25% performance boost.',
      'Implemented Agile practices across teams, cutting project timelines by 15% and improving workflow efficiency by 30%.',
    ],
    company: 'Hogarth Dhaka',
    role: 'Web Developer',
    period: 'Dec 2021 — Aug 2023',
    summary: 'Delivered high-volume digital assets and interactive web experiences with a focus on responsiveness and brand alignment.',
    highlights: ['Delivered high-volume assets at scale.', 'Established reusable HTML5 banner templates.'],
    responsibilities: [
      'Produced 300+ HTML email templates and 100+ HTML5/JS animations for ads, websites and mobile apps with 90%+ device compatibility, lifting engagement by 20–25%.',
      'Built responsive hero designs and GSAP animations that improved engagement.',
      'Created on-brand creative assets including HTML5 banners and animated graphics.',
      'Collaborated across teams to deliver responsive, brand-aligned designs.',
      'Contributed to process tools that optimized workflows and team collaboration.',
      'Implemented Agile practices that cut project timelines by 15%.',
    ],
    tech: ['HTML5', 'CSS', 'JavaScript', 'GSAP', 'Responsive Email', 'Brand Systems'],
  },
  {
    slug: 'kaizen-it',
    resume: [
      'Engineered and integrated full-stack web solutions with React, Node.js, Express and MongoDB at a 100% integration rate, delivering UI/UX designs and prototypes for 100% project execution success.',
    ],
    company: 'Kaizen IT Ltd',
    role: 'Web Developer',
    period: 'Sep 2021 — Nov 2021',
    summary: 'Delivered end-to-end web solutions from design to integration with a focus on quality assurance.',
    highlights: ['Built small full-stack modules.', 'Improved QA flows with checklists.'],
    responsibilities: [
      'Streamlined administrative processes and improved communication for education stakeholders.',
      'Delivered UI/UX solutions using wireframes, storyboards and prototypes.',
      'Developed full-stack features with React, Node.js, Express and MongoDB.',
      'Designed UI elements that improved user interaction by 25%.',
      'Performed rigorous testing to ensure accuracy and seamless experiences.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'UI/UX', 'Testing'],
  },
  {
    slug: 'oxdora',
    resume: [
      'Developed official websites and web applications with 100% project execution success, increasing client satisfaction through enhanced functionality, while managing clients and training agents.',
    ],
    company: 'Oxdora I Tech',
    role: 'Web Developer',
    period: 'Jan 2021 — Aug 2021',
    summary: 'Started my career delivering company websites and web applications while collaborating closely with clients.',
    highlights: ['First production websites shipped end to end.', 'Trained marketing agents on the tools I built.'],
    responsibilities: [
      'Designed and developed the official website and portfolio.',
      'Built web applications that improved client satisfaction through better functionality and UX.',
      'Managed clients and conducted training sessions for marketing agents.',
      'Adopted the latest frontend trends and best practices.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Express.js', 'Client Training'],
  },
];

export const projects = [
  {
    slug: 'dev-visualize',
    title: 'Dev Visualize',
    kind: 'Interactive learning platform',
    association: 'Own project',
    period: 'Mar 2026 — Present',
    status: 'Active',
    progress: 65,
    tags: ['Own Project'],
    description:
      'Turns complex web-development concepts into animated, step-by-step visual explanations with smooth, performant motion.',
    overview:
      'A platform of interactive, animated visualizations for complex full-stack concepts — built so developers can actually see request lifecycles, event loops and React reconciliation happen, one step at a time.',
    features: [
      'Interactive simulations with pause, step-through and speed control.',
      'Modular scenarios: request lifecycle, React reconciliation, PWA service worker.',
      'GSAP-powered micro-interactions and Three.js visual layers.',
      '12 visualizers across 6 categories with 75 interactive sections.',
      '400+ query examples across 4 database/ORM playgrounds and 55 Next.js rendering scenarios on a full simulation engine.',
      '15 interview questions with a timed mode, code challenges and self-assessment.',
    ],
    milestones: ['Module framework v2', 'RSC lifecycle diagrams', 'Content authoring UI'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Framer Motion', 'GSAP', 'Three.js'],
    link: 'https://dev-visualize.vercel.app/',
    images: ['/images/projects/dev-visualize/1.png', '/images/projects/dev-visualize/2.png', '/images/projects/dev-visualize/3.png'],
    accent: '#7c5cff',
  },
  {
    slug: 'sporefall',
    title: 'Sporefall',
    kind: 'Gen-AI sci-fi micro-drama platform',
    association: 'Adventure Dhaka Limited',
    period: 'Feb 2026 — Present',
    status: 'Active',
    progress: 40,
    tags: ['International', 'Singapore'],
    description:
      'Narrative storytelling, community forums and a commerce storefront — with edge analytics and custom moderation tooling.',
    overview:
      "Southeast Asia's first Gen-AI sci-fi micro-drama platform: the city of Lionara is quarantined, a spore is rewriting human fate — and the audience votes on what happens next. Three products power it: the public site, an internal CMS and a campaign engine.",
    features: [
      'Public website: episode viewing, audience voting, merch store, Stripe checkout and donations.',
      'Admin OS dashboard: an internal CMS for episodes, polls, blogs, analytics and orders with a Tiptap editor and Recharts.',
      'NEXUS: a drag-and-drop modal campaign builder deployed anywhere through a single embed.js.',
      'Community moderation tooling and edge analytics for growth insights.',
    ],
    milestones: ['Scene composer alpha', 'Moderation queue', 'Edge analytics MVP'],
    stack: ['Next.js 16', 'Supabase', 'Stripe', 'Zustand', 'Framer Motion', 'Tiptap', 'Recharts', 'Radix UI', '@dnd-kit'],
    link: 'https://www.sporefall.com/',
    images: ['/images/projects/sporefall/1.png', '/images/projects/sporefall/2.png', '/images/projects/sporefall/3.png'],
    accent: '#00e5a8',
  },
  {
    slug: 'loud-spectrum',
    title: 'Loud Spectrum',
    kind: 'Production e-commerce',
    association: 'Client',
    period: 'Feb 2025 — Present',
    status: 'Active',
    progress: 80,
    tags: ['Client', 'USA'],
    description: 'Storefront for a terpene manufacturer with account management, dynamic pricing rules and sub-second LCP.',
    overview:
      'A production storefront for a US terpene manufacturer: customer accounts, dynamic pricing rules, order analytics and an admin side — engineered for sub-second Largest Contentful Paint.',
    features: [
      'Reusable design system with Storybook and visual regression.',
      'Inventory and pricing engines with admin dashboards.',
      'Optimized images and caching for sub-second LCP.',
      'Robust order analytics.',
    ],
    milestones: ['Design system rollout', 'Admin dashboard', 'A/B image optimization'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'SSR', 'Storybook', 'Node.js', 'PostgreSQL'],
    link: 'https://loudspectrum.com/en',
    images: ['/images/projects/loud-spectrum/1.png', '/images/projects/loud-spectrum/2.png', '/images/projects/loud-spectrum/3.png'],
    accent: '#ff5c8a',
  },
];

export const moreProjects = [
  {
    title: 'Noor',
    kind: 'Islamic lifestyle platform',
    description:
      'A calm, glass-morphic Islamic companion — prayer times, Quran and dhikr. Bangla-first, English second, architected for Arabic and Urdu; verified content served statically from the server.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'next-intl', 'Motion'],
  },
  {
    title: 'RestaurantOS',
    kind: 'Multi-tenant SaaS',
    description:
      'A multi-tenant, dynamic-QR restaurant platform with subdomain routing per restaurant, bilingual UI and tenant-scoped theming.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Khan Associates',
    kind: 'Corporate website',
    description:
      'Bilingual marketing and profile site for a Dhaka tax & legal consulting firm established in 2001 — built with zero UI kits and a hand-rolled icon set.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'],
  },
  {
    title: 'AVYRA',
    kind: 'Commerce design system',
    description:
      'A universal commerce design system and adaptive storefront architecture: one codebase, many storefronts — tech, fashion, luxury, marketplace — composed from configuration, not forks.',
    stack: ['Next.js 16', 'Design tokens', 'Tailwind CSS'],
  },
];

export type Project = (typeof projects)[number];
export type Job = (typeof experience)[number];
