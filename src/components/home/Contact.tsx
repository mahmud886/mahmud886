'use client';

import { useState } from 'react';
import { profile } from '@/lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
      <div data-reveal className="card ticks grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="label mb-4">
            <span className="text-accent">05</span> / Contact
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Have a problem <span className="font-serif font-normal italic text-accent">worth solving?</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
            Full-time roles, contracts or a hard frontend problem — I reply within a day.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Email me →
            </a>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40">
              {copied ? '✓ Copied' : 'Copy address'}
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[10px] bg-[#111216] font-mono text-[12.5px] leading-relaxed text-[#d7d6d1]">
          <div className="border-b border-white/10 px-4 py-2 text-[11px] text-white/40">~/hire.sh</div>
          <pre className="overflow-x-auto p-4">
            <code>
              <span className="text-[#6b6a73]"># the fastest path to a reply</span>
              {'\n'}
              <span className="text-[#3ddc84]">$</span> curl -X POST https://mahmud886.vercel.app/hire \{'\n'}
              {'    '}-d <span className="text-[#ffab7a]">&quot;from=you@company.com&quot;</span> \{'\n'}
              {'    '}-d <span className="text-[#ffab7a]">&quot;to={profile.email}&quot;</span>
              {'\n\n'}
              <span className="text-[#8aa2ff]">HTTP/2 200</span>
              {'\n'}
              <span className="text-white/50">{`{ "status": "available", "reply_within": "24h" }`}</span>
            </code>
          </pre>
          <div className="flex flex-wrap gap-4 border-t border-white/10 px-4 py-3 text-[11px]">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
