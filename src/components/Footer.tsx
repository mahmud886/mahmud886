import Link from 'next/link';
import { profile } from '@/lib/data';
import LocalTime from './LocalTime';

// Vercel injects the deployed commit; locally it is simply "dev".
const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev';
const builtAt = new Date().toISOString().slice(0, 10);

export default function Footer() {
  return (
    <footer className="site-footer border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 font-mono text-[11px] text-muted sm:grid-cols-3 sm:px-6">
        <div className="space-y-1">
          <div className="text-ink">© {new Date().getFullYear()} {profile.name}</div>
          <div>Designed &amp; engineered in Dhaka.</div>
        </div>
        <div className="space-y-1">
          <div>
            build <span className="text-ink">{sha}</span> · {builtAt}
          </div>
          <div>Next.js · TypeScript · Tailwind · Vercel</div>
        </div>
        <div className="space-y-1 sm:text-right">
          <div className="flex gap-4 sm:justify-end">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                {s.label}
              </a>
            ))}
            <Link href="/resume" className="transition-colors hover:text-ink">
              Resume
            </Link>
          </div>
          <div>
            Dhaka <LocalTime /> <span className="text-ok">●</span> online
          </div>
        </div>
      </div>
    </footer>
  );
}
