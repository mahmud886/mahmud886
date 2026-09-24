'use client';

import { useMemo, useRef } from 'react';
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
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }
  mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;   // y spans -0.5..0.5
    float p = uP;
    bool mobile = uMobile > 0.5;

    // --- Choreography: hero (upper right) -> drifts left mid-page -> centred above the horizon at the end.
    vec2 c = mobile ? vec2(0.0, 0.2) : vec2(0.45, 0.13);
    c = mix(c, mobile ? vec2(0.0, 0.16) : vec2(-0.42, 0.08), smoothstep(0.08, 0.45, p));
    c = mix(c, vec2(0.0, 0.12), smoothstep(0.72, 1.0, p));
    c += uPointer * vec2(0.025, 0.018);
    float R = (mobile ? 0.12 : 0.155) * (1.0 - 0.12 * sin(p * 3.14159));

    vec2 d = uv - c;
    float r = length(d);
    float ang = atan(d.y, d.x);

    // --- Sky + stars
    vec3 col = mix(vec3(0.004, 0.005, 0.012), vec3(0.016, 0.02, 0.045), smoothstep(-0.5, 0.6, uv.y));
    vec2 sg = uv * 170.0;
    float sh = hash(floor(sg));
    float star = step(0.982, sh) * smoothstep(0.45, 0.0, length(fract(sg) - 0.5));
    col += star * (0.55 + 0.45 * sin(uTime * 1.7 + sh * 50.0)) * vec3(0.85, 0.9, 1.0);

    // --- Corona: streaky glow hugging the disc, plus a wide violet halo
    float streak = fbm(vec2(ang * 2.5 + 11.0, r * 5.0 - uTime * 0.04));
    float outside = smoothstep(R * 0.99, R * 1.02, r);
    col += exp(-(r - R) * 20.0) * outside * (0.35 + 0.9 * streak) * vec3(1.0, 0.8, 0.6) * 0.7;
    col += exp(-(r - R) * 5.0) * outside * vec3(0.3, 0.18, 0.42) * 0.16;

    // --- The moon: a clean black disc
    col = mix(col, vec3(0.004, 0.004, 0.008), smoothstep(R * 1.005, R * 0.99, r));

    // --- Thin burning ring on the limb
    col += exp(-abs(r - R) * 240.0) * vec3(1.0, 0.93, 0.82) * 1.3;

    // --- Diamond-ring flare travelling round the limb with scroll + pointer
    float fa = 0.35 + p * 3.14159 + uPointer.x * 0.35 + uTime * 0.02;
    vec2 fp = c + R * vec2(cos(fa), sin(fa));
    vec2 fd = uv - fp;
    float flare = 0.0022 / (dot(fd, fd) + 0.00045);
    vec2 fr = rot(0.785) * fd;
    float spikes = exp(-abs(fd.y) * 380.0) * exp(-abs(fd.x) * 10.0)
                 + exp(-abs(fd.x) * 380.0) * exp(-abs(fd.y) * 10.0)
                 + 0.5 * (exp(-abs(fr.y) * 420.0) * exp(-abs(fr.x) * 18.0) + exp(-abs(fr.x) * 420.0) * exp(-abs(fr.y) * 18.0));
    col += (flare * 0.35 + spikes * 0.9) * vec3(1.0, 0.92, 0.8);

    // --- Clouds: fbm in a domain that twists around the eclipse, lit orange-red on their edges
    float t = uTime * 0.018 + p * 1.6 + uVel * 0.3;
    vec2 rd = rot(0.9 / (r + 0.25) + t) * d;
    float n = fbm(rd * 3.2 + vec2(0.0, t * 0.8));
    float n2 = fbm(rd * 7.0 - n * 1.6 + 3.0);
    float density = n * 0.7 + n2 * 0.45;
    float cloud = smoothstep(0.5, 0.82, density) * smoothstep(R * 1.15, R * 2.6, r);
    float edge = clamp(cloud * (1.0 - cloud) * 4.0, 0.0, 1.0);
    float sunLight = exp(-(r - R) * 2.6);
    vec3 cloudBody = mix(vec3(0.012, 0.014, 0.028), vec3(0.06, 0.07, 0.11), n2 * n2);
    vec3 cloudRim = vec3(1.0, 0.5, 0.28) * sunLight * 1.1 + vec3(0.16, 0.2, 0.34) * 0.35;
    col = mix(col, cloudBody + cloudRim * edge * edge, cloud * 0.95);

    // --- Red horizon + sea, rising as you reach the end of the page
    float rise = smoothstep(0.55, 1.0, p);
    float hY = mix(-0.47, -0.2, rise) + (mobile ? 0.02 : 0.0);
    float above = uv.y - hY;
    float glowStrength = 0.3 + 0.8 * rise;
    col += vec3(0.95, 0.06, 0.03) * exp(-max(above, 0.0) * 13.0) * glowStrength;
    if (above < 0.0) {
      float depth = -above;
      float waves = fbm(vec2(uv.x * 5.0 + uTime * 0.03, depth * 60.0 / (depth * 6.0 + 0.2)));
      vec3 sea = vec3(0.08, 0.005, 0.01) + vec3(0.95, 0.09, 0.05) * exp(-depth * 7.0) * (0.35 + 0.8 * waves);
      sea += vec3(1.0, 0.3, 0.15) * exp(-abs(uv.x - c.x) * 7.0) * exp(-depth * 5.0) * 0.45 * smoothstep(0.45, 0.8, waves);
      col = mix(col, sea * glowStrength * 1.2, smoothstep(0.0, 0.008, depth));
    }
    col += vec3(1.0, 0.3, 0.12) * exp(-abs(above) * 140.0) * 0.7 * glowStrength;

    // --- Keep the middle of the page calmer so body copy stays readable
    col *= mix(1.0, 0.62, smoothstep(0.14, 0.3, p) * (1.0 - smoothstep(0.82, 0.96, p)));

    // --- Vignette + soft tone curve
    col *= 1.0 - 0.55 * dot(uv * vec2(0.75, 1.0), uv * vec2(0.75, 1.0));
    col = 1.0 - exp(-col * 1.2);
    col = pow(col, vec3(1.12));
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
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }} flat>
      <Eclipse />
    </Canvas>
  );
}
