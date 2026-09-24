'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import type { BackgroundVideo } from '@/lib/data';

type Props = { video: BackgroundVideo; dim: boolean; onFail: () => void };

export default function VideoBackground({ video, dim, onFail }: Props) {
  const el = useRef<HTMLVideoElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const [posterOnly, setPosterOnly] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  // Pick the source on the client: phones get the lighter file, data-saver / reduced-motion get the poster only.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on browser-only media queries
    setPosterOnly(reduce || saveData);
    setSrc(mobile && video.mobileSrc ? video.mobileSrc : video.src);
  }, [video]);

  // Playback: loop mode autoplays and pauses when the tab is hidden; scroll mode scrubs the playhead.
  useEffect(() => {
    const v = el.current;
    if (!v || posterOnly || !src) return;

    if (video.mode === 'loop') {
      const play = () => void v.play().catch(() => {});
      const onVisibility = () => (document.hidden ? v.pause() : play());
      play();
      document.addEventListener('visibilitychange', onVisibility);
      return () => document.removeEventListener('visibilitychange', onVisibility);
    }

    v.pause();
    let target = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (v.duration) target = self.progress * (v.duration - 0.05);
      },
    });
    // Ease the playhead toward the scroll position so seeking stays smooth.
    const tick = () => {
      if (!v.duration || v.seeking) return;
      const next = v.currentTime + (target - v.currentTime) * 0.15;
      if (Math.abs(next - v.currentTime) > 0.01) v.currentTime = next;
    };
    gsap.ticker.add(tick);
    return () => {
      st.kill();
      gsap.ticker.remove(tick);
    };
  }, [posterOnly, src, video.mode]);

  // Readability: darker behind body copy mid-page, lighter at the hero and the contact finale.
  useEffect(() => {
    const base = dim ? 0.65 : 0;
    gsap.set(shade.current, { opacity: dim ? base : 0.25 });
    if (dim) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const p = self.progress;
        const mid = gsap.utils.clamp(0, 1, (p - 0.1) / 0.15) * (1 - gsap.utils.clamp(0, 1, (p - 0.82) / 0.12));
        gsap.to(shade.current, { opacity: 0.25 + 0.3 * mid, duration: 0.4, overwrite: true });
      },
    });
    return () => st.kill();
  }, [dim]);

  return (
    <>
      {posterOnly || !src ? (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed decorative poster, sized by CSS
        <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={el}
          key={src}
          src={src}
          poster={video.poster}
          muted
          playsInline
          loop={video.mode === 'loop'}
          preload={video.mode === 'scroll' ? 'auto' : 'metadata'}
          onError={onFail}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div ref={shade} className="absolute inset-0 bg-background" style={{ opacity: 0.25 }} />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/70 to-transparent" />
    </>
  );
}
