import { caseStudies, experience, profile, type CaseStudy } from '@/lib/data';

/** Shorten to what search results show (~160 chars), cutting at a word. */
export const clip = (text: string, max = 158) => {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,;:—–-]$/, '')}…`;
};

/** Absolute URL on the live site. */
export const abs = (path = '') => `${profile.site}${path}`;

export const SITE_TITLE = `${profile.name} — Software Engineer · SaaS, React & Next.js`;
export const SITE_DESCRIPTION = `Dhaka-based software engineer with ${profile.years}+ years building SaaS products and fast, animated web apps in React, Next.js and TypeScript.`;

export const KEYWORDS = [
  profile.name,
  profile.fullName,
  'Software Engineer',
  'Frontend Engineer',
  'Full-stack Developer',
  'SaaS developer',
  'React developer',
  'Next.js developer',
  'TypeScript',
  'GSAP',
  'Web developer Bangladesh',
  'Software engineer Dhaka',
  'Hire React developer',
  'Portfolio',
];

const PERSON_ID = abs('/#person');
const WEBSITE_ID = abs('/#website');

const current = experience.find((j) => j.current);

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.fullName,
    alternateName: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    description: profile.summary,
    url: abs(),
    image: abs(profile.photo),
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    nationality: { '@type': 'Country', name: 'Bangladesh' },
    sameAs: profile.socials.map((s) => s.href),
    knowsAbout: Object.values(profile.skillsResume).flat().slice(0, 30),
    knowsLanguage: ['en', 'bn'],
    ...(current && { worksFor: { '@type': 'Organization', name: current.company, url: current.companyUrl } }),
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Southeast University', address: 'Dhaka, Bangladesh' },
    hasCredential: profile.certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    })),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs(),
    name: profile.name,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };
}

export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      {
        '@type': 'ProfilePage',
        '@id': abs('/#profile'),
        url: abs(),
        name: SITE_TITLE,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        about: { '@id': PERSON_ID },
        primaryImageOfPage: abs('/opengraph-image'),
      },
      {
        '@type': 'ItemList',
        name: 'Projects',
        itemListElement: caseStudies.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/projects/${p.slug}`), name: p.title })),
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '' }, ...items].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: abs(b.path) })),
  };
}

export function projectSchema(p: CaseStudy) {
  const url = abs(`/projects/${p.slug}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: p.title,
        headline: `${p.title} — ${p.kind}`,
        description: p.overview,
        abstract: p.tagline,
        url,
        image: [abs(`/projects/${p.slug}/opengraph-image`), ...p.screens.map((s) => abs(s.src))],
        creator: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        keywords: [...p.tags, ...p.stack].join(', '),
        genre: p.kind,
        creativeWorkStatus: p.status,
        ...(p.link && { sameAs: p.link }),
        isPartOf: { '@id': WEBSITE_ID },
      },
      breadcrumbs([
        { name: 'Projects', path: '/#products' },
        { name: p.title, path: `/projects/${p.slug}` },
      ]),
    ],
  };
}

export function jobSchema(slug: string) {
  const j = experience.find((x) => x.slug === slug)!;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbs([
        { name: 'Experience', path: '/#experience' },
        { name: j.company, path: `/work/${j.slug}` },
      ]),
    ],
  };
}

export function resumeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'ProfilePage',
        url: abs('/resume'),
        name: `${profile.fullName} — Resume`,
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
      breadcrumbs([{ name: 'Resume', path: '/resume' }]),
    ],
  };
}
