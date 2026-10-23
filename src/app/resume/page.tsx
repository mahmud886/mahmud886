import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Resume from '@/components/Resume';
import { profile } from '@/lib/data';
import { clip, resumeSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

// Static instances of Inter Tight (cut from the variable font, see fonts/OFL.txt), used only
// when printing: in a PDF they embed as plain TrueType, which every ATS reads (the variable
// font would become Type 3). On screen the sheet uses the site font, so nothing swaps in late.
const resumeFont = localFont({
  src: [
    { path: './fonts/InterTight-400.woff2', weight: '400' },
    { path: './fonts/InterTight-600.woff2', weight: '600' },
    { path: './fonts/InterTight-700.woff2', weight: '700' },
    { path: './fonts/InterTight-800.woff2', weight: '800' },
  ],
  variable: '--font-resume',
});

export const metadata: Metadata = {
  title: 'Resume',
  description: clip(`Resume of ${profile.fullName}, software engineer: ${profile.years}+ years with React, Next.js and TypeScript, SaaS products, design systems and performance. ATS-ready PDF.`),
  alternates: { canonical: '/resume' },
  openGraph: { type: 'profile', url: '/resume', title: `Resume — ${profile.fullName}`, firstName: profile.firstName, lastName: profile.lastName },
};

export default function ResumePage() {
  return (
    <div className={resumeFont.variable}>
      <JsonLd data={resumeSchema()} />
      <Resume />
    </div>
  );
}
