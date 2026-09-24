import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Metrics from '@/components/home/Metrics';
import Work from '@/components/home/Work';
import GitLog from '@/components/home/GitLog';
import Stack from '@/components/home/Stack';
import Writing from '@/components/home/Writing';
import Contact from '@/components/home/Contact';

// Medium feed is re-fetched at most hourly; the page itself stays static.
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <Work />
      <GitLog />
      <Stack />
      <Suspense fallback={null}>
        <Writing />
      </Suspense>
      <Contact />
    </main>
  );
}
