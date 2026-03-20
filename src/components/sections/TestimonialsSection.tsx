'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { name: 'Client A', role: 'Product Manager', quote: 'Delivers pixel-perfect UIs with smooth animations and solid architecture.' },
  { name: 'Client B', role: 'CTO', quote: 'Reliable, fast, and deeply knowledgeable in Next.js and 3D on the web.' },
  { name: 'Client C', role: 'Founder', quote: 'Understands business goals and translates them into delightful experiences.' },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="rounded-3xl border border-surface-hover bg-surface p-8 md:p-12">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            TESTIMONIALS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          What <span className="text-primary">Clients Say</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="testimonial-card rounded-2xl border border-surface-hover p-6">
              <div className="text-text-muted mb-4">“{it.quote}”</div>
              <div className="font-bold">{it.name}</div>
              <div className="text-sm text-text-muted">{it.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

