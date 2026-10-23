'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { profile } from '@/lib/data';
import Scramble from '@/components/Scramble';

/** Sets the font size so the word spans its container exactly, edge to edge. */
function Wordmark({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const parent = el.parentElement!;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = el.getBoundingClientRect().width;
      if (w) el.style.fontSize = `${(100 * parent.clientWidth) / w}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  return (
    <span className="wordmark-mask" aria-hidden>
      <span ref={ref} className="wordmark text-[22vw]">
        {[...text].map((c, k) => (
          <span key={k} style={{ ['--k' as string]: k }}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

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
  const line = key ? lineFor(Number(day), Number(hour)) : profile.tagline;
  return (
    <div className="max-w-[24ch] lg:justify-self-end">
      <p className="text-[clamp(1.15rem,1.7vw,1.6rem)] font-medium leading-[1.18] tracking-[-0.02em]">{line}</p>
      <p className="label mt-3" suppressHydrationWarning>
        {key ? (
          <>
            {local} for you · {dhaka} in Dhaka
          </>
        ) : (
          'Dhaka · Worldwide'
        )}
      </p>
    </div>
  );
}

const META = ['Software Engineer', 'Builds SaaS · Dhaka', `${profile.years}+ years shipping`, 'Available for work'];

export default function Hero() {
  return (
    <section className="px-[var(--pad)] pb-[clamp(32px,5vw,72px)] pt-[calc(var(--hh)+8px)]">
      <h1 className="sr-only">
        {profile.name} — {profile.role}
      </h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-ink pb-[clamp(16px,2.6vw,40px)] pt-2.5 font-mono text-[11px] uppercase tracking-[0.12em] md:grid-cols-4">
        {META.map((m, i) => (
          <span key={m} className={i === 3 ? 'text-right' : i === 1 ? 'text-right md:text-left' : ''}>
            {i === 3 && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink align-middle" />}
            <Scramble text={m} delay={250 + i * 120} />
          </span>
        ))}
      </div>

      <Wordmark text={profile.lastName.toUpperCase()} />

      <div className="mt-[clamp(20px,3vw,44px)] grid items-end gap-8 border-t border-ink pt-[clamp(16px,2vw,28px)] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-16">
        <p className="serif-i text-[clamp(5rem,13vw,13.5rem)] leading-[0.78] tracking-[-0.04em]" data-reveal>
          Hello<span className="not-italic">.</span>
        </p>
        <div className="max-w-[44ch] pb-[0.4em]" data-reveal style={{ ['--i' as string]: 1 }}>
          <p className="text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed text-ink-2">
            I’m <b className="font-semibold text-ink">{profile.firstName}</b> — {profile.intro}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#products" className="pill-solid">
              See my products ↓
            </Link>
            <a href={profile.cv} download={`${profile.cvName}.pdf`} className="pill h-12 px-6">
              Download CV
            </a>
          </div>
        </div>
        <div className="pb-[0.4em]" data-reveal style={{ ['--i' as string]: 2 }}>
          <Greeting />
        </div>
      </div>
    </section>
  );
}
