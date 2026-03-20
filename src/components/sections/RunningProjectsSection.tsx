'use client';

import RunningProjectModal, { RunningProject } from '@/components/ui/RunningProjectModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Running = {
  slug: string;
  name: string;
  since: string;
  status: 'Active' | 'Paused';
  blurb: string;
  milestones: string[];
  progress?: number;
  link?: string;
  image?: string;
  tags?: string[];
  tech?: string[];
  features?: string[];
};

const items: Running[] = [
  {
    slug: 'dev-visualize',
    name: 'Developer Knowledge Visualizer',
    since: '2026',
    status: 'Active',
    blurb: 'Interactive visual narratives for dev concepts; currently expanding modules for React Server Components.',
    milestones: ['Module framework v2', 'RSC lifecycle diagrams', 'Content authoring UI'],
    progress: 65,
    link: 'https://dev-visualize.vercel.app/',
    image: '/assets/images/projects/dev-visualize/image-1.png',
    tags: ['Own Project'],
    tech: ['Next.js', 'React', 'TypeScript', 'Three.js', 'GSAP'],
    features: ['RSC lifecycle module', 'Interactive controls', 'Authoring UI'],
  },
  {
    slug: 'sporefall',
    name: 'Spore Saga Platform',
    since: '2026',
    status: 'Active',
    blurb: 'Narrative + community + commerce stack with analytics and moderation tooling.',
    milestones: ['Scene composer alpha', 'Moderation queue', 'Edge analytics MVP'],
    progress: 40,
    link: 'https://www.sporefall.com/',
    image: '/assets/images/projects/sporefall/image-1.png',
    tags: ['International', 'Singapore'],
    tech: ['Next.js', 'Edge', 'MDX', 'Analytics'],
    features: ['Scene composer', 'Moderation queue', 'Edge analytics'],
  },
  {
    slug: 'loud-spectrum',
    name: 'Loud Spectrum E‑commerce',
    since: '2025',
    status: 'Active',
    blurb: 'Production storefront with account management, pricing, and order analytics.',
    milestones: ['Design system rollout', 'Admin dashboard', 'A/B image optimization'],
    progress: 80,
    link: 'https://loudspectrum.com/en',
    image: '/assets/images/projects/loud-spectrum/image-1.png',
    tags: ['Client', 'USA'],
    tech: ['Next.js', 'Tailwind', 'Storybook', 'SSR'],
    features: ['Design system', 'Admin dashboard', 'Optimized media'],
  },
];

export default function RunningProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<RunningProject | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.running-card',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id='running' ref={sectionRef}>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-8'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            RUNNING
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold mb-10'>
          Currently <span className='text-primary'>Running</span>
        </h2>

        <div ref={listRef} className='flex flex-col gap-6'>
          {items.map((r) => (
            <RunningCard key={r.slug} item={r} onOpen={() => setSelected(r as RunningProject)} />
          ))}
        </div>
        <RunningProjectModal project={selected} open={!!selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}

function RunningCard({ item, onOpen }: { item: Running; onOpen: () => void }) {
  const [candidates] = useState<string[]>([
    // Prefer explicit image path when provided to avoid 404s
    item.image || `/assets/images/projects/${item.slug}/image-1.png`,
    // Only try numbered variants that exist in this repo
    `/assets/images/projects/${item.slug}/image-1.png`,
    `/assets/images/projects/${item.slug}/image-2.png`,
    `/assets/images/projects/${item.slug}/image-3.png`,
    // Hyphenless folder fallbacks
    `/assets/images/projects/${item.slug.replace(/-/g, '')}/image-1.png`,
    `/assets/images/projects/${item.slug.replace(/-/g, '')}/image-1.png`,
    `/assets/images/projects/${item.slug.replace(/-/g, '')}/image-2.png`,
    `/assets/images/projects/${item.slug.replace(/-/g, '')}/image-3.png`,
    '/project-placeholder.svg',
  ]);
  const [srcIndex, setSrcIndex] = useState(0);
  const src = candidates[srcIndex] ?? '/project-placeholder.svg';
  return (
    <div
      className='running-card rounded-2xl border border-surface-hover p-6 hover:border-primary/40 transition-colors cursor-pointer'
      onClick={onOpen}>
      <div className='relative aspect-video w-full rounded-xl border border-surface-hover bg-background/50 overflow-hidden mb-4'>
        <Image
          src={src}
          alt={`${item.name} preview`}
          fill
          className='object-cover'
          onError={() => setSrcIndex((i) => Math.min(i + 1, candidates.length - 1))}
          sizes='(max-width: 768px) 100vw, 800px'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='text-xl font-bold flex items-center gap-2'>
          <PlayCircle className='text-primary' size={18} /> {item.name}
        </div>
        <div className='text-xs rounded-full px-2.5 py-1 border border-surface-hover bg-background/60'>
          {item.status} · Since {item.since}
        </div>
      </div>
      <p className='mt-3 text-text-muted'>{item.blurb}</p>
      {item.tags && item.tags.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-2'>
          {item.tags.map((t) => (
            <span
              key={t}
              className='rounded-full border border-surface-hover bg-background/60 px-3 py-1 text-xs text-text-muted'>
              {t}
            </span>
          ))}
        </div>
      )}
      {typeof item.progress === 'number' && (
        <div className='mt-4'>
          <div className='flex items-center justify-between text-xs text-text-muted mb-1'>
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>
          <div className='h-1.5 w-full rounded-full bg-background overflow-hidden'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-primary to-secondary'
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}
      <div className='mt-4 flex flex-wrap gap-2'>
        {item.milestones.map((m) => (
          <span
            key={m}
            className='rounded-full border border-surface-hover bg-background/50 px-3 py-1 text-xs text-text-muted'>
            {m}
          </span>
        ))}
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-xs font-bold hover:border-primary/50 transition-colors'>
          Quick View
        </button>
        {item.link && (
          <a
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-xs font-medium hover:border-primary/50 transition-colors'
            onClick={(e) => e.stopPropagation()}>
            Open Live
          </a>
        )}
      </div>
    </div>
  );
}
