'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenTool, Code2, Rocket, Megaphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { no: '01', title: 'UI/UX Design', icon: PenTool, desc: 'I design products that are more than pretty. I make them shippable.' },
  { no: '02', title: 'Web Development', icon: Code2, desc: 'I design products that are more than pretty. I make them shippable.' },
  { no: '03', title: 'SEO / Marketing', icon: Rocket, desc: 'I design products that are more than pretty. I make them shippable.' },
  { no: '04', title: 'Branding & Strategy', icon: Megaphone, desc: 'I design products that are more than pretty. I make them shippable.' },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative">
      <div className="rounded-3xl border border-surface-hover bg-surface p-8 md:p-12">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            SERVICES
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-primary">Services</span>
        </h2>
        <p className="text-text-muted max-w-2xl mb-10">
          I design products that are more than pretty. I make them shippable and usable.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.no} className="service-card rounded-2xl border border-surface-hover p-6 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl font-extrabold text-text-muted/30">{s.no}</div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <s.icon size={20} />
                </div>
              </div>
              <div className="text-xl font-bold mb-2">{s.title}</div>
              <div className="text-text-muted">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

