'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BookOpen,
  Box,
  Boxes,
  Braces,
  Cloud,
  Database,
  Figma as FigmaIcon,
  GitBranch,
  Package,
  Route,
  Server,
  Sparkles,
  SquareTerminal,
  TestTube,
  Triangle,
  Wind,
  Workflow,
  Zap,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const frontend = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'];
const backend = ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST', 'GraphQL'];
const devops = ['Docker', 'CI/CD', 'Vercel', 'AWS'];
const tools = ['Git', 'Storybook', 'Jest', 'Figma'];

function Group({ title, items }: { title: string; items: string[] }) {
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
    <div className='stack-group space-y-3'>
      <div className='text-xs font-bold tracking-widest text-text-muted'>{title}</div>
      <div className='flex flex-wrap gap-2'>
        {items.map((i) => {
          const m = meta[i] ?? { Icon: Sparkles, bg: 'bg-background/60', text: 'text-text-main' };
          const Icon = m.Icon;
          return (
            <span
              key={i}
              className={`pill inline-flex items-center gap-1.5 rounded-lg border border-surface-hover px-2 py-1 text-[11px] font-medium ${m.bg} ${m.text}`}>
              <Icon size={10} />
              <span>{i}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsAdvantagesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stack-group',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        },
      );
      gsap.fromTo(
        '.pill',
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.03,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id='skills' ref={sectionRef}>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-8'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            CORE SKILLS
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold mb-6'>Core Stack</h2>

        <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Group title='FRONTEND' items={frontend} />
          <Group title='BACKEND' items={backend} />
          <Group title='DEVOPS' items={devops} />
          <Group title='TOOLS' items={tools} />
        </div>

        <div className='mt-6 pt-6 border-t border-surface-hover text-sm text-text-muted flex items-center gap-2'>
          <span className='inline-block h-2 w-2 rounded-full bg-emerald-400' />
          Available for new opportunities — frontend, backend & devops
        </div>
      </div>
    </section>
  );
}
