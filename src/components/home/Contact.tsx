'use client';

import { useState } from 'react';
import { profile } from '@/lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });

  return (
    <section id="contact" aria-labelledby="contact-title" className="inv px-[var(--pad)] pt-[clamp(90px,12vw,190px)]">
      <p className="label mb-6" data-reveal>
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink align-middle" />
        Available for full-time roles &amp; select freelance
      </p>
      <h2 id="contact-title" className="text-[clamp(3.4rem,11vw,11.5rem)] font-extrabold leading-[0.84] tracking-[-0.065em]" data-reveal>
        Let’s build
        <br />
        something <span className="script text-[1.3em] font-normal">good.</span>
      </h2>

      <div className="mt-[clamp(40px,6vw,90px)] grid gap-8 border-t border-ink pt-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <div className="label mb-3">Write to me</div>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="Say hi"
            className="block break-all text-[clamp(1.5rem,3.6vw,3.4rem)] font-bold leading-none tracking-[-0.045em] underline decoration-2 underline-offset-[0.18em] transition-opacity hover:opacity-70"
          >
            {profile.email}
          </a>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={copy} className="pill">
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            <a href={`tel:${profile.phone}`} className="pill">
              {profile.phone}
            </a>
            <a href={profile.cv} download={`${profile.cvName}.pdf`} className="pill">
              Download CV
            </a>
          </div>
        </div>
        <ul className="border-t border-line lg:border-t-0">
          {profile.socials.map((s) => (
            <li key={s.label} className="index-row border-b border-line">
              <a href={s.href} target="_blank" rel="noreferrer" className="flex items-baseline justify-between gap-4 px-1 py-4">
                <span className="text-[clamp(1.4rem,2.2vw,2rem)] font-bold tracking-[-0.04em]">{s.label}</span>
                <span className="index-muted font-mono text-[12px] text-muted">{s.handle} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
