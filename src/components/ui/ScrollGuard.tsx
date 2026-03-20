'use client';

import { useEffect } from 'react';

export default function ScrollGuard() {
  useEffect(() => {
    const restore = () => {
      const html = document.documentElement as HTMLElement;
      // If no modal is visible, ensure scrolling is enabled
      const anyModal = !!document.querySelector('[data-modal-open=\"true\"]');
      if (!anyModal) {
        document.body.style.overflowY = '';
        html.style.overflowY = '';
      }
    };
    restore();
    const id = setInterval(restore, 5000); // periodic safety
    return () => clearInterval(id);
  }, []);
  return null;
}

