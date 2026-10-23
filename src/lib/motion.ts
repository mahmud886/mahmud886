'use client';

import { useSyncExternalStore } from 'react';

/**
 * One switch for everything that moves: the halftone field, the sculpture, marquees,
 * tickers. The pre-paint script in the layout seeds `data-motion` from storage (or from
 * prefers-reduced-motion), so CSS animations can stop before the first frame.
 */
const EVENT = 'motion:change';

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

const isPaused = () => document.documentElement.dataset.motion === 'paused';

function subscribeReduced(cb: () => void) {
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

const isReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setMotion(paused: boolean) {
  document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
  try {
    localStorage.setItem('motion', paused ? 'paused' : 'playing');
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function toggleMotion() {
  setMotion(!isPaused());
}

export function useMotion() {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);
  const reduced = useSyncExternalStore(subscribeReduced, isReduced, () => false);
  return { paused, reduced, toggle: toggleMotion };
}
