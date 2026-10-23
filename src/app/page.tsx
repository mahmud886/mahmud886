import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Halftone from '@/components/home/Halftone';
import Statement from '@/components/home/Statement';
import WorkReel from '@/components/home/WorkReel';
import Services from '@/components/home/Services';
import Experience from '@/components/home/Experience';
import Process from '@/components/home/Process';
import Stack from '@/components/home/Stack';
import Writing from '@/components/home/Writing';
import Contact from '@/components/home/Contact';
import { profile } from '@/lib/data';

// Medium feed is re-fetched at most hourly; the page itself stays static.
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <Hero />
      <Halftone caption={`${profile.years}+ years of interfaces that move. Point at the dots.`} />
      <Statement />
      <WorkReel />
      <Services />
      <Process />
      <Experience />
      <Stack />
      <Suspense fallback={null}>
        <Writing />
      </Suspense>
      <Contact />
    </main>
  );
}
