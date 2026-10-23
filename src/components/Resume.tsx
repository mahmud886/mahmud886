'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { building, caseStudies, experience, profile, resumeProjects } from '@/lib/data';

/*
 * One column, standard headings, real text: ATS parsers read it top to bottom exactly as a
 * person does. No tables, no text in images, no icons standing in for words. Contact
 * details sit in the body (not a print header), and every link is written out in full.
 */

const projects = resumeProjects.map((r) => ({ ...caseStudies.find((p) => p.slug === r.slug)!, bullets: r.bullets }));
const others = [...caseStudies.filter((p) => !resumeProjects.some((r) => r.slug === p.slug)), ...building];

const bare = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const dates = (s: string) => s.replace(' — ', ' – ');

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-sheet-item className="mt-6 first:mt-0">
      <h2 className="border-b border-[#d9d9d4] pb-1 text-[12.5px] font-extrabold uppercase text-[#111]">{title}</h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((b) => (
        <li key={b} className="relative pl-4 text-[12.5px] leading-[1.55] text-[#2e2e2c] before:absolute before:left-0 before:top-[0.62em] before:h-[4px] before:w-[4px] before:rounded-full before:bg-[#111]">
          {b}
        </li>
      ))}
    </ul>
  );
}

/** Title on the left, dates on the right — the line ATS parsers look for. */
function Entry({ title, sub, when, children }: { title: React.ReactNode; sub?: React.ReactNode; when: string; children?: React.ReactNode }) {
  return (
    <div className="resume-avoid-break">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[13.5px] font-bold text-[#111]">{title}</h3>
        <span className="shrink-0 text-[12px] font-semibold tabular-nums text-[#111]">{when}</span>
      </div>
      {sub && <div className="text-[12.5px] text-[#55554f]">{sub}</div>}
      {children}
    </div>
  );
}

export default function Resume() {
  const root = useRef<HTMLDivElement>(null);
  const github = profile.socials.find((s) => s.label === 'GitHub')!.href;
  const linkedin = profile.socials.find((s) => s.label === 'LinkedIn')!.href;

  // Browsers name a printed PDF (and set its Title) from document.title, so make it the name.
  useEffect(() => {
    let previous = document.title;
    const before = () => {
      previous = document.title;
      document.title = `${profile.fullName} — ${profile.role} Resume`;
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
        .from('[data-resume-top] > *', { opacity: 0, stagger: 0.08, duration: 0.9 })
        .from('[data-sheet-item]', { opacity: 0, stagger: 0.05, duration: 0.8 }, 0.2);
    },
    { scope: root }
  );

  const contact = [
    { label: profile.location, href: undefined },
    { label: profile.phone, href: `tel:${profile.phone}` },
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: bare(linkedin), href: linkedin },
    { label: bare(github), href: github },
    { label: bare(profile.site), href: profile.site },
  ];

  return (
    <main ref={root} className="resume-page relative z-10 px-3 pb-24 pt-[calc(var(--hh)+32px)] sm:px-8">
      <div data-resume-top className="resume-chrome mx-auto mb-8 flex max-w-[860px] flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label mb-3">{profile.years}+ years · ATS-ready · 2 pages</p>
          <h1 className="text-[clamp(3.4rem,9vw,7rem)] font-extrabold leading-[0.85] tracking-[-0.065em]">
            Resume<span className="stop">.</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={profile.cv} download={`${profile.cvName}.pdf`} className="pill-solid">
            Download PDF ↓
          </a>
          <button onClick={() => window.print()} className="pill h-12 px-6">
            Print
          </button>
        </div>
      </div>

      <div>
        <article
          data-sheet
          className="resume-sheet relative mx-auto max-w-[860px] origin-top rounded-[6px] border border-line bg-white px-5 py-8 font-sans text-[#111] print:font-[family-name:var(--font-resume)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:px-12 sm:py-11"
        >
          <header data-sheet-item className="border-b-2 border-[#111] pb-4">
            <h2 className="text-[34px] font-extrabold uppercase leading-none tracking-[-0.03em] sm:text-[40px]">{profile.fullName}</h2>
            <p className="mt-1.5 text-[15px] font-semibold text-[#2e2e2c] sm:text-[16px]">{profile.headline}</p>
            <address className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0 text-[12px] not-italic leading-snug text-[#2e2e2c]">
              {contact.map((c, i) => (
                <span key={c.label} className="whitespace-nowrap">
                  {c.href ? (
                    <a href={c.href} className="inline-block py-1 underline decoration-[#bdbdb7] underline-offset-2 print:py-0">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                  {i < contact.length - 1 && <span className="ml-2 text-[#9a9a94]">|</span>}
                </span>
              ))}
            </address>
          </header>

          <div className="mt-5">
            <Section title="Summary">
              <p className="text-[12.8px] leading-[1.6] text-[#2e2e2c]">{profile.summary}</p>
            </Section>

            <Section title="Skills">
              <dl className="space-y-1 text-[12.5px] leading-[1.55]">
                {Object.entries(profile.skillsResume).map(([k, v]) => (
                  <div key={k}>
                    <dt className="inline font-bold text-[#111]">{k}: </dt>
                    <dd className="inline text-[#2e2e2c]">{v.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section title="Professional Experience">
              <div className="space-y-4">
                {experience.map((j) => (
                  <Entry key={j.slug} title={j.role} sub={`${j.company} · Dhaka, Bangladesh`} when={dates(j.period)}>
                    <Bullets items={j.resume} />
                  </Entry>
                ))}
              </div>
            </Section>

            <Section title="Projects">
              <div className="space-y-3.5">
                {projects.map((p) => (
                  <Entry
                    key={p.slug}
                    title={
                      <>
                        {p.title} <span className="font-semibold text-[#55554f]">— {p.kind}</span>
                      </>
                    }
                    sub={
                      <>
                        {p.association}
                        {p.link && (
                          <>
                            {' · '}
                            <a href={p.link} className="underline decoration-[#bdbdb7] underline-offset-2">
                              {bare(p.link)}
                            </a>
                          </>
                        )}
                      </>
                    }
                    when={dates(p.period)}
                  >
                    <Bullets items={p.bullets} />
                    <p className="mt-1 pl-4 text-[11.5px] text-[#55554f]">
                      <span className="font-semibold text-[#2e2e2c]">Tech:</span> {p.stack.join(', ')}
                    </p>
                  </Entry>
                ))}
                <p className="resume-avoid-break text-[12px] leading-[1.55] text-[#2e2e2c]">
                  <span className="font-bold text-[#111]">Also built: </span>
                  {others.map((o) => o.title).join(', ')}.
                </p>
              </div>
            </Section>

            <Section title="Education">
              {profile.education.slice(0, 1).map((e) => (
                <Entry key={e.title} title={e.title} sub={`${e.place}${e.note ? ` · ${e.note}` : ''}`} when={e.period} />
              ))}
            </Section>

            <Section title="Certifications">
              <div className="space-y-1">
                {profile.certifications.map((c) => (
                  <Entry
                    key={c.title}
                    title={
                      <>
                        {c.title}, <span className="font-normal text-[#55554f]">{c.issuer}{c.credential ? ` (ID ${c.credential})` : ''}</span>
                      </>
                    }
                    when={dates(c.period)}
                  />
                ))}
              </div>
            </Section>

          </div>
        </article>
      </div>
    </main>
  );
}
