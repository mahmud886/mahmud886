'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { experience, moreProjects, profile, projects } from '@/lib/data';
import Magnetic from './Magnetic';

// Classic single-column layout modelled on the PDF resume: easy for humans and ATS parsers alike.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-sheet-item className="mt-7 first:mt-0">
      <h2 className="border-b border-[#dcdce4] pb-1.5 text-[19px] font-light tracking-tight text-[#1a1a22] sm:text-[21px]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 pl-1">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-[13px] leading-relaxed text-[#3b3b46]">
          <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1a1a22]" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  const root = useRef<HTMLDivElement>(null);
  const url = (u: string) => u.replace('https://', '');

  // Browsers name a printed PDF after document.title, so swap it for the file name while printing.
  useEffect(() => {
    let previous = document.title;
    const before = () => {
      previous = document.title;
      document.title = profile.cvName;
    };
    const after = () => {
      document.title = previous;
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('[data-resume-top] > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.9 })
        .fromTo('[data-sheet]', { rotateX: 24, y: 120, opacity: 0, scale: 0.95 }, { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: 1.4 }, 0.1)
        .from('[data-sheet-item]', { y: 20, opacity: 0, stagger: 0.05, duration: 0.8 }, 0.55);
    },
    { scope: root }
  );

  return (
    <main ref={root} className="resume-page relative z-10 px-3 pb-24 pt-24 sm:px-8 sm:pt-32">
      <div data-resume-top className="resume-chrome mx-auto mb-8 flex max-w-[860px] flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-3">— Curriculum vitae</p>
          <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            Resume<span className="text-gradient">.</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <a
              href={profile.cv}
              download={`${profile.cvName}.pdf`}
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient)] px-5 py-3 text-sm font-semibold text-background"
            >
              Download PDF ↓
            </a>
          </Magnetic>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm">
            Print
          </button>
        </div>
      </div>

      <div className="[perspective:1600px]">
        <article
          data-sheet
          className="resume-sheet relative mx-auto max-w-[860px] origin-top rounded-[6px] bg-white px-5 py-8 text-[#1a1a22] shadow-[0_40px_120px_-20px_rgba(124,92,255,0.45)] sm:px-12 sm:py-12"
        >
          {/* Header */}
          <header data-sheet-item className="flex flex-col gap-4 border-b border-[#dcdce4] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[30px] font-light uppercase leading-none tracking-tight sm:text-[40px]">{profile.fullName}</div>
              <div className="mt-2 text-[17px] text-[#3b3b46] sm:text-[19px]">{profile.role}</div>
            </div>
            <address className="space-y-0.5 text-[12px] not-italic leading-snug text-[#3b3b46] sm:text-right">
              <div>{profile.address}</div>
              <div>
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </div>
              <div>
                <a href={`mailto:${profile.email}`} className="text-[#0e8fa0] underline underline-offset-2">
                  {profile.email}
                </a>
              </div>
              {profile.socials.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-[#0e8fa0] underline underline-offset-2">
                    {url(s.href).replace('www.', '')}
                  </a>
                </div>
              ))}
              <div>
                <a href={profile.site} className="text-[#0e8fa0] underline underline-offset-2">
                  {url(profile.site)}
                </a>
              </div>
            </address>
          </header>

          <p data-sheet-item className="mt-5 text-[13.5px] leading-relaxed text-[#3b3b46]">
            {profile.summary}
          </p>

          <div className="mt-7">
            <Section title="Skills">
              <dl className="space-y-1.5 text-[13px] leading-relaxed">
                {Object.entries(profile.skillsResume).map(([k, v]) => (
                  <div key={k}>
                    <dt className="inline font-semibold text-[#1a1a22]">{k}: </dt>
                    <dd className="inline text-[#55556a]">{v.join(', ')}.</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section title="Professional Experience">
              <div className="space-y-5">
                {experience.map((j) => (
                  <div key={j.slug} className="resume-avoid-break">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[14px] font-semibold">{j.role}</div>
                        <div className="text-[13px] text-[#3b3b46]">{j.company}, Dhaka</div>
                      </div>
                      <div className="shrink-0 pt-3 text-[12.5px] font-semibold">{j.period.replace('—', '–')}</div>
                    </div>
                    <Bullets items={j.resume} />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Selected Projects">
              <div className="space-y-5">
                {projects.map((p) => (
                  <div key={p.slug} className="resume-avoid-break">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[14px] font-semibold">
                          {p.title}{' '}
                          <a href={p.link} target="_blank" rel="noreferrer" className="text-[12px] font-normal text-[#0e8fa0] underline underline-offset-2">
                            {url(p.link).replace(/\/$/, '')}
                          </a>
                        </div>
                        <div className="text-[13px] text-[#3b3b46]">
                          {p.kind} · {p.association}
                        </div>
                      </div>
                      <div className="shrink-0 pt-3 text-[12.5px] font-semibold">{p.period.replace('—', '–')}</div>
                    </div>
                    <Bullets items={[p.description, ...p.features.slice(0, 2)]} />
                    <div className="mt-1.5 pl-[22px] text-[12px] text-[#6b6b7b]">
                      <span className="font-semibold text-[#3b3b46]">Stack:</span> {p.stack.join(', ')}
                    </div>
                  </div>
                ))}
                <div className="resume-avoid-break grid gap-3 sm:grid-cols-2">
                  {moreProjects.map((p) => (
                    <div key={p.title} className="text-[13px] leading-relaxed text-[#3b3b46]">
                      <span className="font-semibold text-[#1a1a22]">{p.title}</span> — {p.kind}. {p.description}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Education">
              <div className="space-y-3">
                {profile.education.map((e) => (
                  <div key={e.title} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[14px] font-semibold">{e.place}</div>
                      <div className="text-[13px] text-[#3b3b46]">
                        {e.title}
                        {e.note ? `, ${e.note}` : ''}
                      </div>
                    </div>
                    <div className="shrink-0 text-[12.5px] font-semibold">{e.period}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Certifications">
              <div className="space-y-3">
                {profile.certifications.map((c) => (
                  <div key={c.title} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[14px] font-semibold">{c.title}</div>
                      <div className="text-[13px] text-[#3b3b46]">
                        {c.issuer}
                        {c.credential ? ` · Credential ID ${c.credential}` : ''}
                      </div>
                    </div>
                    <div className="shrink-0 text-[12.5px] font-semibold">{c.period.replace('—', '–')}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </article>
      </div>
    </main>
  );
}
