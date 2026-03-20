'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle mouse parallax
      const x = (state.pointer.x * state.viewport.width) / 10;
      const y = (state.pointer.y * state.viewport.height) / 10;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[3, 2, -5]} scale={1.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#6B46C1" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-4, -1, -3]} scale={1.2}>
          <torusGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3B82F6" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[2, -3, -4]} scale={0.8}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8B5CF6" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-background pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Particles />
        <FloatingShapes />
        <fog attach="fog" args={['#0f172a', 5, 15]} />
      </Canvas>
    </div>
  );
}
