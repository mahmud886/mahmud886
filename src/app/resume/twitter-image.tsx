import { OG_SIZE, OG_TYPE, resumeOg } from '@/lib/og/render';
import { profile } from '@/lib/data';

export const alt = `${profile.fullName} — Resume`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return resumeOg();
}
