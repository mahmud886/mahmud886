'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrollText({
  children,
  className,
  start = 'top 85%',
  end = 'bottom 45%',
}: {
  children: string;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const split = SplitText.create(ref.current, { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.14, filter: 'blur(3px)' },
        { opacity: 1, filter: 'blur(0px)', stagger: 0.05, ease: 'none', scrollTrigger: { trigger: ref.current, start, end, scrub: true } }
      );
      return () => split.revert();
    },
    { scope: ref }
  );
  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
