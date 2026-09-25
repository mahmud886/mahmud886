import { Suspense } from 'react';
import HeroBento from '@/components/bento/HeroBento';
import WorkBento from '@/components/bento/WorkBento';
import ExperienceBento from '@/components/bento/ExperienceBento';
import StackBento from '@/components/bento/StackBento';
import WritingContact from '@/components/bento/WritingContact';

// Medium feed is re-fetched at most hourly; the page itself stays static.
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-3 pb-24 sm:px-6">
      <HeroBento />
      <section id="work" className="scroll-mt-16">
        <WorkBento />
      </section>
      <section id="experience" className="scroll-mt-16">
        <ExperienceBento />
      </section>
      <section id="stack" className="scroll-mt-16">
        <StackBento />
      </section>
      <section id="writing" className="scroll-mt-16">
        <Suspense fallback={null}>
          <WritingContact />
        </Suspense>
      </section>
    </main>
  );
}
