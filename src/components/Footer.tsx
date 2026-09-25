import Link from 'next/link';
import { profile } from '@/lib/data';
import LocalTime from './LocalTime';

// Vercel injects the deployed commit; locally it is simply "dev".
const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'dev';

export default function Footer() {
  return (
    <footer className="site-footer mx-auto max-w-6xl px-3 pb-6 sm:px-6">
      <div className="tile flex flex-col gap-4 px-6 py-5 text-[13px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-pop" />
          <span className="font-medium text-ink">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-muted">· Dhaka <LocalTime /></span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              {s.label}
            </a>
          ))}
          <Link href="/resume" className="transition-colors hover:text-ink">
            Resume
          </Link>
          <span className="font-mono text-[11px] text-muted">build {sha}</span>
        </div>
      </div>
    </footer>
  );
}
