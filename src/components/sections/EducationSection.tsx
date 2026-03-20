'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Edu = {
  school: string;
  period: string;
  degree: string;
  gpa?: string;
  location: string;
};

const items: Edu[] = [
  {
    school: 'Southeast University (BD)',
    period: '2016 — 2020',
    degree: 'Computer Science',
    gpa: 'Grade: 3.02',
    location: 'Dhaka, Bangladesh',
  },
  {
    school: 'Mymensingh Ideal College',
    period: 'Jul 2013 — Jul 2015',
    degree: 'Higher Secondary School Certificate, Science',
    location: 'Mymensingh, Bangladesh',
  },
  {
    school: 'B.M High School',
    period: 'Jan 2007 — May 2013',
    degree: 'Secondary School Certificate, Science',
    location: 'Gazipur, Bangladesh',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
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
    <section id='education' ref={sectionRef}>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12'>
        <div className='mb-2'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            EDUCATION
          </span>
        </div>
        <h2 className='text-4xl md:text-5xl font-bold'>Education</h2>
        <p className='text-text-muted mb-8'>Academic journey and qualifications</p>

        <div ref={listRef} className='space-y-4'>
          {items.map((it) => (
            <div
              key={it.school}
              className='edu-item flex items-center justify-between gap-4 rounded-2xl border border-surface-hover bg-background/40 px-5 py-5'>
              <div className='flex items-start gap-4'>
                <div className='mt-1 h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center'>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className='text-lg font-bold'>{it.school}</div>
                  <div className='text-text-muted'>{it.degree}</div>
                  {it.gpa && <div className='text-[13px] font-semibold text-emerald-400 mt-1'>{it.gpa}</div>}
                  <div className='text-xs text-text-muted mt-1'>{it.location}</div>
                </div>
              </div>
              <div className='shrink-0 inline-flex items-center gap-2 rounded-full border border-surface-hover bg-background px-3 py-1.5 text-xs text-text-muted'>
                <CalendarDays size={14} />
                <span>{it.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
