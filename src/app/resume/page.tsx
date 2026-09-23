import type { Metadata } from 'next';
import Resume from '@/components/Resume';
import { profile } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${profile.name} — ${profile.role}. ${profile.summary}`,
};

export default function ResumePage() {
  return <Resume />;
}
