'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { onIntroDone } from '@/lib/intro';
import { profile } from '@/lib/data';
import LocalTime from './LocalTime';
import Magnetic from './Magnetic';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Journey', href: '#journey' },
  { name: 'Writing', href: '#writing' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '#contact' },
];

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const island = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Section anchors only exist on the home page; elsewhere they route back to it.
  const resolve = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href);
  const active = isHome ? section : (links.find((l) => l.href === pathname)?.href ?? null);

  // Drop the island in once the intro curtain lifts.
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.set(island.current, { yPercent: -160, opacity: 0 });
    return onIntroDone(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to(island.current, { yPercent: 0, opacity: 1, duration: 1.2 })
        .from('[data-nav-item]', { y: -12, opacity: 0, stagger: 0.05, duration: 0.8 }, '-=0.9');
    });
  });

  // Compact mode + page progress, and scroll-spy for the home sections.
  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set('[data-progress]', { scaleX: self.progress });
          setCompact(self.scroll() > 80);
        },
      });
      if (!isHome) return;
      links
        .filter((l) => l.href.startsWith('#'))
        .forEach((l) => {
          const el = document.querySelector(l.href);
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive) setSection(l.href);
              else setSection((cur) => (cur === l.href ? null : cur));
            },
          });
        });
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  // Glide the gradient pill to whatever is hovered, falling back to the active section.
  useEffect(() => {
    const target = hovered ?? active;
    const el = target ? nav.current?.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    if (!el) {
      gsap.to(pill.current, { opacity: 0, scale: 0.8, duration: 0.3 });
      return;
    }
    gsap.to(pill.current, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
  }, [hovered, active, compact]);

  useEffect(() => {
    if (!menu.current) return;
    if (open) {
      gsap.set(menu.current, { display: 'flex' });
      gsap
        .timeline()
        .fromTo(menu.current, { clipPath: 'circle(0% at 50% 0%)' }, { clipPath: 'circle(150% at 50% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .from(menu.current.querySelectorAll('[data-link]'), { yPercent: 120, rotateX: -60, stagger: 0.06, duration: 0.7, ease: 'expo.out' }, '-=0.4')
        .from(menu.current.querySelectorAll('[data-menu-foot]'), { y: 20, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'expo.out' }, '-=0.5');
    } else {
      gsap.to(menu.current, {
        clipPath: 'circle(0% at 50% 0%)',
        duration: 0.55,
        ease: 'expo.inOut',
        onComplete: () => void gsap.set(menu.current, { display: 'none' }),
      });
    }
  }, [open]);

  return (
    <>
      <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          ref={island}
          className={`nav-border pointer-events-auto mx-auto rounded-full p-px shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] transition-[max-width] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
            compact ? 'max-w-[880px]' : 'max-w-[1180px]'
          }`}
        >
          <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-full bg-[#090a12]/80 py-1.5 pl-1.5 pr-1.5 backdrop-blur-2xl sm:pr-2">
            {/* Brand */}
            <Link
              data-nav-item
              href={isHome ? '#top' : '/'}
              data-cursor={isHome ? 'Top' : 'Home'}
              className="group flex shrink-0 items-center gap-2.5 rounded-full pr-2"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[image:var(--gradient)] font-display text-[13px] font-extrabold text-background transition-transform duration-500 group-hover:rotate-[360deg]">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
              <span className={`flex flex-col leading-none transition-all duration-500 ${compact ? 'hidden lg:flex' : 'flex'}`}>
                <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
                <span className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available
                </span>
              </span>
            </Link>

            {/* Links */}
            <nav ref={nav} onMouseLeave={() => setHovered(null)} className="relative hidden items-center md:flex">
              <span
                ref={pill}
                aria-hidden
                className="absolute left-0 top-0 h-full rounded-full bg-white/[0.07] opacity-0 ring-1 ring-white/10"
              >
                <span className="absolute inset-x-3 -bottom-px h-px bg-[image:var(--gradient)]" />
              </span>
              {links.map((l) => {
                const isActive = active === l.href;
                return (
                  <Link
                    key={l.href}
                    data-nav-item
                    data-href={l.href}
                    href={resolve(l.href)}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? (isHome ? 'location' : 'page') : undefined}
                    className={`group relative z-10 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 lg:px-4 ${
                      isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <Roll>{l.name}</Roll>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <span data-nav-item className={`hidden font-mono text-[11px] tabular-nums text-muted lg:inline ${compact ? 'lg:hidden' : ''}`}>
                DHK <LocalTime />
              </span>
              <Magnetic className="hidden md:inline-block" strength={0.25}>
                <a
                  data-nav-item
                  href={`mailto:${profile.email}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background"
                >
                  <span className="absolute inset-0 translate-y-full bg-[image:var(--gradient)] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0" />
                  <span className="relative">
                    <Roll>Let&apos;s talk</Roll>
                  </span>
                  <span className="relative grid h-5 w-5 place-items-center rounded-full bg-background text-[10px] text-foreground transition-transform duration-500 group-hover:rotate-[-45deg]">
                    →
                  </span>
                </a>
              </Magnetic>
              <button
                data-nav-item
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="relative grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/10 md:hidden"
              >
                <span className={`absolute h-[1.5px] w-4 rounded bg-foreground transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
                <span className={`absolute h-[1.5px] w-4 rounded bg-foreground transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
              </button>
            </div>

            {/* Page progress, tucked along the island's bottom edge */}
            <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden">
              <span data-progress className="block h-full origin-left scale-x-0 bg-[image:var(--gradient)]" />
            </span>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div ref={menu} className="fixed inset-0 z-[45] hidden flex-col overflow-hidden justify-between bg-background/95 px-4 pb-8 pt-24 backdrop-blur-xl md:hidden">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-24 h-60 w-60 rounded-full bg-accent-2/15 blur-3xl" />
        <nav className="relative flex flex-col [perspective:600px]">
          {links.map((l, i) => {
            const isActive = active === l.href;
            return (
              <div key={l.href} className="overflow-hidden border-b border-line">
                <Link
                  data-link
                  href={resolve(l.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-2.5 font-display text-[9.5vw] font-extrabold uppercase leading-none tracking-tight"
                >
                  <span className={isActive ? 'text-gradient' : ''}>{l.name}</span>
                  <span className="font-mono text-xs font-normal text-muted">0{i + 1}</span>
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="relative grid grid-cols-2 gap-3">
          <a data-menu-foot href={`mailto:${profile.email}`} className="col-span-2 rounded-2xl bg-[image:var(--gradient)] p-4 text-background">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">Start a project</div>
            <div className="mt-1 truncate text-sm font-semibold">{profile.email}</div>
          </a>
          <div data-menu-foot className="rounded-2xl glass p-4">
            <div className="eyebrow !text-[10px]">Local time</div>
            <div className="mt-1 font-mono text-sm">
              <LocalTime />
            </div>
          </div>
          <div data-menu-foot className="flex flex-col justify-center gap-1.5 rounded-2xl glass p-4">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
