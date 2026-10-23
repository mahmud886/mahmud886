import { OG_SIZE, OG_TYPE, workOg } from '@/lib/og/render';
import { experience } from '@/lib/data';

export const alt = 'Experience — Iqbal Mahmud';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export function generateStaticParams() {
  return experience.map((j) => ({ slug: j.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return workOg((await params).slug);
}
