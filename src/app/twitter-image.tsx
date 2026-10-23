import { homeOg, OG_SIZE, OG_TYPE } from '@/lib/og/render';
import { profile } from '@/lib/data';

export const alt = `${profile.name} — Software Engineer building SaaS products with React, Next.js and TypeScript`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return homeOg();
}
