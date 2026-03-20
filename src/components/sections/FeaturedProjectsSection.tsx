'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Item = {
  title: string;
  association?: string;
  period?: string;
  summary: string;
  features: string[];
  skills: string[];
  links?: { label: string; href: string }[];
  image?: string;
  tags?: string[];
};

const items: Item[] = [
  {
    title: 'Dev Visualize',
    association: 'Adventure Dhaka Limited',
    period: 'Mar 2026 — Present',
    summary:
      'A platform with interactive, animated visualizations for complex full‑stack concepts, designed to help developers grasp internal flows and event loops.',
    features: [
      'Interactive simulations with pause/step‑through and speed control',
      'Modular scenarios: Request lifecycle, React reconciliation, PWA service worker',
      'GSAP‑powered micro‑interactions and Three.js visual layers',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Three.js'],
    links: [{ label: 'Live Link', href: '#' }],
    image: '/project-placeholder.svg',
    tags: ['Own Project'],
  },
  {
    title: 'SPORE FALL – Sci‑Fi Spore Saga',
    association: 'Adventure Dhaka Limited',
    period: 'Feb 2026 — Present',
    summary:
      'A sci‑fi saga blending narrative, community, and commerce — built on Next.js 18 with app router and edge rendering for performance and growth.',
    features: [
      'User‑generated scenes with cross‑device sync and moderated feeds',
      'Composable content model with MDX, CMS, and search',
      'Multi‑tenant content shards and analytics for growth insights',
    ],
    skills: ['Next.js', 'MDX', 'Edge Runtime', 'Analytics', 'CMS'],
    image: '/project-placeholder.svg',
    tags: ['International', 'Singapore'],
  },
  {
    title: 'Loud Spectrum – Terpene E‑Commerce',
    period: 'Feb 2025 — Present',
    summary:
      'Production Next/React/Tailwind storefront for a terpene manufacturer: account management, dynamic pricing, and order analytics.',
    features: [
      'Reusable design system with Storybook and visual regression',
      'Inventory and pricing engines with admin dashboards',
      'Optimized images and caching for sub‑second LCP',
    ],
    skills: ['Next.js', 'Tailwind CSS', 'SSR', 'Storybook'],
    image: '/project-placeholder.svg',
    tags: ['Client', 'USA'],
  },
];

export default function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id='featured' ref={sectionRef}>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-8'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            FEATURED
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold mb-10'>
          <span className='text-primary'>Featured</span> Projects
        </h2>

        <div ref={gridRef} className='grid grid-cols-1 gap-6'>
          {items.map((p) => (
            <div key={p.title} className='feat-card rounded-2xl border border-surface-hover p-6 md:p-8'>
              {p.image && (
                <div className='relative aspect-video w-full rounded-xl border border-surface-hover bg-background/50 overflow-hidden mb-6'>
                  <Image src={p.image} alt={`${p.title} preview`} fill className='object-cover' />
                </div>
              )}
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <div className='text-2xl font-extrabold flex items-center gap-2'>
                    <Sparkles className='text-primary' size={18} /> {p.title}
                  </div>
                  <div className='text-sm text-primary mt-1'>{p.association ? p.association : ''}</div>
                </div>
                {p.period && <div className='text-sm text-text-muted'>{p.period}</div>}
              </div>

              {p.tags && p.tags.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-2'>
                  {p.tags.map((t) => (
                    <span key={t} className='rounded-full border border-surface-hover bg-background/60 px-3 py-1 text-xs text-text-muted'>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <p className='mt-4 text-text-muted'>{p.summary}</p>

              <ul className='mt-4 space-y-2'>
                {p.features.map((f, i) => (
                  <li key={i} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-primary/80' />
                    <span className='text-text-muted'>{f}</span>
                  </li>
                ))}
              </ul>

              <div className='mt-6 flex flex-wrap gap-2'>
                {p.skills.map((s) => (
                  <span
                    key={s}
                    className='rounded-full border border-surface-hover bg-background/50 px-3 py-1 text-xs text-text-muted'>
                    {s}
                  </span>
                ))}
              </div>

              {p.links && p.links.length > 0 && (
                <div className='mt-6 flex flex-wrap gap-3'>
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors'>
                      {l.label} <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
