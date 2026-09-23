'use client';

// The intro overlay and the hero reveal hand off through this tiny event bus,
// so the hero never animates underneath a curtain that is still covering it.
const EVENT = 'intro:done';

export function markIntroDone() {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroDone(cb: () => void) {
  // Pages without the intro overlay (everything but home) have nothing to wait for.
  if ((window as unknown as { __introDone?: boolean }).__introDone || !document.querySelector('[data-preloader]')) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
