'use client';

import { cn } from '@/utils/cn';
import { ArrowRight, Award, FileText, FolderGit2, Home, Mail, PlayCircle, User2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type Item = {
  key: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const items: Item[] = [
  { key: 'home', href: '/#home', icon: Home },
  { key: 'about', href: '/#about', icon: User2 },
  { key: 'services', href: '/#services', icon: FolderGit2 },
  { key: 'skills', href: '/#skills', icon: FileText },
  { key: 'experience', href: '/#experience', icon: FolderGit2 },
  { key: 'education', href: '/#education', icon: FileText },
  { key: 'certifications', href: '/#certifications', icon: Award },
  { key: 'running', href: '/#running', icon: PlayCircle },
  { key: 'projects', href: '/#projects', icon: FolderGit2 },
  { key: 'blog', href: '/#blog', icon: FileText },
  { key: 'testimonials', href: '/#testimonials', icon: User2 },
  { key: 'contact', href: '/#contact', icon: Mail },
];

export default function RightRail() {
  const [active, setActive] = useState<string>('home');
  const keys = useMemo(() => items.map((i) => i.key), []);
  const sectionsRef = useRef<Record<string, Element | null>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const collect = () => {
      keys.forEach((k) => {
        sectionsRef.current[k] = document.getElementById(k);
      });
    };
    collect();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setActive(id);
          }
        });
      },
      {
        // Middle band detection for more reliable active state
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0.5],
      },
    );
    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    window.addEventListener('resize', collect);

    // rAF-based scroll fallback to keep active icon synced in tricky layouts
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const center = (window.scrollY || window.pageYOffset || 0) + window.innerHeight / 2;
        // Choose the section whose box contains the center line, or nearest below
        let best: { id: string; dist: number } | null = null;
        keys.forEach((k) => {
          const el = sectionsRef.current[k] as HTMLElement | null;
          if (!el) return;
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (center >= top && center <= bottom) {
            const dist = Math.min(center - top, bottom - center);
            if (!best || dist < best.dist) best = { id: k, dist };
          } else if (center < top) {
            const dist = top - center;
            if (!best || dist < best.dist) best = { id: k, dist };
          }
        });
        let nextId: string = active;
        // Use any to avoid TS inference edge-case in build
        const candidate: any = best;
        if (candidate && typeof candidate.id === 'string') nextId = candidate.id as string;
        if (nextId && nextId !== active) setActive(nextId);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', collect);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [keys]);

  const goNext = () => {
    const sections = keys
      .map((k) => ({ k, el: document.getElementById(k) as HTMLElement | null }))
      .filter((x): x is { k: string; el: HTMLElement } => !!x.el)
      .map(({ k, el }) => ({ k, el, top: el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) }));
    if (sections.length === 0) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
    const epsilon = 8; // small forward step
    const next = sections.filter((s) => s.top > scrollY + epsilon).sort((a, b) => a.top - b.top)[0] || sections[0];
    setActive(next.k);
    next.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <aside className='hidden md:flex fixed right-0 top-0 bottom-0 z-40 items-center pr-4'>
      <div className='flex flex-col items-center gap-3'>
        <button
          onClick={goNext}
          className='h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_0_3px_rgba(20,203,168,0.15)] hover:bg-primary-dark transition-colors'
          aria-label='Next section'>
          <ArrowRight size={18} />
        </button>
        <div className='rounded-full border border-surface-hover bg-surface/80 backdrop-blur-xl p-2 flex flex-col items-center gap-2'>
          {items.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(key);
                if (el) {
                  setActive(key);
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                history.replaceState(null, '', `/#${key}`);
              }}
              className={cn(
                'relative h-10 w-10 rounded-full flex items-center justify-center text-text-muted transition-colors',
                active === key
                  ? 'text-primary bg-background border border-surface-hover'
                  : 'hover:text-text-main hover:bg-background/60',
              )}
              aria-label={key}>
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
