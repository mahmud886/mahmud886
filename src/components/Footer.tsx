import Link from 'next/link';
import { profile } from '@/lib/data';
import { sections } from '@/lib/nav';
import LocalTime from './LocalTime';

// Vercel injects the deployed commit; locally it is simply "dev".
const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev';

/** The site says hello at the top and bye at the bottom. */
export default function Footer() {
  return (
    <footer className="site-footer inv relative overflow-hidden px-[var(--pad)] pb-6 pt-20">
      <div className="grid gap-10 border-t border-line pt-6 text-[13px] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="label mb-3">Index</div>
          <ul className="space-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} className="transition-opacity hover:opacity-60">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="label mb-3">Elsewhere</div>
          <ul className="space-y-1.5">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-60">
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <Link href="/resume" className="transition-opacity hover:opacity-60">
                Resume
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="label mb-3">Say hi</div>
          <a href={`mailto:${profile.email}`} className="break-all underline decoration-1 underline-offset-4 hover:opacity-60">
            {profile.email}
          </a>
          <div className="mt-1.5 text-muted">{profile.location}</div>
        </div>
        <div className="lg:text-right">
          <div className="label mb-3">Local time</div>
          <div className="font-mono text-[12px]">
            Dhaka <LocalTime /> <span aria-hidden>●</span>
          </div>
          <div className="mt-1.5 font-mono text-[12px] text-muted">build {sha}</div>
        </div>
      </div>

      <p aria-hidden className="serif-i mt-10 select-none pb-[0.16em] text-[clamp(7rem,30vw,30rem)] leading-[0.8] tracking-[-0.05em]">
        Bye<span className="not-italic">.</span>
      </p>

      <div className="mt-6 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-muted">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
        <span>Designed &amp; engineered in Dhaka · Next.js · GSAP</span>
      </div>
    </footer>
  );
}
