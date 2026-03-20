'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Briefcase, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-fade',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const startYear = 2018;
  const years = Math.max(0, new Date().getFullYear() - startYear);
  const stats = [
    { v: `${years}+`, k: 'YEARS EXP.' },
    { v: '300+', k: 'CONTESTS' },
    { v: '2K+', k: 'PROBLEMS SOLVED' },
    { v: '1603', k: 'CF PEAK' },
  ];

  return (
    <section id='about' ref={sectionRef} className='relative'>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='about-fade mb-6'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
            Open to new opportunities
          </span>
        </div>

        <div ref={contentRef} className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='about-fade'>
            <h1 className='text-5xl md:text-6xl font-extrabold tracking-tight'>
              Iqbal <span className='text-primary'>Mahmud</span>
            </h1>
            <p className='text-text-muted text-lg mt-5 max-w-2xl'>
              Senior Frontend Engineer crafting resilient, animated web experiences with React, Next.js, and TypeScript.
              Focused on performance, accessibility, and delightful motion.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <a
                href='#contact'
                className='inline-flex items-center gap-2 rounded-xl border border-surface-hover bg-background px-4 py-2 text-sm font-bold hover:border-primary/50 transition-colors about-fade'>
                <Mail size={16} /> Get in touch
              </a>
              <Link
                href='/resume'
                className='inline-flex items-center gap-2 rounded-xl bg-primary text-black px-4 py-2 text-sm font-bold hover:bg-primary-dark transition-colors about-fade'>
                <FileText size={16} /> Resume
              </Link>
            </div>
            <div className='mt-5 flex items-center gap-3 about-fade'>
              <a
                href='https://github.com/mahmud886'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
                className='inline-flex items-center justify-center rounded-full border border-surface-hover bg-background p-2 text-text-muted hover:text-primary hover:border-primary/50 transition-colors'>
                <Github size={18} />
              </a>
              <a
                href='https://linkedin.com/in/mahmud886'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='inline-flex items-center justify-center rounded-full border border-surface-hover bg-background p-2 text-text-muted hover:text-primary hover:border-primary/50 transition-colors'>
                <Linkedin size={18} />
              </a>
              <a
                href='mailto:hello@example.com'
                aria-label='Email'
                className='inline-flex items-center justify-center rounded-full border border-surface-hover bg-background p-2 text-text-muted hover:text-primary hover:border-primary/50 transition-colors'>
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className='about-fade'>
            <div className='relative rounded-2xl overflow-hidden border border-surface-hover bg-background/40'>
              <AboutPhoto />
              <div className='p-4 flex items-center justify-between text-xs text-text-muted'>
                <div className='inline-flex items-center gap-2'>
                  <MapPin size={14} /> Dhaka, Bangladesh
                </div>
                <div className='inline-flex items-center gap-2'>
                  <Briefcase size={14} /> Software Engineer · Adventure Dhaka Limited
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='about-fade grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
          {stats.map((s) => (
            <div key={s.k} className='rounded-2xl border border-surface-hover bg-background/40 px-5 py-6'>
              <div className='text-3xl font-extrabold text-primary'>{s.v}</div>
              <div className='text-xs text-text-muted mt-1'>{s.k}</div>
            </div>
          ))}
        </div>

        <div className='about-fade mt-6 rounded-3xl border border-surface-hover bg-background/40 p-6'>
          <div className='text-xs font-bold tracking-widest text-text-muted mb-4'>CONNECT</div>
          <div className='flex flex-wrap gap-3'>
            <a
              href='https://github.com/mahmud886'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between rounded-2xl p-3 hover:bg-background/60 transition-colors border border-surface-hover bg-background/40 flex-1 min-w-[240px]'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full border border-surface-hover bg-background/60 flex items-center justify-center text-text-muted'>
                  <Github size={18} />
                </div>
                <div>
                  <div className='font-semibold'>GitHub</div>
                  <div className='text-sm text-text-muted'>@mahmud886</div>
                </div>
              </div>
              <ArrowUpRight className='text-text-muted' size={16} />
            </a>
            <a
              href='https://linkedin.com/in/mahmud886'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between rounded-2xl p-3 hover:bg-background/60 transition-colors border border-surface-hover bg-background/40 flex-1 min-w-[240px]'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full border border-surface-hover bg-background/60 flex items-center justify-center text-text-muted'>
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className='font-semibold'>LinkedIn</div>
                  <div className='text-sm text-text-muted'>in/mahmud886</div>
                </div>
              </div>
              <ArrowUpRight className='text-text-muted' size={16} />
            </a>
            <a
              href='mailto:iqbal886mahmud@gmail.com'
              className='flex items-center justify-between rounded-2xl p-3 hover:bg-background/60 transition-colors border border-surface-hover bg-background/40 flex-1 min-w-[240px]'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full border border-surface-hover bg-background/60 flex items-center justify-center text-text-muted'>
                  <Mail size={18} />
                </div>
                <div>
                  <div className='font-semibold'>Email</div>
                  <div className='text-sm text-text-muted'>iqbal886mahmud@gmail.com</div>
                </div>
              </div>
              <ArrowUpRight className='text-text-muted' size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPhoto() {
  const candidates = ['/assets/images/profile-image.jpg', '/project-placeholder.svg'];
  const [idx, setIdx] = useState(0);
  const src = candidates[idx] ?? '/project-placeholder.svg';
  return (
    <div className='relative h-[340px] w-full'>
      <img
        src={src}
        alt='Profile'
        className='h-full w-full object-cover'
        onError={() => setIdx((i) => Math.min(i + 1, candidates.length - 1))}
      />
    </div>
  );
}
