'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Cert = {
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  note?: string;
};

const items: Cert[] = [
  {
    title: 'Reactive Accelerator - Batch 1 LWS',
    issuer: 'Learn with Sumit (LWS)',
    issued: 'Jan 2024',
    expires: 'Jun 2024',
    credentialId: 'LWSCTXN-UZELD7KP',
    credentialUrl: '#',
    skills: ['Advanced JS', 'React.js', 'TypeScript', 'State Management', 'Testing', 'Performance'],
  },
  {
    title: 'Complete Web Development With Programming Hero',
    issuer: 'Programming Hero',
    issued: 'Jan 2020',
    expires: 'Apr 2020',
    credentialUrl: '#',
    note: 'Grateful to the Programming Hero team for mentorship and guidance.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
  },
];

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef}>
      <div className="rounded-3xl border border-surface-hover bg-surface p-8 md:p-12">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            CERTIFICATIONS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Licenses <span className="text-primary">& Certifications</span>
        </h2>
        <div ref={listRef} className="space-y-6">
          {items.map((c) => (
            <div key={c.title} className="cert-card rounded-2xl border border-surface-hover p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-bold">{c.title}</div>
                  <div className="text-primary">{c.issuer}</div>
                </div>
                <div className="text-sm text-text-muted">
                  <span>Issued {c.issued}</span>
                  {c.expires && <span> — Expires {c.expires}</span>}
                </div>
              </div>
              {c.credentialId && (
                <div className="mt-2 text-sm text-text-muted">Credential ID: {c.credentialId}</div>
              )}
              {(c.credentialUrl || c.note) && (
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-sm font-medium hover:border-primary/50 transition-colors"
                    >
                      Show credential <ExternalLink size={16} />
                    </a>
                  )}
                  {c.note && <div className="text-text-muted text-sm">{c.note}</div>}
                </div>
              )}
              {c.skills && c.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-full border border-surface-hover bg-background/50 px-3 py-1 text-xs text-text-muted">
                      {s}
                    </span>
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

