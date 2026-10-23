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
  currently: 'Software Engineer at Adventure Dhaka Limited — and building my own SaaS products',
  tagline: 'I engineer fast, cinematic web experiences.',
  intro:
    'Software Engineer building SaaS products and high-performance web applications with Next.js, React and TypeScript — multi-tenant under the hood, beautifully animated on the surface.',
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
    { value: 10, suffix: '', label: 'Products designed & built' },
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

export type Screen = { src: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  /** One line under the name in the showcase. */
  tagline: string;
  association: string;
  period: string;
  status: string;
  progress: number;
  tags: string[];
  description: string;
  overview: string;
  /** The problem it solves, in a sentence or two. */
  problem: string;
  /** What I owned on it. */
  role: string;
  features: string[];
  milestones: string[];
  stack: string[];
  link?: string;
  screens: Screen[];
  stat: { value: string; label: string };
  metrics: { value: string; label: string }[];
};

const shots = (slug: string, labels: string[]): Screen[] =>
  labels.map((label, i) => ({ src: `/images/projects/${slug}/${i + 1}.webp`, label }));

/** SaaS products I design and build end to end — the front of the portfolio. */
export const saas: CaseStudy[] = [
  {
    slug: 'parts-pilot',
    title: 'PartsPilot',
    kind: 'Automotive parts ERP & marketplace',
    tagline: 'A parts counter, a stockroom and a garage that never mix up your shelves.',
    association: 'Own SaaS product',
    period: 'Sep 2026 — Present',
    status: 'Live beta',
    progress: 70,
    tags: ['SaaS', 'Multi-tenant', 'POS', 'Bangladesh · GCC · UK'],
    problem:
      'Parts shops run the counter on paper, the stockroom on a spreadsheet and the garage on memory — so the same brake pad gets sold twice and nobody knows what the day really made.',
    role: 'Product, design and full-stack engineering — from the Prisma schema and tenancy model to the POS hotkeys and the landing page.',
    description:
      'One system for motorcycle-parts retailers: a scanner-fast counter POS, inventory and purchasing, a garage service floor and a public multi-vendor marketplace — all on one live stock ledger.',
    overview:
      'PartsPilot is an all-in-one SaaS for motorcycle and auto parts shops: counter POS, stockroom, garage jobs and an online marketplace sharing one real-time inventory, in five languages and five currencies — with a private demo shop for every visitor.',
    features: [
      'Counter POS with barcode scanning, split-tender payments (cash, card, due, bKash, Nagad), holds, hotkeys and offline sales that sync back.',
      'Owner dashboard that opens on “needs you today”: approvals, a cash drawer that doesn’t balance, low stock, bikes ready for delivery.',
      'Garage service floor: a drag-and-drop job board (received → in progress → ready → delivered), service bays and mechanic workload — jobs never touch retail stock.',
      'Inventory with stock health, movements, damaged and inspection pools, stock counts and branch transfers; purchases with average costing.',
      'Online orders with a 15-minute cart lock, Pathao and Steadfast courier tracking and in-store pickup by QR.',
      'Reports, cash and expenses with approvals, a full audit log, and SaaS billing with plans, seats and invoices.',
      '5 locales including Bangla and full RTL Arabic, 5 currencies and regional VAT.',
    ],
    milestones: ['Counter POS + offline sync', 'Garage job board', 'Marketplace with cart lock', 'Private 24-hour sandbox demos'],
    stack: ['Next.js 16', 'TypeScript', 'Prisma 7', 'PostgreSQL', 'next-intl', 'Radix UI', 'TanStack Table', 'Recharts', 'Framer Motion'],
    link: 'https://parts-pilot-v1.vercel.app/',
    screens: shots('parts-pilot', ['Landing', 'Owner dashboard', 'Counter POS', 'Garage job board', 'Inventory', 'Online orders & couriers']),
    stat: { value: '35', label: 'admin screens' },
    metrics: [
      { value: '35', label: 'Admin screens' },
      { value: '5', label: 'Languages incl. Bangla & RTL Arabic' },
      { value: '380+', label: 'Commits in 4 weeks' },
    ],
  },
  {
    slug: 'restaurant-os',
    title: 'RestaurantOS',
    kind: 'Multi-tenant restaurant SaaS',
    tagline: 'One QR code on the table. The menu, the order, the kitchen ticket and the bill — every screen reads the same order.',
    association: 'Own SaaS product',
    period: '2026 — Present',
    status: 'Private beta',
    progress: 65,
    tags: ['SaaS', 'Multi-tenant', 'QR ordering', 'Bilingual'],
    problem:
      'Restaurants juggle a printed menu, a waiter’s notepad, a shouting kitchen and a separate till — so orders get lost, prices go stale and owners only see the day once it is over.',
    role: 'Product, UX and frontend architecture across six apps — platform console, owner hub, POS, kitchen, waiter and rider — plus the specs for the Supabase backend.',
    description:
      'A multi-tenant platform where each restaurant gets its own QR menu, owner dashboard, POS and staff apps — and the platform owner runs tenants, billing and support from one console.',
    overview:
      'RestaurantOS connects the whole service: guests scan a table QR and order from a live menu, the ticket lands on the kitchen display, waiters and riders follow it on their phones, and the owner watches the day’s numbers move — while the platform console manages every restaurant, plan and invoice.',
    features: [
      'Guest QR menu per table with a shared cart for the whole table, allergens and spice levels, “can’t decide? let us pick” and live order status.',
      'Owner hub: today’s sales, a daily brief, monthly goals, orders, tables and floor plans, reservations, menu, packages, promos, inventory, CRM, staff and branches.',
      'Kitchen display with stations (grill, fry, curry, dessert), elapsed timers, bump and sold-out controls.',
      'Phone-first waiter and rider apps with PIN sign-in: table status, bill requests, active deliveries and earnings.',
      'Platform console: MRR, tenants with health scores, subscription plans and invoices, support inbox, feature flags, audit log and a public roadmap.',
      '18 written specs — system overview, schema and ERD, payments and SMS, caching, security and the backend cut-over plan.',
    ],
    milestones: ['Guest QR ordering', 'Owner hub (14 pages)', 'Kitchen, waiter & rider apps', 'Platform console & billing', 'Supabase backend cut-over'],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Framer Motion', 'Supabase'],
    link: 'https://restaurant-os-saas-v2.vercel.app/en',
    screens: shots('restaurant-os', [
      'Landing',
      'Owner dashboard',
      'Guest menu, waiter, rider & kitchen apps',
      'Platform console',
      'Kitchen display',
      'Point of sale',
      'Tenants',
      'Tables & floor plan',
    ]),
    stat: { value: '6', label: 'apps, one order' },
    metrics: [
      { value: '6', label: 'Apps on one order' },
      { value: '14', label: 'Pages in the owner hub' },
      { value: '0', label: 'Reprints when prices change' },
    ],
  },
  {
    slug: 'purecart',
    title: 'PureCart',
    kind: 'White-label gadget commerce platform',
    tagline: 'Genuine gadgets. Pure trust. A storefront any electronics retailer can rebrand in a minute.',
    association: 'Own SaaS product',
    period: 'Sep 2026 — Present',
    status: 'Frontend complete',
    progress: 60,
    tags: ['SaaS', 'White-label', 'E-commerce', 'Bangladesh'],
    problem:
      'Gadget retailers in Bangladesh sell on EMI, trade-ins and official vs. unofficial warranties — things generic store builders simply don’t model.',
    role: 'Product design and frontend engineering of the storefront and the 17-module merchant admin, plus the backend plan.',
    description:
      'An enterprise-grade, white-label storefront and merchant admin for Apple and gadget retailers in Bangladesh — rebrand the entire store from one config file.',
    overview:
      'PureCart is a white-label commerce platform for electronics retail: a bilingual Bangla/English storefront with EMI, trade-in and BTRC checks, plus a merchant admin with POS, dispatch and a warranty desk — themed from a single source of truth.',
    features: [
      'Rebrand name, logo, contacts, outlets and one of 7 accent themes from a single config — no hardcoded brand anywhere.',
      'Product pages with colour, storage and official/unofficial warranty variants, a 36-month EMI calculator, Care+ plans and bundles.',
      'A 4-step trade-in valuation engine with an admin inspection desk, and a BTRC IMEI registration check.',
      'Clip-to-cart video reels, hot deals, comparison, wishlist and a checkout with 64-district delivery zones and showroom pickup.',
      'Merchant admin with 17 modules: KPIs, dispatch, inventory, showroom POS, trade-ins, coupons, loyalty, warranty, EMI settlement, SEO, staff and roles.',
    ],
    milestones: ['Storefront + checkout', '17-module merchant admin', 'Catalogue import pipeline', 'Backend: auth, payments, notifications'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Zustand', 'next-intl', 'Vitest'],
    screens: shots('purecart', ['Storefront', 'Product page with EMI', 'Merchant dashboard', 'Showroom POS', 'Trade-in inspection desk', 'Trade-in calculator']),
    stat: { value: '17', label: 'admin modules' },
    metrics: [
      { value: '7', label: 'Live accent themes' },
      { value: '17', label: 'Merchant admin modules' },
      { value: '64', label: 'Delivery districts' },
    ],
  },
  {
    slug: 'executive-fashion',
    title: 'Executive Fashion',
    kind: 'Buying-house platform · CMS · RFQ → CRM',
    tagline: 'A fast public site, a lean admin, an RFQ pipeline and email marketing — in one monolith.',
    association: 'Client platform',
    period: 'Oct 2026 — Present',
    status: 'Design sign-off',
    progress: 45,
    tags: ['Platform', 'CRM', 'Client', 'Bangladesh'],
    problem:
      'A buying house sells trust to global brands, but its inquiries lived in inboxes and its production status in phone calls.',
    role: 'Design direction (picked from a lab of 101 variants), architecture and the full public site and admin on static data, ready for the Supabase phase.',
    description:
      'A platform for a Bangladesh garment buying house: an editorial public site, a block-based CMS, an RFQ → CRM pipeline, production orders, factories and consent-based email marketing.',
    overview:
      'Built for a Dhaka buying house serving global brands: an editorial public site, plus an admin that runs inquiries, the sales pipeline, production orders, factories, samples and campaigns — designed to be maintained by one person.',
    features: [
      'Editorial public site: collections, styles, capabilities, factories, markets, process and compliance — static/ISR with skeletons everywhere.',
      'RFQ → CRM board: new → contacted → quoted → negotiating → won/lost, with notes, assignment and an activity timeline.',
      'Production orders with buyer, style, factory, quantity, stage progress and late / at-risk flags.',
      'Factories with capacity, lead times and certificates to renew; samples, costing and fabrics.',
      'Email marketing with double opt-in, a consent ledger, suppression list and one-click unsubscribe via Resend.',
      'Supabase Auth, role-based access, Row-Level Security on every table and an audit log.',
    ],
    milestones: ['Public site (v101 “Aura”)', 'Admin screens on static data', 'Design sign-off', 'Supabase + Prisma + RLS'],
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Prisma', 'Tailwind v4', 'Resend', 'Zod', 'GSAP'],
    screens: shots('executive-fashion', ['Public site', 'Admin dashboard', 'RFQ pipeline board', 'Production orders', 'Factories', 'Collections']),
    stat: { value: '101', label: 'design variants explored' },
    metrics: [
      { value: '101', label: 'Design variants explored' },
      { value: '100%', label: 'Tables behind RLS' },
      { value: '6', label: 'Pipeline stages' },
    ],
  },
];

/** Production work for clients and employers, plus my own learning platform. */
export const projects: CaseStudy[] = [
  {
    slug: 'sporefall',
    title: 'Sporefall',
    kind: 'Gen-AI sci-fi micro-drama platform',
    tagline: 'A quarantined city, a spore rewriting fate — and an audience that votes on what happens next.',
    association: 'Adventure Dhaka Limited',
    period: 'Feb 2026 — Present',
    status: 'Live',
    progress: 80,
    tags: ['International', 'Singapore', 'Gen-AI'],
    problem:
      'An interactive story needs more than a video page: voting, a storefront, a CMS for episodes and a way to run campaigns across the web.',
    role: 'Frontend lead across the public site, the Admin OS dashboard and the NEXUS campaign builder.',
    description:
      'Narrative storytelling, audience voting, a merch store and community — with an internal CMS and an embeddable campaign engine.',
    overview:
      "Southeast Asia's first Gen-AI sci-fi micro-drama platform, covered by the South China Morning Post and The Straits Times: the city of Lionara is quarantined, a spore is rewriting human fate — and the audience votes on what happens next. Three products power it: the public site, an internal CMS and a campaign engine.",
    features: [
      'Public website: episode viewing, audience voting, merch store, Stripe checkout and donations.',
      'Admin OS dashboard: an internal CMS for episodes, polls, blogs, analytics and orders with a Tiptap editor and Recharts.',
      'NEXUS: a drag-and-drop modal campaign builder deployed anywhere through a single embed.js.',
      'Media room, partnerships and a blog that tells the world’s backstory.',
    ],
    milestones: ['Season 1 launch', 'Merch store', 'Admin OS', 'NEXUS campaign builder'],
    stack: ['Next.js 16', 'Supabase', 'Stripe', 'Zustand', 'Framer Motion', 'Tiptap', 'Recharts', 'Radix UI', '@dnd-kit'],
    link: 'https://www.sporefall.com/',
    screens: shots('sporefall', ['Home', 'Season 1', 'Artifacts store', 'Chronicles', 'Blog', 'Media room']),
    stat: { value: '3', label: 'products, one platform' },
    metrics: [
      { value: '3', label: 'Products, one platform' },
      { value: '1', label: 'embed.js for every campaign' },
      { value: 'SG', label: 'Launched in Singapore' },
    ],
  },
  {
    slug: 'loud-spectrum',
    title: 'Loud Spectrum',
    kind: 'Production e-commerce',
    tagline: 'Premium terpenes, a storefront that loads before you blink.',
    association: 'Client',
    period: 'Feb 2025 — Present',
    status: 'Live',
    progress: 90,
    tags: ['Client', 'USA', 'E-commerce'],
    problem: 'A US manufacturer selling to labs and brands needed accounts, tiered pricing and a fast catalogue — without a sluggish theme.',
    role: 'Frontend engineering: storefront, design system, pricing UI and performance work.',
    description: 'Storefront for a US terpene manufacturer with account management, dynamic pricing rules and sub-second LCP.',
    overview:
      'A production storefront for a US terpene manufacturer: customer accounts, dynamic pricing rules, lab results, custom formulations and order analytics — engineered for sub-second Largest Contentful Paint.',
    features: [
      'Reusable design system with Storybook and visual regression.',
      'Product lines, profiles and volumes with dynamic pricing rules.',
      'Lab, quality and custom-formulation flows for B2B buyers.',
      'Optimised images and caching for sub-second LCP; order analytics.',
    ],
    milestones: ['Design system rollout', 'Admin dashboard', 'A/B image optimisation'],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'SSR', 'Storybook', 'Node.js', 'PostgreSQL'],
    link: 'https://loudspectrum.com/en',
    screens: shots('loud-spectrum', ['Home', 'Grow-room hero', 'Shop', 'Product page', 'Terpene lab', 'Custom formulations']),
    stat: { value: '<1s', label: 'largest contentful paint' },
    metrics: [
      { value: '<1s', label: 'Largest contentful paint' },
      { value: 'B2B', label: 'Tiered pricing & accounts' },
      { value: 'US', label: 'Market' },
    ],
  },
  {
    slug: 'dev-visualize',
    title: 'Dev Visualize',
    kind: 'Interactive learning platform',
    tagline: 'Watch the event loop, React reconciliation and a request lifecycle happen — one step at a time.',
    association: 'Own project',
    period: 'Mar 2026 — Present',
    status: 'Live',
    progress: 70,
    tags: ['Own project', 'Education'],
    problem: 'Developers memorise how the stack works without ever seeing it — and it shows in interviews and in production.',
    role: 'Everything: content, simulation engine, design and motion.',
    description:
      'Turns complex web-development concepts into animated, step-by-step visual explanations with smooth, performant motion.',
    overview:
      'A platform of interactive, animated visualizations for full-stack concepts — JavaScript, React, Node, databases and ORMs, DSA, CI/CD and system design — built so developers can actually see things happen.',
    features: [
      'Interactive simulations with pause, step-through and speed control.',
      '12 visualizers across 6 categories with 75 interactive sections.',
      '400+ query examples across 4 database/ORM playgrounds and 55 Next.js rendering scenarios.',
      'DSA patterns, system-design architectures and CI/CD pipelines, animated.',
      '15 interview questions with a timed mode, code challenges and self-assessment.',
    ],
    milestones: ['Module framework v2', 'RSC lifecycle diagrams', 'Content authoring UI'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Framer Motion', 'GSAP', 'Three.js'],
    link: 'https://dev-visualize.vercel.app/',
    screens: shots('dev-visualize', ['Home', 'All visualizers', 'JavaScript', 'System design', 'DSA patterns', 'Prisma']),
    stat: { value: '75', label: 'interactive sections' },
    metrics: [
      { value: '12', label: 'Visualizers' },
      { value: '75', label: 'Interactive sections' },
      { value: '400+', label: 'Query examples' },
    ],
  },
];

/** Products I am building right now that already have screens to show. */
export const lab: CaseStudy[] = [
  {
    slug: 'trading-docs',
    title: 'Trading Docs',
    kind: 'Institutional trading education PWA',
    tagline: 'Learn how banks, hedge funds and prop firms really move the markets — free, offline, in English and Bangla.',
    association: 'Own project',
    period: '2026 — Present',
    status: 'Live',
    progress: 85,
    tags: ['PWA', 'Education', 'Bilingual'],
    problem: 'Retail traders learn from scattered videos; the institutional playbook is rarely written down in one place, let alone in Bangla.',
    role: 'Everything: curriculum structure, content system, tools and the offline PWA.',
    description: '306 topics across 10 categories in English and Bangla, 23 interactive tools and full offline mode.',
    overview:
      'A professional-grade trading education platform: price action, smart-money and ICT concepts, order flow, Wyckoff, intermarket and quantitative trading — with calculators, live charts, a glossary and progress tracking, all available offline.',
    features: [
      '306 topics in 10 categories, from beginner to expert paths.',
      '23 interactive tools: position size, pip value, Fibonacci, risk-reward, session timer and more.',
      'Live TradingView charts, a 154-term glossary, an academy and a progress dashboard.',
      'English and Bangla throughout, ⌘K search, and a PWA with complete precaching.',
    ],
    milestones: ['Core curriculum', 'Pro tools', 'Bangla translation', 'Offline PWA'],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'PWA', 'TradingView'],
    link: 'https://tradingdocs.vercel.app/',
    screens: shots('trading-docs', ['Home', 'Lesson', 'Trading tools', 'Academy', 'Live charts', 'Glossary']),
    stat: { value: '306', label: 'topics, EN + বাংলা' },
    metrics: [
      { value: '306', label: 'Topics' },
      { value: '23', label: 'Interactive tools' },
      { value: '2', label: 'Languages' },
    ],
  },
  {
    slug: 'devdock',
    title: 'devdock.dev',
    kind: 'Privacy-first developer workbench',
    tagline: 'Useful tools. Private by default. Built for flow.',
    association: 'Own project',
    period: '2026 — Present',
    status: 'Live',
    progress: 80,
    tags: ['Developer tools', 'PWA', 'Open source'],
    problem: 'Pasting a JWT or a customer CSV into a random online tool sends it to someone else’s server.',
    role: 'Everything: tool engine, design system and themes, PWA.',
    description: '90+ developer utilities that run entirely in the browser — zero uploads, zero tracking, offline-ready.',
    overview:
      'A fast, privacy-first workbench of 90+ utilities for JSON, encoding, text, design, databases, APIs and documents. Everything runs client-side, works offline as a PWA, and is grouped into workflow collections.',
    features: [
      '90+ tools: JSON formatter, cURL builder, hash and JWT tools, colour palettes, CSV ↔ JSON and more.',
      '100% client-side computation — nothing is uploaded, nothing is tracked.',
      'Workflow collections, favourites and recents; multi-theme architecture including Gruvbox.',
      'Offline-capable PWA with a ⌘K command palette.',
    ],
    milestones: ['Tool engine', 'Collections', 'Themes', 'Offline PWA'],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'PWA'],
    link: 'https://devdockdev.vercel.app/',
    screens: shots('devdock', ['Home', 'Tool suite', 'JSON formatter', 'Colour palette', 'cURL builder', 'Workflow collections']),
    stat: { value: '90+', label: 'offline tools' },
    metrics: [
      { value: '90+', label: 'Tools' },
      { value: '0', label: 'Uploads' },
      { value: '100%', label: 'Client-side' },
    ],
  },
  {
    slug: 'pulsar',
    title: 'Pulsar',
    kind: 'Universal download manager',
    tagline: 'Every download, beautifully under control.',
    association: 'Own project',
    period: 'Jul 2026 — Present',
    status: 'UI complete',
    progress: 60,
    tags: ['Product design', 'Dashboard'],
    problem: 'Download managers still look like 2005. This one is designed to be the app you keep open.',
    role: 'Product design and the full frontend, built against realistic mock data so an engine can plug in later.',
    description:
      'A premium download-manager interface — dashboard, queue, collections, storage and analytics — with glass surfaces, aurora backgrounds and six swappable accents.',
    overview:
      'Pulsar is a complete, fully static product UI for a download manager: 15 screens from landing to analytics, built on shadcn/ui with Framer Motion transitions, a command palette and light/dark themes.',
    features: [
      '15 screens: landing, dashboard, downloads, queue, history, collections, storage, analytics, search, settings and more.',
      'Live-feeling queue with speeds, ETAs and priorities; smart and manual collections.',
      'Charts for activity, success rate and category distribution.',
      'Six accent palettes, light/dark, and a validated add-download form.',
    ],
    milestones: ['Design system', 'App shell', 'All screens', 'Engine integration'],
    stack: ['Next.js 16', 'shadcn/ui', 'Framer Motion', 'React Hook Form', 'Zod', 'Tailwind v4'],
    screens: shots('pulsar', ['Landing', 'Dashboard', 'Downloads', 'Analytics', 'Queue', 'Collections']),
    stat: { value: '15', label: 'screens' },
    metrics: [
      { value: '15', label: 'Screens' },
      { value: '6', label: 'Accent palettes' },
      { value: '0', label: 'Backend needed to demo' },
    ],
  },
];

/** Smaller things in progress, without screens yet. */
export const building: { title: string; kind: string; description: string; stack: string[]; status: string; progress: number }[] = [
  {
    title: 'Finance Tracker',
    kind: 'Personal finance app',
    description: 'Transactions, monthly budgets, grocery plans and loan EMIs with realtime updates and CSV/PDF reports.',
    stack: ['Next.js 16', 'Supabase', 'Zustand', 'Recharts', 'GSAP'],
    status: 'In progress',
    progress: 55,
  },
  {
    title: 'Noor',
    kind: 'Islamic lifestyle platform',
    description: 'A calm, glass-morphic companion — prayer times, Quran and dhikr. Bangla-first, architected for Arabic and Urdu.',
    stack: ['Next.js 16', 'React 19', 'Tailwind v4', 'next-intl', 'Motion'],
    status: 'In progress',
    progress: 40,
  },
  {
    title: 'AVYRA',
    kind: 'Commerce design system',
    description: 'One codebase, many storefronts — tech, fashion, luxury, marketplace — composed from configuration, not forks.',
    stack: ['Next.js 16', 'Design tokens', 'Tailwind CSS'],
    status: 'Exploring',
    progress: 25,
  },
  {
    title: 'Khan Associates',
    kind: 'Corporate website',
    description: 'Bilingual site for a Dhaka tax & legal firm established in 2001 — zero UI kits and a hand-rolled icon set.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'],
    status: 'Shipped',
    progress: 100,
  },
];

/** Every page under /projects. */
export const caseStudies: CaseStudy[] = [...saas, ...projects, ...lab];

export type Project = CaseStudy;

/** Company name without the legal suffix, for big display type. */
export const shortCompany = (company: string) => company.replace(/ (Pvt\. )?Ltd\.?$| Limited$/, '');
export type Job = (typeof experience)[number];
