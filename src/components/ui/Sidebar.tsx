'use client';

import {
  BookOpen,
  Box,
  Boxes,
  Braces,
  Cloud,
  Database,
  Figma as FigmaIcon,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  Menu,
  Package,
  Route,
  Server,
  Sparkles,
  SquareTerminal,
  TestTube,
  Triangle,
  Wind,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type NavItem = {
  label: string;
  href: string;
  hash?: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home', hash: 'home' },
  { label: 'About', href: '/#about', hash: 'about' },
  { label: 'Projects', href: '/#projects', hash: 'projects' },
  { label: 'Blog', href: '/#blog', hash: 'blog' },
  { label: 'Contact', href: '/#contact', hash: 'contact' },
];

type Skill = {
  label: string;
  value: number;
};

function SkillRing({ label, value }: Skill) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, value)) / 100);

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='relative h-14 w-14'>
        <svg viewBox='0 0 52 52' className='h-14 w-14 -rotate-90'>
          <circle cx='26' cy='26' r={radius} stroke='rgba(148,163,184,0.18)' strokeWidth='4' fill='none' />
          <circle
            cx='26'
            cy='26'
            r={radius}
            stroke='rgb(20 203 168)'
            strokeWidth='4'
            strokeLinecap='round'
            fill='none'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className='absolute inset-0 flex items-center justify-center text-xs font-bold text-text-main'>
          {value}%
        </div>
      </div>
      <div className='text-[11px] font-semibold tracking-wide text-text-muted'>{label}</div>
    </div>
  );
}

function useActiveHash() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash.replace('#', ''));
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return hash;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeHash = useActiveHash();

  const isHome = pathname === '/';

  const activeSection = useMemo(() => {
    if (isHome) return activeHash;
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/blog')) return 'blog';
    return '';
  }, [activeHash, isHome, pathname]);

  const items = useMemo(() => navItems, []);

  const handleHashNav = (e: React.MouseEvent, item: NavItem) => {
    if (!item.hash) return;
    if (!isHome) return;
    e.preventDefault();
    const el = document.getElementById(item.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `/#${item.hash}`);
    onNavigate?.();
  };

  const profile = useMemo(
    () => ({
      name: 'Iqbal Mahmud',
      role: 'Software Engineer',
      residence: 'Bangladesh',
      city: 'Dhaka',
      age: '30',
      cvHref: '/cv.pdf',
    }),
    [],
  );

  const pfCandidates = ['/assets/image/profile-image.jpg'];
  const [pfIdx, setPfIdx] = useState(0);
  const pfSrc = pfCandidates[pfIdx] ?? '/project-placeholder.svg';
  const frontend = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'];
  const backend = ['Node.js', 'Express', 'PostgreSQL', 'Redis'];
  const devops = ['Docker', 'CI/CD', 'Vercel', 'AWS'];
  const tools = ['Git', 'Storybook', 'Jest', 'Figma'];

  return (
    <div className='flex h-full flex-col'>
      <div className='relative overflow-hidden rounded-3xl border border-surface-hover bg-surface px-6 pb-6 pt-8 h-full flex flex-col'>
        <div className='pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/12 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-secondary/10 blur-3xl' />

        <div className='relative flex flex-col items-center text-center'>
          <div className='h-[96px] w-[96px] rounded-full bg-gradient-to-tr from-primary/70 to-secondary/60 p-[2px]'>
            <div className='relative h-full w-full rounded-full bg-background/80 overflow-hidden'>
              <Image
                src='/assets/images/profile-image.jpg'
                alt='Profile photo'
                fill
                className='object-cover'
                sizes='96px'
                priority
                onError={() => setPfIdx((i) => Math.min(i + 1, pfCandidates.length - 1))}
              />
            </div>
          </div>
          <div className='mt-4 text-lg font-extrabold tracking-tight text-text-main'>{profile.name}</div>
          <div className='mt-1 text-sm font-semibold text-primary'>{profile.role}</div>

          <div className='mt-5 w-full border-t border-surface-hover/60 pt-5 text-sm'>
            <div className='flex items-center justify-between py-2'>
              <span className='text-text-muted'>Residence:</span>
              <span className='font-medium text-text-main'>{profile.residence}</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <span className='text-text-muted'>City:</span>
              <span className='font-medium text-text-main'>{profile.city}</span>
            </div>
            <div className='flex items-center justify-between py-2'>
              <span className='text-text-muted'>Age:</span>
              <span className='font-medium text-text-main'>{profile.age}</span>
            </div>
          </div>

          <div className='mt-3 w-full rounded-xl border border-surface-hover/60 bg-background/35 p-3'>
            <div className='text-center text-[13px] font-bold text-text-main'>Core Stack</div>
            <div className='mt-2 grid grid-cols-1 gap-2'>
              <Group title='FRONTEND' items={frontend} />
              <Group title='BACKEND' items={backend} />
              <Group title='DEVOPS' items={devops} />
              <Group title='TOOLS' items={tools} />
            </div>
          </div>

          <Link
            href='/resume'
            className='mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold tracking-wide text-black hover:bg-primary-dark transition-colors'
            onClick={() => onNavigate?.()}>
            DOWNLOAD CV
          </Link>

          <div className='mt-5 flex items-center gap-4 text-text-muted'>
            <a
              href='https://github.com/mahmud886'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary transition-colors'
              aria-label='GitHub'>
              <Github size={18} />
            </a>
            <a
              href='https://linkedin.com/in/mahmud886'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary transition-colors'
              aria-label='LinkedIn'>
              <Linkedin size={18} />
            </a>
            <a
              href='mailto:iqbal886mahmud@gmail.com'
              className='hover:text-primary transition-colors'
              aria-label='Email'>
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Group = ({ title, items }: { title: string; items: string[] }) => {
  const meta: Record<string, { Icon: any; bg: string; text: string }> = {
    React: { Icon: Sparkles, bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    'Next.js': { Icon: SquareTerminal, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    TypeScript: { Icon: Braces, bg: 'bg-blue-500/15', text: 'text-blue-400' },
    Tailwind: { Icon: Wind, bg: 'bg-teal-500/15', text: 'text-teal-300' },
    GSAP: { Icon: Zap, bg: 'bg-lime-500/15', text: 'text-lime-300' },
    'Three.js': { Icon: Box, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    'Node.js': { Icon: Server, bg: 'bg-green-500/15', text: 'text-green-300' },
    Express: { Icon: Route, bg: 'bg-slate-200/10', text: 'text-slate-200' },
    PostgreSQL: { Icon: Database, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    Redis: { Icon: Boxes, bg: 'bg-rose-500/15', text: 'text-rose-300' },
    Docker: { Icon: Package, bg: 'bg-blue-400/15', text: 'text-blue-300' },
    'CI/CD': { Icon: Workflow, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    Vercel: { Icon: Triangle, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    AWS: { Icon: Cloud, bg: 'bg-amber-500/15', text: 'text-amber-300' },
    Git: { Icon: GitBranch, bg: 'bg-orange-500/15', text: 'text-orange-300' },
    Storybook: { Icon: BookOpen, bg: 'bg-pink-500/15', text: 'text-pink-300' },
    Jest: { Icon: TestTube, bg: 'bg-red-500/15', text: 'text-red-300' },
    Figma: { Icon: FigmaIcon, bg: 'bg-rose-400/15', text: 'text-rose-300' },
    REST: { Icon: Workflow, bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
    GraphQL: { Icon: Braces, bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300' },
  };

  return (
    <div>
      <div className='text-[10px] font-bold tracking-widest text-text-muted mb-1.5 text-center'>{title}</div>
      <div className='flex flex-wrap gap-1.5 justify-center'>
        {items.map((i) => {
          const m = meta[i] ?? { Icon: Sparkles, bg: 'bg-background/60', text: 'text-text-main' };
          const Icon = m.Icon;
          return (
            <span
              key={i}
              className={`inline-flex items-center gap-1 rounded-md border border-surface-hover px-1.5 py-0.5 text-[9px] font-medium tracking-wide ${m.bg} ${m.text}`}>
              <Icon size={8} strokeWidth={2.5} />
              <span>{i}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='md:hidden fixed top-0 left-0 right-0 z-50 border-b border-surface-hover bg-surface/80 backdrop-blur-xl'>
        <div className='mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between'>
          <Link href='/' className='font-bold tracking-tight'>
            <span className='text-secondary'>I</span>qbal.
          </Link>
          <button
            onClick={() => setOpen(true)}
            className='rounded-xl border border-surface-hover bg-background px-3 py-2 text-text-main hover:border-primary/50 transition-colors'
            aria-label='Open menu'>
            <Menu size={18} />
          </button>
        </div>
      </div>

      <aside className='hidden md:block fixed left-0 top-0 h-screen w-[340px] p-6'>
        <SidebarContent />
      </aside>

      {open && (
        <div
          className='md:hidden fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm'
          onClick={() => setOpen(false)}>
          <div className='absolute inset-y-0 left-0 w-[86%] max-w-[360px] p-4' onClick={(e) => e.stopPropagation()}>
            <div className='rounded-3xl border border-surface-hover bg-background shadow-2xl h-full p-4'>
              <div className='flex items-center justify-between mb-4'>
                <div className='font-bold tracking-tight'>
                  <span className='text-secondary'>I</span>qbal.
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className='rounded-xl border border-surface-hover bg-surface px-3 py-2 text-text-main hover:border-primary/50 transition-colors'
                  aria-label='Close menu'>
                  <X size={18} />
                </button>
              </div>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
