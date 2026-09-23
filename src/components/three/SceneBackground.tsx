'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// WebGL is loaded after first paint so the text (and LCP) never waits on three.js.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function SceneBackground({ dim = false }: { dim?: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = idle(() => setReady(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgba(124,92,255,0.18),transparent_70%),radial-gradient(40%_40%_at_15%_80%,rgba(0,229,255,0.10),transparent_70%)]" />
      {ready && (
        <div className={`absolute inset-0 animate-[fadeIn_1.6s_ease_forwards] opacity-0 ${dim ? '[--to:0.35]' : '[--to:1]'}`}>
          <Scene />
        </div>
      )}
      <style>{`@keyframes fadeIn{to{opacity:var(--to,1)}}`}</style>
    </div>
  );
}
