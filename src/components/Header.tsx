'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/data';
import { PALETTE_EVENT, sections, THEME_EVENT, toggleTheme } from '@/lib/nav';

function ThemeIcon() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === 'dark');
    sync();
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      {dark ? (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState<string | null>(null);

  // Scroll-spy: the section crossing the upper third of the viewport is "active".
  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  const current = isHome ? active : pathname === '/resume' ? 'resume' : null;
  const items = [...sections.map((s) => ({ id: s.id, label: s.label, href: isHome ? `#${s.id}` : `/#${s.id}` })), { id: 'resume', label: 'Resume', href: '/resume' }];

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-paper/70 p-1.5 pl-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2">
          <span className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-pop">
            <Image src={profile.photo} alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Sections">
          {items.map((it) => {
            const on = current === it.id;
            return (
              <Link
                key={it.id}
                href={it.href}
                aria-current={on ? (it.id === 'resume' ? 'page' : 'location') : undefined}
                className={`relative isolate rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${on ? 'text-pop-ink' : 'text-ink-2 hover:text-ink'}`}
              >
                {on && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-pop" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
            className="flex h-9 items-center gap-2 rounded-full px-3 text-[13px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            aria-label="Open command palette"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="md:hidden">Menu</span>
            <kbd className="hidden rounded-md border border-line px-1.5 font-mono text-[10px] lg:inline">⌘K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            aria-label="Toggle dark mode"
          >
            <ThemeIcon />
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-paper transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
