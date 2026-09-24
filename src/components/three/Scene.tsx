'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll-store';

// One full-screen quad; everything (stars, eclipse, clouds, red horizon) is drawn in the fragment shader.
const vertex = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uP;        // page scroll progress 0..1
  uniform float uVel;      // smoothed scroll speed 0..1
  uniform vec2 uPointer;   // -1..1
  uniform float uMobile;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 6; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }
  // Billow noise: folded fbm gives round, puffy lobes instead of flat blotches.
  float billow(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) { v += a * abs(noise(p) * 2.0 - 1.0); p = m * p; a *= 0.5; }
    return v;
  }
  vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
  }
  // Worley F1: distance to the nearest feature point. 1 - F1 is a field of round bumps —
  // unioned, their edges scallop like cumulus / cauliflower clouds.
  float worley(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float m = 1.0;
    for (int y = -1; y <= 1; y++)
      for (int x = -1; x <= 1; x++) {
        vec2 o = vec2(float(x), float(y));
        vec2 h = hash2(i + o);
        m = min(m, length(o + h - f));
      }
    return m;
  }
  mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
  // Ordered (Bayer 4x4) dither threshold in [0,1): gives the pixel-art gradient texture.
  float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;   // y spans -0.5..0.5
    float p = uP;
    bool mobile = uMobile > 0.5;

    // --- Choreography: hero (upper right) -> drifts left mid-page -> centred above the horizon at the end.
    float aspect = uRes.x / uRes.y;
    // Keep the whole eclipse on screen however narrow the window is.
    float edgeX = aspect * 0.5 - 0.3;
    vec2 c = mobile ? vec2(0.0, 0.2) : vec2(min(0.45, edgeX), 0.13);
    c = mix(c, mobile ? vec2(0.0, 0.16) : vec2(-min(0.42, edgeX), 0.08), smoothstep(0.08, 0.45, p));
    c = mix(c, vec2(0.0, 0.12), smoothstep(0.72, 1.0, p));
    c += uPointer * vec2(0.025, 0.018);
    float R = (mobile ? 0.13 : 0.175) * (1.0 - 0.12 * sin(p * 3.14159));

    vec2 d = uv - c;
    float r = length(d);
    float ang = atan(d.y, d.x);

    // --- Deep navy sky with a dense, colour-varied starfield
    vec3 col = mix(vec3(0.008, 0.012, 0.035), vec3(0.02, 0.04, 0.1), smoothstep(-0.5, 0.6, uv.y));
    vec2 sg = uv * 140.0;
    vec2 si = floor(sg);
    float sh = hash(si);
    float star = step(0.955, sh) * smoothstep(0.5, 0.1, length(fract(sg) - 0.5 + (hash(si + 7.0) - 0.5) * 0.4));
    vec3 starCol = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.85, 0.7), hash(si + 3.0));
    col += star * (0.45 + 0.55 * sin(uTime * 1.5 + sh * 60.0)) * starCol * (0.5 + 0.8 * step(0.992, sh));

    // --- Corona, moon, burning limb
    float streak = fbm(vec2(ang * 2.5 + 11.0, r * 5.0 - uTime * 0.04));
    float outside = smoothstep(R * 0.99, R * 1.02, r);
    col += exp(-(r - R) * 22.0) * outside * (0.3 + 0.9 * streak) * vec3(1.0, 0.85, 0.7) * 0.6;
    col = mix(col, vec3(0.0), smoothstep(R * 1.005, R * 0.99, r));
    // Limb is brightest on the flare side, like a real diamond ring.
    float fa = 0.35 + p * 3.14159 + uPointer.x * 0.35 + uTime * 0.02;
    float limbBias = 0.45 + 0.55 * max(cos(ang - fa), 0.0);
    col += exp(-abs(r - R) * 300.0) * vec3(1.0, 0.95, 0.88) * 1.5 * limbBias;

    // --- Diamond-ring flare
    vec2 fp = c + R * vec2(cos(fa), sin(fa));
    vec2 fd = uv - fp;
    float flare = 0.0016 / (dot(fd, fd) + 0.0003);
    vec2 fr = rot(0.785) * fd;
    float spikes = exp(-abs(fd.y) * 420.0) * exp(-abs(fd.x) * 9.0)
                 + exp(-abs(fd.x) * 420.0) * exp(-abs(fd.y) * 9.0)
                 + 0.45 * (exp(-abs(fr.y) * 480.0) * exp(-abs(fr.x) * 20.0) + exp(-abs(fr.x) * 480.0) * exp(-abs(fr.y) * 20.0));
    col += (flare * 0.35 + spikes) * vec3(1.0, 0.93, 0.82);

    // --- Clouds: layered, swirling round the eclipse, with a clear window of stars around the sun
    float rise = smoothstep(0.55, 1.0, p);
    float hY = mix(-0.47, -0.2, rise) + (mobile ? 0.02 : 0.0);
    float t = uTime * 0.015 + p * 1.6 + uVel * 0.3;
    vec2 rd = rot(0.6 / (r + 0.35) + t) * d;
    // Concentric cloud walls spiralling round the eclipse, broken up into round puffs.
    float n = fbm(rd * 2.2 + vec2(0.0, t * 0.5));
    float bands = 0.5 + 0.5 * sin(r * 15.0 - n * 6.0 - t * 2.0);
    float puffs = 1.0 - worley(rd * 5.5 + n * 1.2);
    float puffsSmall = 1.0 - worley(rd * 12.0 - n * 2.0 + 7.0);
    float dens = n * 0.5 + bands * 0.2 + puffs * 0.42 + puffsSmall * 0.14 - 0.1;
    dens -= (1.0 - smoothstep(R * 1.3, R * 3.2, r)) * 0.6;          // clear window of stars round the sun
    dens += smoothstep(0.1, hY, uv.y) * 0.12;                        // thicker banks toward the horizon
    float cloud = smoothstep(0.5, 0.535, dens);

    // Light: whole banks catch light on their sun side; small puffs get silver speckles.
    vec2 toSun = normalize(-d);
    float facing = clamp(-dot(normalize(vec2(dFdx(dens), dFdy(dens)) + 1e-6), toSun), 0.0, 1.0);
    float facingPuff = clamp(-dot(normalize(vec2(dFdx(puffs), dFdy(puffs)) + 1e-6), toSun), 0.0, 1.0);
    float sunLight = exp(-(r - R) * 1.5);
    float inner = smoothstep(0.52, 0.8, dens);
    vec3 body = mix(vec3(0.03, 0.04, 0.085), vec3(0.08, 0.1, 0.17), inner) * (0.75 + 0.45 * puffs);
    vec3 silver = vec3(0.78, 0.82, 0.92);
    vec3 lit = silver * (pow(facing, 3.0) * 0.35 + pow(facingPuff, 5.0) * 0.4 * inner) * (0.35 + 0.65 * sunLight);

    // Crest: bright rim where a bank meets open sky — silver up high, gold near the sun, red by the horizon.
    float crest = clamp(cloud * (1.0 - cloud) * 4.0, 0.0, 1.0) * (0.35 + 0.65 * facing);
    float nearHorizon = smoothstep(hY + 0.3, hY, uv.y) * (0.4 + 0.6 * rise);
    vec3 crestCol = mix(silver, vec3(1.0, 0.72, 0.45), clamp(sunLight * 1.2, 0.0, 1.0));
    crestCol = mix(crestCol, vec3(1.0, 0.22, 0.1), nearHorizon);
    vec3 cloudCol = body + lit * 1.3 + crestCol * crest * 1.9;
    cloudCol += vec3(0.8, 0.08, 0.04) * nearHorizon * 0.25 * inner;  // red bounce light on low banks
    col = mix(col, cloudCol, cloud);

    // --- Red horizon + glittering sea, rising toward the contact section
    float above = uv.y - hY;
    float glowStrength = 0.3 + 0.85 * rise;
    col += vec3(1.0, 0.05, 0.03) * exp(-max(above, 0.0) * 12.0) * glowStrength;
    if (above < 0.0) {
      float depth = -above;
      float waves = fbm(vec2(uv.x * 7.0 + uTime * 0.04, depth * 70.0 / (depth * 6.0 + 0.2)));
      vec3 sea = vec3(0.1, 0.0, 0.01) + vec3(1.0, 0.08, 0.04) * exp(-depth * 6.0) * (0.3 + 0.9 * waves);
      float glitter = step(0.78, waves) * exp(-abs(uv.x - c.x) * 5.0) * exp(-depth * 4.0);
      sea += vec3(1.0, 0.55, 0.35) * glitter * 0.9;
      float sparkle = step(0.985, hash(floor(gl_FragCoord.xy * 0.5) + floor(uTime * 3.0)));
      sea += vec3(1.0, 0.7, 0.55) * sparkle * exp(-depth * 4.0) * exp(-abs(uv.x - c.x) * 2.5) * 0.9;
      col = mix(col, sea * glowStrength * 1.25, smoothstep(0.0, 0.006, depth));
    }
    col += vec3(1.0, 0.35, 0.15) * exp(-abs(above) * 160.0) * 0.8 * glowStrength;

    // --- Foreground rocks, silhouetted and rim-lit red, emerging at the end of the page
    float rockTop = -0.5 + rise * (0.06 + 0.16 * fbm(vec2(uv.x * 2.2, 4.0)) * (0.35 + abs(uv.x) * 1.4));
    float rockEdge = rockTop - uv.y;
    if (rockEdge > 0.0) {
      float grain = fbm(uv * 26.0);
      vec3 rock = vec3(0.02, 0.012, 0.02) + vec3(0.12, 0.03, 0.03) * grain;
      rock += vec3(1.0, 0.15, 0.06) * exp(-rockEdge * 90.0) * 0.8 * rise;
      col = rock;
    }

    // --- Hero: soft shadow behind the name and intro copy
    vec2 hm = uv - (mobile ? vec2(0.0, -0.18) : vec2(-0.55, -0.12));
    col *= 1.0 - 0.5 * exp(-dot(hm, hm) * 3.5) * (1.0 - smoothstep(0.04, 0.14, p));

    // --- Keep the middle of the page calmer so body copy stays readable
    col *= mix(1.0, 0.45, smoothstep(0.12, 0.26, p) * (1.0 - smoothstep(0.84, 0.96, p)));

    // --- Vignette, tone curve, then dithered colour quantisation for the pixel-art finish
    col *= 1.0 - 0.5 * dot(uv * vec2(0.75, 1.0), uv * vec2(0.75, 1.0));
    col = 1.0 - exp(-col * 1.25);
    float levels = 14.0;
    col = floor(col * levels + bayer4(gl_FragCoord.xy)) / levels;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Eclipse() {
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { size, gl } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uP: { value: 0 },
      uVel: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uMobile: { value: 0 },
    }),
    []
  );
  const smooth = useRef({ p: 0, v: 0, px: 0, py: 0 });

  useFrame((state, dt) => {
    const s = smooth.current;
    s.p = THREE.MathUtils.damp(s.p, scrollState.progress, 4, dt);
    s.v = THREE.MathUtils.damp(s.v, Math.min(Math.abs(scrollState.velocity) / 40, 1), 3, dt);
    s.px = THREE.MathUtils.damp(s.px, scrollState.pointerX, 2.5, dt);
    s.py = THREE.MathUtils.damp(s.py, scrollState.pointerY, 2.5, dt);

    const u = material.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uP.value = s.p;
    u.uVel.value = s.v;
    u.uPointer.value.set(s.px, s.py);
    u.uRes.value.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());
    u.uMobile.value = size.width < 768 ? 1 : 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthWrite={false} depthTest={false} />
    </mesh>
  );
}

export default function Scene() {
  // Render at a fraction of the screen resolution and upscale with hard edges: that is the pixel-art look,
  // and it makes the shader several times cheaper.
  const [pixelRatio] = useState(() => (window.innerWidth < 768 ? 0.6 : 0.5));
  return (
    <Canvas
      dpr={pixelRatio}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      flat
      onCreated={({ gl }) => {
        gl.domElement.style.imageRendering = 'pixelated';
      }}
    >
      <Eclipse />
    </Canvas>
  );
}
