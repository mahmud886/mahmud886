import { OG_SIZE, OG_TYPE, projectOg } from '@/lib/og/render';
import { caseStudies } from '@/lib/data';

export const alt = 'Case study by Iqbal Mahmud';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return projectOg((await params).slug);
}
