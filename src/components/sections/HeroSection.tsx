'use client';

import gsap from 'gsap';
import { ArrowDown, Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo(buttonRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id='home'
      className='relative w-full overflow-hidden rounded-3xl border border-surface-hover bg-surface min-h-[560px] h-[70vh] flex items-center'>
      {/* 3D Background */}
      <HeroScene />

      <div className='absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/85' />

      {/* Content Overlay */}
      <div ref={textRef} className='relative z-10 px-8 md:px-16 w-full max-w-6xl mx-auto pointer-events-none'>
        <div className='mb-6 flex justify-center'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 border border-surface-hover text-xs font-semibold tracking-wider'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary' />
            INTRODUCE
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-12 items-center'>
          <div className='pointer-events-auto text-center'>
            <h1 ref={titleRef} className='text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4'>
              I Build <span className='text-primary'>Scalable</span> Digital Experiences
            </h1>

            <p
              ref={subtitleRef}
              className='text-base md:text-lg text-text-muted max-w-xl md:max-w-2xl mb-6 font-medium mx-auto text-center leading-relaxed'>
              I’m a Software Engineer passionate about crafting high-performance web applications and seamless user
              experiences. I specialize in turning complex ideas into elegant, efficient, and scalable solutions.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-6 mb-8 text-text-muted'>
              <div className='flex items-center gap-2'>
                <Check className='text-primary' size={18} />
                <span>Clean Architecture</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className='text-primary' size={18} />
                <span>Performance-Driven Development</span>
              </div>
              <div className='flex items-center gap-2'>
                <Check className='text-primary' size={18} />
                <span>Full-Stack Expertise</span>
              </div>
              <div className='basis-full' />
              <div className='w-full flex items-center justify-center gap-6 mt-1'>
                <div className='flex items-center gap-2'>
                  <Check className='text-primary' size={18} />
                  <span>Available for Work</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Check className='text-primary' size={18} />
                  <span>Full-Time Job</span>
                </div>
              </div>
            </div>
            <div ref={buttonRef} className='pointer-events-auto flex justify-center'>
              <button
                onClick={scrollToAbout}
                className='group flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full hover:bg-primary-dark transition-all duration-300 font-bold'>
                <span>HIRE ME</span>
                <ArrowDown className='group-hover:translate-y-1 transition-transform duration-300' size={18} />
              </button>
            </div>
            {/* <div className='mt-10'>
              <div className='text-sm text-text-muted mb-3'>Trusted companies</div>
              <div className='flex items-center gap-6 opacity-80'>
                <div className='text-text-muted'>OCTOPUS</div>
                <div className='text-text-muted'>dulaIix</div>
                <div className='text-text-muted'>OCTOPUS</div>
                <div className='text-text-muted'>dulaIix</div>
                <div className='text-text-muted'>OCTOPUS</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator removed for closer match to reference */}
    </section>
  );
}
