'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '@/lib/scroll-store';

const noise = /* glsl */ `
  // Ashima 3D simplex noise
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

const blobVertex = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  ${noise}
  float field(vec3 p){
    return (snoise(p * 1.2 + uTime * 0.3) + snoise(p * 2.6 - uTime * 0.18) * 0.3) * uDistort;
  }
  vec3 displace(vec3 p){ return p + normalize(p) * field(p); }
  void main(){
    // Recompute the normal from neighbouring displaced points so lighting follows the wobble.
    vec3 p = position;
    vec3 t = normalize(cross(normal, abs(normal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
    vec3 bt = normalize(cross(normal, t));
    float e = 0.01;
    vec3 d0 = displace(p);
    vec3 d1 = displace(normalize(p + t * e));
    vec3 d2 = displace(normalize(p + bt * e));
    vec3 n = normalize(cross(d1 - d0, d2 - d0));
    if (dot(n, normal) < 0.0) n = -n;
    vNoise = field(p);
    vec4 mv = modelViewMatrix * vec4(d0, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * n);
    gl_Position = projectionMatrix * mv;
  }
`;

const blobFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHue;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  vec3 grad(float t){
    vec3 c1 = vec3(0.0, 0.9, 1.0);   // cyan
    vec3 c2 = vec3(0.49, 0.36, 1.0); // violet
    vec3 c3 = vec3(1.0, 0.31, 0.85); // magenta
    return t < 0.5 ? mix(c1, c2, t * 2.0) : mix(c2, c3, t * 2.0 - 1.0);
  }
  void main(){
    vec3 n = normalize(vNormal);
    float fres = pow(1.0 - clamp(dot(n, vView), 0.0, 1.0), 2.0);
    float t = 0.5 + 0.5 * sin(6.2831 * (n.y * 0.35 + n.x * 0.25 + vNoise * 0.9 + uHue + uTime * 0.04));
    vec3 iri = grad(t);
    vec3 col = mix(vec3(0.02, 0.02, 0.06), iri, 0.18 + fres * 0.95);
    vec3 L = normalize(vec3(-0.4, 0.8, 0.6));
    float spec = pow(max(dot(reflect(-L, n), vView), 0.0), 28.0);
    col += spec * 0.55 + pow(fres, 4.0) * iri * 0.6;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function Blob({ isMobile }: { isMobile: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uDistort: { value: 0.3 }, uHue: { value: 0 } }),
    []
  );
  const smooth = useRef({ p: 0, v: 0, px: 0, py: 0 });

  useFrame((state, dt) => {
    const s = smooth.current;
    s.p = damp(s.p, scrollState.progress, 4, dt);
    s.v = damp(s.v, Math.min(Math.abs(scrollState.velocity) / 40, 1), 3, dt);
    s.px = damp(s.px, scrollState.pointerX, 2.5, dt);
    s.py = damp(s.py, scrollState.pointerY, 2.5, dt);

    const p = s.p;
    const u = material.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uDistort.value = 0.16 + s.v * 0.22 + Math.sin(p * Math.PI) * 0.08;
    u.uHue.value = p * 0.6;

    // Choreography: hero right → centre and closer → drifts left → recedes at the end.
    const baseX = isMobile ? 0 : 2.3;
    const x = THREE.MathUtils.lerp(baseX, isMobile ? 0 : -2.2, THREE.MathUtils.smoothstep(p, 0.08, 0.45));
    const xEnd = THREE.MathUtils.lerp(x, 0, THREE.MathUtils.smoothstep(p, 0.7, 1));
    const y = (isMobile ? 1.1 : 0.35) + Math.sin(p * Math.PI * 2) * 0.35;
    const scale = (isMobile ? 0.8 : 1) * (1 + Math.sin(p * Math.PI) * 0.25);

    mesh.current.position.set(xEnd + s.px * 0.25, y + s.py * 0.2, 0);
    mesh.current.rotation.set(p * Math.PI * 2 + s.py * 0.3, p * Math.PI * 3 + state.clock.elapsedTime * 0.1 + s.px * 0.4, 0);
    mesh.current.scale.setScalar(scale);

    wire.current.position.copy(mesh.current.position);
    wire.current.rotation.set(Math.PI / 2.4 + p * 2, state.clock.elapsedTime * 0.15, p * Math.PI);
    wire.current.scale.setScalar(scale * 1.55);

    state.camera.position.x = damp(state.camera.position.x, s.px * 0.35, 3, dt);
    state.camera.position.y = damp(state.camera.position.y, s.py * 0.25, 3, dt);
    state.camera.position.z = 6 - Math.sin(p * Math.PI) * 1.2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, isMobile ? 32 : 64]} />
        <shaderMaterial ref={material} vertexShader={blobVertex} fragmentShader={blobFragment} uniforms={uniforms} />
      </mesh>
      <mesh ref={wire}>
        <torusGeometry args={[1, 0.004, 8, 160]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.55} />
      </mesh>
    </>
  );
}

// Seeded PRNG so the star field is identical on every render (and lint-pure).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color('#00e5ff'), new THREE.Color('#7c5cff'), new THREE.Color('#ff4fd8'), new THREE.Color('#ffffff')];
    const rand = mulberry32(886);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 10;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 4;
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [count]);

  useFrame((state, dt) => {
    const p = scrollState.progress;
    ref.current.rotation.y += dt * 0.02 + Math.abs(scrollState.velocity) * 0.0004;
    ref.current.rotation.x = damp(ref.current.rotation.x, p * 1.2, 2, dt);
    ref.current.position.z = damp(ref.current.position.z, p * 6, 2, dt);
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Rig() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  return (
    <>
      <Blob isMobile={isMobile} />
      <Particles count={isMobile ? 700 : 1800} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
    >
      <Rig />
    </Canvas>
  );
}
