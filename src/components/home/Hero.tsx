'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { profile, saas } from '@/lib/data';
import { useMotion } from '@/lib/motion';
import { MENU_EVENT, PALETTE_EVENT, toggleTheme } from '@/lib/nav';
import { Logo } from '@/components/Header';
import LineSculpture from '@/components/LineSculpture';

function subscribeMinute(cb: () => void) {
  const id = setInterval(cb, 20_000);
  return () => clearInterval(id);
}

const timeFmt = (tz?: string) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });

function nowKey() {
  const d = new Date();
  return `${d.getDay()}|${d.getHours()}|${timeFmt().format(d)}|${timeFmt(profile.timezone).format(d)}`;
}

function lineFor(day: number, h: number) {
  const weekend = day === 0 || day === 6;
  if (h < 5) return 'Up late? So am I, usually — that is when the best animations happen.';
  if (weekend) return 'Here on a weekend? Respect. Good ideas don’t keep office hours.';
  if (h < 9) return 'You’re up early. Coffee first, components second.';
  if (h < 12) return 'Morning. Fresh build, clean console. Good time to talk.';
  if (h < 17) return 'Afternoon. The best hour to ship something small and fast.';
  if (h < 21) return 'Evening. The day’s done — the ideas aren’t.';
  return 'Late one. Big ideas don’t clock out either.';
}

/** "Hello." plus a line written for the visitor's time of day. Neutral on the server. */
function Greeting() {
  const key = useSyncExternalStore(subscribeMinute, nowKey, () => '');
  const [day, hour, local, dhaka] = key.split('|');
  return (
    <div>
      <p className="script pl-[0.06em] text-[clamp(5rem,9vw,9.5rem)] leading-[0.8]">Hello.</p>
      <p className="mt-3 max-w-[26ch] text-[clamp(1rem,1.2vw,1.15rem)] font-medium leading-snug tracking-[-0.01em]">
        {key ? lineFor(Number(day), Number(hour)) : profile.tagline}
      </p>
      <p className="label mt-2 [@media(min-width:1024px)_and_(max-height:840px)]:hidden" suppressHydrationWarning>
        {key ? `${local} for you · ${dhaka} in Dhaka` : 'Dhaka · Worldwide'}
      </p>
    </div>
  );
}

const NAV = [
  { id: 'products', label: 'SaaS' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
];
const FORMS = ['Frontend', 'Motion & 3D', 'Performance', 'Design systems'];
const TAGS = ['SaaS', 'Next.js', 'Motion & 3D'];

const round = 'grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:bg-ink hover:text-paper';

/**
 * The hero is one dark card with page-coloured tabs carved out of its corners: the nav
 * top-left, the tools top-right, the introduction bottom-left and the featured products
 * bottom-right. The middle holds the greeting and the line sculpture.
 */
export default function Hero() {
  const { paused, toggle } = useMotion();
  const [form, setForm] = useState(0);

  // The sculpture walks through its forms on its own while motion plays.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setForm((n) => (n + 1) % FORMS.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const featured = saas.slice(0, 3);

  return (
    <section id="hero" aria-label="Introduction" className="px-[var(--pad)] pt-[var(--pad)]">
      <h1 className="sr-only">
        {profile.name} — {profile.role} building SaaS products with React, Next.js and TypeScript
      </h1>
      <div className="relative lg:h-[clamp(680px,calc(100svh-2*var(--pad)),920px)]">
        {/* The card */}
        <div className="hero-card relative h-[min(640px,150vw)] overflow-hidden rounded-[28px] lg:absolute lg:inset-0 lg:h-auto">
          <div className="absolute left-[var(--pad)] top-[96px] z-[1] lg:left-[clamp(28px,2.6vw,44px)] lg:top-[clamp(110px,13vh,140px)]">
            <Greeting />
          </div>

          <button
            type="button"
            onClick={() => setForm((n) => (n + 1) % FORMS.length)}
            data-cursor="Shift"
            aria-label={`Shift the sculpture. Showing ${FORMS[form]}.`}
            className="absolute inset-x-0 bottom-[44px] top-[34%] lg:bottom-0 lg:left-[30%] lg:right-0 lg:top-[3%]"
          >
            <LineSculpture index={form} scale={0.5} className="text-ink" />
          </button>

          <div className="absolute bottom-5 left-[var(--pad)] right-[var(--pad)] flex items-center justify-between gap-4 lg:bottom-auto lg:left-auto lg:right-[clamp(28px,2.6vw,44px)] lg:top-[clamp(96px,11vh,120px)] lg:flex-col lg:items-end">
            <span className="label" aria-live="polite">
              {String(form + 1).padStart(2, '0')} / {String(FORMS.length).padStart(2, '0')} — <b className="text-ink">{FORMS[form]}</b>
            </span>
            <span className="hidden flex-wrap justify-end gap-1.5 lg:flex">
              {FORMS.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setForm(i)}
                  aria-label={`Show ${f}`}
                  aria-pressed={i === form}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === form ? 'w-6 bg-ink' : 'w-1.5 bg-ink/35 hover:bg-ink/70'}`}
                />
              ))}
            </span>
          </div>

          <Link
            href="#products"
            className="group absolute bottom-[calc(clamp(250px,34%,320px)+28px)] right-[clamp(28px,2.6vw,44px)] hidden items-center gap-3 lg:flex"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-expo group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="text-[13px] leading-tight text-ink-2">
              Discover the
              <br />
              <b className="text-ink">products I build</b>
            </span>
          </Link>
        </div>

        {/* Top-left: identity and the chapters */}
        <div id="hero-nav" className="notch notch-tl flex h-[64px] items-center gap-5 pb-2.5 pr-3 lg:h-[72px] lg:pr-4">
          <Logo className="pl-1" />
          <nav aria-label="Sections" className="hidden items-center rounded-full border border-ink p-1 lg:flex">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`flex h-9 items-center rounded-full px-4 text-[12px] font-semibold uppercase tracking-[0.07em] transition-colors ${
                  i === 0 ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-ink hover:text-paper'
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Top-right: tools and the call to action */}
        <div className="notch notch-tr flex h-[64px] items-center gap-1.5 pb-2.5 pl-3 lg:h-[72px] lg:pl-4">
          <button type="button" onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))} aria-label="Search" title="Search" className={`${round} hidden md:grid`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode" title="Theme" className={round}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" onClick={toggle} aria-label={paused ? 'Play motion' : 'Pause motion'} aria-pressed={paused} title="Motion" className={`${round} hidden sm:grid`}>
            {paused ? (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M7 5v14l12-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            )}
          </button>
          <a
            href="#contact"
            className="group hidden h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-paper sm:flex"
          >
            Let’s talk
            <span className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(MENU_EVENT))}
            aria-label="Open menu"
            className={`${round} lg:hidden`}
          >
            <span aria-hidden className="flex w-4 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full bg-current" />
              <span className="h-[1.5px] w-2/3 bg-current" />
            </span>
          </button>
        </div>

        {/* Bottom-left: who I am */}
        <div className="notch notch-bl mt-8 lg:mt-0 lg:w-[clamp(420px,38%,560px)] lg:pr-[clamp(24px,2.4vw,40px)] lg:pt-[clamp(24px,2.4vw,40px)]">
          <div className="flex items-center gap-4">
            <span className="flex -space-x-3">
              {featured.map((p) => (
                <span key={p.slug} className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-paper bg-paper-2">
                  <Image src={p.screens[0].src} alt="" fill sizes="44px" className="object-cover object-left-top" />
                </span>
              ))}
            </span>
            <span>
              <b className="block text-[clamp(1.8rem,2.6vw,2.6rem)] font-extrabold leading-none tracking-[-0.05em]">10+</b>
              <span className="label">Products designed &amp; shipped</span>
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5 [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
            {TAGS.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1.5 text-[12px] font-medium">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[clamp(2.2rem,3.6vw,3.7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
            Software for
            <br />
            every business<span className="stop">.</span>
          </p>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-2 [@media(min-width:1024px)_and_(max-height:840px)]:hidden">
            I’m <b className="font-semibold text-ink">{profile.fullName}</b> — a software engineer in Dhaka building SaaS products and fast, animated web apps with Next.js, React and TypeScript.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#products" className="pill-solid">
              See my products ↓
            </a>
            <a href={profile.cv} download={`${profile.cvName}.pdf`} className="pill h-12 px-6">
              Download CV
            </a>
          </div>
        </div>

        {/* Bottom-right: what I'm building */}
        <div className="notch notch-br mt-10 lg:mt-0 lg:w-[clamp(340px,31%,460px)] lg:pl-[clamp(20px,2vw,32px)] lg:pt-[clamp(20px,2vw,32px)]">
          <div className="flex items-baseline justify-between">
            <span className="label !text-ink">Featured SaaS</span>
            <a href="#products" className="label hover:!text-ink">
              All 4 →
            </a>
          </div>
          <ul className="mt-3 space-y-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="group flex items-center gap-3.5 rounded-[16px] p-1.5 transition-colors hover:bg-paper-2">
                  <span className="relative h-[54px] w-[84px] shrink-0 overflow-hidden rounded-[12px] border border-line bg-paper-2">
                    <Image src={p.screens[0].src} alt="" fill sizes="84px" className="object-cover object-top" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold uppercase tracking-[-0.01em]">{p.title}</span>
                    <span className="block truncate text-[12.5px] text-ink-2">{p.kind}</span>
                  </span>
                  <span aria-hidden className="pr-2 text-ink-2 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
