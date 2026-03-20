'use client';

import { cn } from '@/utils/cn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Job = {
  company: string;
  companyUrl?: string;
  period: string;
  role: string;
  summary: string;
  responsibilities: string[];
  tech: string[];
  current?: boolean;
  image?: string;
  details?: string[];
};

const jobs: Job[] = [
  {
    company: 'Adventure Dhaka Limited',
    companyUrl: 'https://www.adventure-global.com/',
    period: 'Nov 2024 — Present',
    role: 'Software Engineer',
    current: true,
    summary:
      'Building and maintaining scalable user interfaces for a global travel platform with a focus on performance, quality and team collaboration.',
    responsibilities: [
      'Develop and maintain scalable UIs with JavaScript (ES6+), React.js, Next.js and Storybook.',
      'Build reusable, consistent component architectures.',
      'Manage state with React Context and Redux Toolkit.',
      'Optimize performance with lazy loading, memoization and Next.js SSR.',
      'Ensure responsive theming using Tailwind CSS and Styled Components.',
      'Write unit/integration tests with Jest, React Testing Library and Cypress.',
      'Use Git and CI/CD pipelines for automated deployments.',
      'Participate in daily stand-ups, sprint planning, reviews and retrospectives.',
      'Conduct code reviews and enforce best practices.',
    ],
    tech: [
      'Next.js',
      'React',
      'Storybook',
      'Redux Toolkit',
      'TailwindCSS',
      'Styled Components',
      'Jest',
      'RTL',
      'Cypress',
      'Git',
      'CI/CD',
    ],
    image: '/window.svg',
    details: [
      'Scaled design system packages and Storybook docs for faster onboarding.',
      'Introduced performance budgets and dashboards tied to CI.',
    ],
  },
  {
    company: 'Nexdecade Technology Pvt. Ltd.',
    period: 'Aug 2023 — Oct 2024',
    role: 'Software Developer',
    summary:
      'Worked on high-traffic applications and UI revamps, delivering secure APIs and measurable performance gains.',
    responsibilities: [
      'Managed a high-traffic app serving 2M+ daily users with cross-functional teams; improved system efficiency and satisfaction.',
      'Transformed UIs using React, Angular, Laravel and Inertia; reduced debugging time and improved engagement.',
      'Implemented a secure six-step encryption–decryption REST API with 100% success rate.',
      'Optimized UI for a 25% performance boost and improved troubleshooting speed.',
      'Improved collaboration and workflow efficiency by 30% through adaptive strategies.',
      'Maintained coding standards and mentored junior engineers.',
      'Implemented Agile methodologies to increase flexibility and adaptability.',
      'Stayed current with frontend trends for seamless integration and innovation.',
    ],
    tech: ['React', 'Angular', 'Laravel', 'Inertia', 'REST API', 'Agile', 'Git'],
    image: '/globe.svg',
    details: ['Led UI revamp sprints', 'Partnered with backend to define stable contracts'],
  },
  {
    company: 'Hogarth Dhaka',
    period: 'Dec 2021 — Aug 2023',
    role: 'Web Developer',
    summary:
      'Delivered high‑volume digital assets and interactive web experiences with a focus on responsiveness and brand alignment.',
    responsibilities: [
      'Produced 300+ HTML email templates and 100+ HTML5/JS animations for ads, websites and mobile apps with 90+ device compatibility.',
      'Built responsive hero designs and GSAP animations, improving engagement.',
      'Created on‑brand creative assets including HTML5 banners and animated graphics, boosting brand visibility.',
      'Collaborated across teams to deliver responsive, brand‑aligned designs, improving design efficiency.',
      'Contributed to process tools that optimized workflows and team collaboration.',
      'Managed multiple projects, demonstrating strong teamwork in a fast‑paced environment.',
      'Worked with stakeholders to enhance functionality and client satisfaction.',
    ],
    tech: ['HTML5', 'CSS', 'JavaScript', 'GSAP', 'Responsive Email', 'Brand Systems'],
    image: '/file.svg',
    details: ['Delivered high‑volume assets at scale', 'Established HTML5 banner templates'],
  },
  {
    company: 'Kaizen IT Ltd',
    period: 'Sep 2021 — Nov 2021',
    role: 'Web Developer',
    summary: 'Delivered end‑to‑end web solutions from design to integration with a focus on quality assurance.',
    responsibilities: [
      'Streamlined administrative processes and improved communication for education stakeholders.',
      'Delivered UI/UX solutions using wireframes, storyboards and prototypes with 100% success rate.',
      'Developed full‑stack features with React, Node.js, Express and MongoDB, achieving 100% integration rate.',
      'Designed UI elements that improved user interaction by 25%.',
      'Performed rigorous testing to ensure accuracy and seamless experiences.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'UI/UX', 'Testing'],
    image: '/next.svg',
    details: ['Built small full‑stack modules', 'Improved QA flows with checklists'],
  },
  {
    company: 'Oxdora I Tech',
    period: 'Jan 2021 — Aug 2021',
    role: 'Web Developer',
    summary:
      'Started career delivering company websites and web applications while collaborating closely with clients.',
    responsibilities: [
      'Designed and developed the official website and portfolio with a 100% success rate.',
      'Built web applications that improved client satisfaction through better functionality and UX.',
      'Managed clients and conducted training sessions for marketing agents.',
      'Adopted latest frontend trends and best practices for seamless integration.',
    ],
    tech: ['CSS', 'JavaScript', 'Express.js', 'Frontend', 'Client Training'],
    image: '/vercel.svg',
    details: ['Created company site and portfolio', 'Ran client training sessions'],
  },
];

export default function WorkExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-card',
        { y: 32, opacity: 0 },
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
    <section id='experience' ref={sectionRef}>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-8'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            RESUME
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          Work <span className='text-primary'>Experience</span>
        </h2>
        <p className='text-text-muted mb-10 max-w-2xl'>Detailed roles with responsibilities and core tech used.</p>

        <div ref={listRef} className='space-y-8'>
          {jobs.map((job) => (
            <div
              key={`${job.company}-${job.role}`}
              className='exp-card relative overflow-hidden rounded-2xl border border-surface-hover p-6 md:p-8'>
              <div className='pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary/60 to-secondary/40' />

              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div>
                  <div className='text-2xl md:text-3xl font-extrabold'>{job.role}</div>
                  <div className='mt-1 flex items-center gap-2 text-primary'>
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-1 hover:underline'>
                        {job.company} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span>{job.company}</span>
                    )}
                    {job.current && (
                      <span className='ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-bold text-primary'>
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2 text-text-muted'>
                  <CalendarDays size={16} />
                  <span className='text-sm'>{job.period}</span>
                </div>
              </div>

              <p className='mt-4 text-text-muted'>{job.summary}</p>

              <ul className='mt-4 space-y-2 pl-1'>
                {job.responsibilities.map((r, i) => (
                  <li key={i} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-primary/80' />
                    <span className='text-text-muted'>{r}</span>
                  </li>
                ))}
              </ul>

              {job.tech && job.tech.length > 0 && (
                <div className='mt-6 flex flex-wrap gap-2'>
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className='rounded-full border border-surface-hover bg-background/50 px-3 py-1 text-xs font-medium text-text-muted'>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className='mt-6'>
                <button
                  onClick={() =>
                    setOpenKey((prev) => (prev === `${job.company}-${job.role}` ? null : `${job.company}-${job.role}`))
                  }
                  className='rounded-full border border-surface-hover bg-background/60 px-4 py-2 text-xs font-bold hover:border-primary/50 transition-colors'>
                  {openKey === `${job.company}-${job.role}` ? 'Hide details' : 'Show details'}
                </button>
                <div
                  className={cn(
                    'transition-all',
                    openKey === `${job.company}-${job.role}`
                      ? 'max-h-[800px] opacity-100 mt-4'
                      : 'max-h-0 opacity-0 overflow-hidden',
                  )}>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {job.image && (
                      <div className='md:col-span-1'>
                        <div className='relative aspect-video rounded-xl border border-surface-hover bg-background/50 overflow-hidden'>
                          <Image src={job.image} alt={`${job.company} sample`} fill className='object-contain p-6' />
                        </div>
                      </div>
                    )}
                    <div className={cn(job.image ? 'md:col-span-2' : 'md:col-span-3')}>
                      {job.details && job.details.length > 0 && (
                        <ul className='space-y-2'>
                          {job.details.map((d, i) => (
                            <li key={i} className='flex gap-2'>
                              <span className='mt-2 h-1.5 w-1.5 rounded-full bg-secondary/70' />
                              <span className='text-text-muted'>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
