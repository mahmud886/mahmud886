'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BadgeCheck,
  BookOpen,
  Box,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Compass,
  Database,
  FileCode2,
  FileJson,
  Figma as FigmaIcon,
  Flame,
  GitBranch,
  Layers,
  Mail,
  Monitor,
  Palette,
  Package,
  PenTool,
  PieChart,
  Search,
  Route,
  Server,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Terminal,
  TestTube,
  Triangle,
  Wrench,
  Wind,
  Workflow,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const frontend = [
  'HTML5',
  'CSS3',
  'HTML5 Animations',
  'EDM',
  'Email Templates',
  'Bootstrap',
  'Tailwind CSS',
  'Material-UI',
  'Styled-Components',
  'Chakra-UI',
  'JavaScript',
  'ReactJS',
  'NextJS',
  'TypeScript',
  'Zustand',
  'Redux Toolkit',
  'Recharts.js',
  'GSAP.js',
  'D3.js',
];
const backend = [
  'NodeJS',
  'ExpressJS',
  'MongoDB',
  'RESTful API',
  'Supabase',
  'PostgreSQL',
];
const devops = [
  'AWS',
  'Firebase',
    'Hostinger',
  'Netlify',
    'Vercel',
  'Webpack',
  'Shell Script',
  'Linux Commands',
];
const tools = [
  'Git',
  'Storybook',
  'Jest',
  'Figma',
  'JIRA',
  'ClickUp',
  'Slack',
  'VS Code',
  'WebStorm',
  'Adobe XD',
  'Photoshop',
  'Premiere Pro',
  'After Effects',
  'Dreamweaver',
  'Chrome DevTools',
];

function Group({ title, items }: { title: string; items: string[] }) {
  const meta: Record<string, { Icon: LucideIcon; bg: string; text: string }> = {
    HTML5: { Icon: FileCode2, bg: 'bg-orange-500/15', text: 'text-orange-300' },
    CSS3: { Icon: Palette, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    'HTML5 Animations': { Icon: Monitor, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    'HTML5 Banners': { Icon: Monitor, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    EDM: { Icon: Mail, bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
    'Email Templates': { Icon: Mail, bg: 'bg-blue-500/15', text: 'text-blue-300' },
    Bootstrap: { Icon: Layers, bg: 'bg-purple-500/15', text: 'text-purple-300' },
    'Tailwind CSS': { Icon: Wind, bg: 'bg-teal-500/15', text: 'text-teal-300' },
    'Material-UI': { Icon: Box, bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    'Styled-Components': { Icon: PenTool, bg: 'bg-pink-500/15', text: 'text-pink-300' },
    'Chakra-UI': { Icon: Sparkles, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    JavaScript: { Icon: FileJson, bg: 'bg-yellow-500/15', text: 'text-yellow-300' },
    DOM: { Icon: Compass, bg: 'bg-slate-200/10', text: 'text-slate-200' },
    ES6: { Icon: Code2, bg: 'bg-amber-500/15', text: 'text-amber-300' },
    ReactJS: { Icon: Sparkles, bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    NextJS: { Icon: SquareTerminal, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    TypeScript: { Icon: Braces, bg: 'bg-blue-500/15', text: 'text-blue-400' },
    Zustand: { Icon: Boxes, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    NodeJS: { Icon: Server, bg: 'bg-green-500/15', text: 'text-green-300' },
    'Redux Toolkit': { Icon: Workflow, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    ExpressJS: { Icon: Route, bg: 'bg-slate-200/10', text: 'text-slate-200' },
    MongoDB: { Icon: Database, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    'RESTful API': { Icon: Settings, bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
    Supabase: { Icon: Database, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    PostgreSQL: { Icon: Database, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    Angular: { Icon: Triangle, bg: 'bg-red-500/15', text: 'text-red-300' },
    MySQL: { Icon: Database, bg: 'bg-blue-400/15', text: 'text-blue-300' },
    WordPress: { Icon: Monitor, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    'Data Structures': { Icon: Boxes, bg: 'bg-rose-500/15', text: 'text-rose-300' },
    Algorithms: { Icon: Wrench, bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300' },
    'Shell Script': { Icon: Terminal, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    'Linux Commands': { Icon: Terminal, bg: 'bg-slate-200/10', text: 'text-slate-200' },
    'Recharts.js': { Icon: PieChart, bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    'GSAP.js': { Icon: Zap, bg: 'bg-lime-500/15', text: 'text-lime-300' },
    'D3.js': { Icon: PieChart, bg: 'bg-orange-500/15', text: 'text-orange-300' },
    Java: { Icon: Flame, bg: 'bg-red-500/15', text: 'text-red-300' },
    Python: { Icon: Code2, bg: 'bg-yellow-500/15', text: 'text-yellow-300' },
    AWS: { Icon: Cloud, bg: 'bg-amber-500/15', text: 'text-amber-300' },
    Hostinger: { Icon: Cloud, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    Vercel: { Icon: Triangle, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    jQuery: { Icon: FileCode2, bg: 'bg-blue-500/15', text: 'text-blue-300' },
    PHP: { Icon: Code2, bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
    Laravel: { Icon: Shield, bg: 'bg-red-500/15', text: 'text-red-300' },
    'React Native': { Icon: Smartphone, bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    'Android App Development': { Icon: Smartphone, bg: 'bg-green-500/15', text: 'text-green-300' },
    Git: { Icon: GitBranch, bg: 'bg-orange-500/15', text: 'text-orange-300' },
    Storybook: { Icon: BookOpen, bg: 'bg-pink-500/15', text: 'text-pink-300' },
    Jest: { Icon: TestTube, bg: 'bg-red-500/15', text: 'text-red-300' },
    Figma: { Icon: FigmaIcon, bg: 'bg-rose-400/15', text: 'text-rose-300' },
    Firebase: { Icon: Flame, bg: 'bg-amber-500/15', text: 'text-amber-300' },
    Netlify: { Icon: Cloud, bg: 'bg-teal-500/15', text: 'text-teal-300' },
    Webpack: { Icon: Package, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    JIRA: { Icon: BadgeCheck, bg: 'bg-blue-500/15', text: 'text-blue-300' },
    ClickUp: { Icon: BadgeCheck, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    Slack: { Icon: Workflow, bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300' },
    'VS Code': { Icon: Code2, bg: 'bg-blue-500/15', text: 'text-blue-300' },
    WebStorm: { Icon: SquareTerminal, bg: 'bg-zinc-200/10', text: 'text-zinc-200' },
    'Adobe XD': { Icon: PenTool, bg: 'bg-pink-500/15', text: 'text-pink-300' },
    Photoshop: { Icon: Palette, bg: 'bg-sky-500/15', text: 'text-sky-300' },
    'Premiere Pro': { Icon: Monitor, bg: 'bg-violet-500/15', text: 'text-violet-300' },
    'After Effects': { Icon: Sparkles, bg: 'bg-purple-500/15', text: 'text-purple-300' },
    Dreamweaver: { Icon: Monitor, bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    'Chrome DevTools': { Icon: Search, bg: 'bg-orange-500/15', text: 'text-orange-300' },
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

        <div ref={gridRef} className='flex flex-col gap-6'>
          <div>
            <Group title='FRONTEND' items={frontend} />
          </div>
          <div>
            <Group title='BACKEND' items={backend} />
          </div>
          <div>
            <Group title='DEVOPS' items={devops} />
          </div>
          <div>
            <Group title='TOOLS' items={tools} />
          </div>
        </div>

        <div className='mt-6 pt-6 border-t border-surface-hover text-sm text-text-muted flex items-center gap-2'>
          <span className='inline-block h-2 w-2 rounded-full bg-emerald-400' />
          6+ years experience — available for new opportunities in frontend, backend & devops
        </div>
      </div>
    </section>
  );
}
