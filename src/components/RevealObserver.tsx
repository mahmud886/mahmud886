'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Adds `.in` to every [data-reveal] element the first time it scrolls into view. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    const observe = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    observe();
    // Content streamed in later (e.g. the Medium list) gets picked up too.
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}
