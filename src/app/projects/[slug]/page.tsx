import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectCase from '@/components/ProjectCase';
import SceneBackground from '@/components/three/SceneBackground';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case study`,
    description: p.overview,
    openGraph: { title: `${p.title} — Case study`, description: p.overview, images: [{ url: p.images[0], alt: p.title }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <SceneBackground dim />
      <ProjectCase project={projects[index]} index={index} total={projects.length} next={next} />
    </>
  );
}
