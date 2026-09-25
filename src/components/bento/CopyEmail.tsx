'use client';

import { useState } from 'react';
import { profile } from '@/lib/data';

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {}
      }}
      className="inline-flex h-11 items-center rounded-full border border-pop-ink/25 px-5 text-sm font-semibold"
    >
      {copied ? '✓ Copied' : 'Copy address'}
    </button>
  );
}
