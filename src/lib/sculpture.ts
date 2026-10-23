/**
 * Geometry for the line sculpture. Every form is LINES polylines of PTS points, so any
 * two forms can be morphed point-for-point. Each form is centred and scaled to fit a
 * unit sphere. y is up.
 */
export const LINES = 44;
export const PTS = 110;
const N = LINES * PTS;

type Fn = (line: number, t: number) => [number, number, number];

function build(fn: Fn) {
  const out = new Float32Array(N * 3);
  for (let l = 0; l < LINES; l++) {
    for (let p = 0; p < PTS; p++) {
      const [x, y, z] = fn(l, p / (PTS - 1));
      const k = (l * PTS + p) * 3;
      out[k] = x;
      out[k + 1] = y;
      out[k + 2] = z;
    }
  }
  return normalise(out);
}

function normalise(a: Float32Array) {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (let i = 0; i < a.length; i += 3) {
    cx += a[i];
    cy += a[i + 1];
    cz += a[i + 2];
  }
  cx /= N;
  cy /= N;
  cz /= N;
  let r = 0;
  for (let i = 0; i < a.length; i += 3) {
    a[i] -= cx;
    a[i + 1] -= cy;
    a[i + 2] -= cz;
    r = Math.max(r, Math.hypot(a[i], a[i + 1], a[i + 2]));
  }
  for (let i = 0; i < a.length; i++) a[i] /= r;
  return a;
}

/** Frontend engineering — a wave sheet, a surface being shaped. */
const wave: Fn = (l, t) => {
  const x = (t - 0.5) * 2.6;
  const z = (l / (LINES - 1) - 0.5) * 2.6;
  const y = 0.34 * Math.sin(2.1 * x + 1.2 * z) * Math.cos(1.5 * z - 0.7 * x) + 0.12 * Math.sin(4 * x);
  return [x, y, z];
};

/** Motion & 3D — a twisted ribbon, three half-turns around a loop. */
const ribbon: Fn = (l, t) => {
  const th = t * Math.PI * 2;
  const w = (l / (LINES - 1) - 0.5) * 0.95;
  const tw = th * 1.5;
  const R = 1 + w * Math.cos(tw);
  return [R * Math.cos(th), w * Math.sin(tw) * 1.1, R * Math.sin(th)];
};

/** Performance — a field of bars, a skyline of numbers. */
function cellHeight(i: number, j: number) {
  const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  const n = s - Math.floor(s);
  const cx = i / 13 - 0.5;
  const cz = j / 13 - 0.5;
  return 0.08 + (0.35 + 0.65 * n) * Math.exp(-(cx * cx + cz * cz) * 4.5) * 1.5;
}
const bars: Fn = (l, t) => {
  const v = l / (LINES - 1);
  const i = Math.min(13, Math.floor(t * 14));
  const j = Math.min(13, Math.floor(v * 14));
  return [(t - 0.5) * 2.6, cellHeight(i, j), (v - 0.5) * 2.6];
};

/** Design systems — a lattice sphere, structure in every direction. */
const sphere: Fn = (l, t) => {
  const phi = (Math.PI * (l + 0.5)) / LINES;
  const lam = t * Math.PI * 2;
  const squash = 1 + 0.06 * Math.sin(lam * 3);
  return [Math.sin(phi) * Math.cos(lam) * squash, Math.cos(phi), Math.sin(phi) * Math.sin(lam) * squash];
};

let cache: Float32Array[] | null = null;

/** Forms in service order: frontend, motion, performance, design systems. */
export function forms() {
  cache ??= [wave, ribbon, bars, sphere].map(build);
  return cache;
}
