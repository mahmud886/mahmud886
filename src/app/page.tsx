import { Suspense } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Story from '@/components/Story';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import TextBand from '@/components/TextBand';
import Skills from '@/components/Skills';
import Process from '@/components/Process';
import Experience from '@/components/Experience';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import Preloader from '@/components/Preloader';
import SceneBackground from '@/components/three/SceneBackground';

// Medium feed is re-fetched at most hourly; the page itself stays static.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Preloader />
      <SceneBackground />
      <main className="relative">
        <Hero />
        <About />
        <Story />
        <Projects />
        <TextBand top="Fast by default" bottom="Unforgettable by design" />
        <Services />
        <Skills />
        <Process />
        <Experience />
        <Suspense fallback={null}>
          <BlogSection />
        </Suspense>
        <Contact />
      </main>
    </>
  );
}
