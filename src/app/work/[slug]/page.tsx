import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experience } from '@/lib/data';
import JobDetail from '@/components/JobDetail';
import SceneBackground from '@/components/three/SceneBackground';

export function generateStaticParams() {
  return experience.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = experience.find((x) => x.slug === slug);
  return j ? { title: `${j.role} at ${j.company}`, description: j.summary } : {};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = experience.findIndex((j) => j.slug === slug);
  if (index === -1) notFound();
  return (
    <>
      <SceneBackground dim />
      <JobDetail job={experience[index]} index={index} all={experience} />
    </>
  );
}
