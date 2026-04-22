"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * CapsuleHouseModel — a clean architectural prefab capsule home.
 * Shape: elongated rounded-corner box (like a luxury shipping container),
 * with panoramic windows, a door, roof overhang, and steel legs.
 */
function CapsuleHouseModel({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0]}>

      {/* ── Main Body ─────────────────────────────────────────────── */}
      <RoundedBox
        args={[6, 2.4, 2.6]}
        radius={0.12}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.25}
        />
      </RoundedBox>

      {/* ── Roof Overhang (slightly wider/longer) ─────────────────── */}
      <RoundedBox args={[6.3, 0.1, 2.8]} radius={0.05} smoothness={2} position={[0, 1.25, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* ── Large Panoramic Front Window ──────────────────────────── */}
      {/* Full-width ribbon window */}
      <mesh position={[0, 0.3, 1.32]}>
        <boxGeometry args={[4.2, 0.9, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          transmission={0.85}
          opacity={1}
          roughness={0}
          metalness={0.1}
          ior={1.5}
          thickness={0.1}
        />
      </mesh>
      {/* Window frame top */}
      <mesh position={[0, 0.78, 1.31]}>
        <boxGeometry args={[4.4, 0.06, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Window frame bottom */}
      <mesh position={[0, -0.15, 1.31]}>
        <boxGeometry args={[4.4, 0.06, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Window frame left */}
      <mesh position={[-2.23, 0.3, 1.31]}>
        <boxGeometry args={[0.06, 1.0, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Window frame right */}
      <mesh position={[2.23, 0.3, 1.31]}>
        <boxGeometry args={[0.06, 1.0, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Window sill panel below ribbon */}
      <mesh position={[0, -0.55, 1.32]}>
        <boxGeometry args={[4.2, 0.7, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Interior warm glow visible through glass */}
      <pointLight position={[0, 0.3, 0.8]} color="#ffe8cc" intensity={1.5} distance={3} />

      {/* ── Entry Door — centered on the RIGHT end wall ─────────── */}
      {/* Door panel */}
      <mesh position={[3.04, -0.25, 0]}>
        <boxGeometry args={[0.05, 1.85, 0.9]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Door frame (slightly larger, recessed behind panel) */}
      <mesh position={[3.03, -0.25, 0]}>
        <boxGeometry args={[0.03, 2.0, 1.05]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Door handle */}
      <mesh position={[3.1, -0.25, -0.35]}>
        <boxGeometry args={[0.06, 0.04, 0.22]} />
        <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
      </mesh>
      {/* Door step */}
      <mesh position={[3.2, -1.23, 0]}>
        <boxGeometry args={[0.3, 0.06, 0.7]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* ── Rear small window ─────────────────────────────────────── */}
      <mesh position={[0, 0.3, -1.32]}>
        <boxGeometry args={[1.5, 0.8, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          transmission={0.85}
          opacity={1}
          roughness={0}
          metalness={0.1}
          ior={1.5}
          thickness={0.1}
        />
      </mesh>

      {/* ── Structural Support Legs ───────────────────────────────── */}
      {[[-2.4, -2.2], [-2.4, 2.2], [2.4, -2.2], [2.4, 2.2]].map(([x, z], i) => (
        <mesh key={i} position={[x as number, -1.45, (z as number) / 2]}>
          <boxGeometry args={[0.2, 0.7, 0.2]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* ── Horizontal skid rails connecting front/rear legs ──────── */}
      <mesh position={[-2.4, -1.75, 0]}>
        <boxGeometry args={[0.15, 0.1, 2.4]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[2.4, -1.75, 0]}>
        <boxGeometry args={[0.15, 0.1, 2.4]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ── Roof-mounted solar / ventilation strip ────────────────── */}
      <mesh position={[0, 1.33, 0]}>
        <boxGeometry args={[2.5, 0.05, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
      </mesh>

    </group>
  );
}

export default function Capsule3D({
  color = "#d8d8d8",
  autoRotate = false,
}: {
  color?: string;
  autoRotate?: boolean;
}) {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [7, 3, 7], fov: 40 }}>
        {/* Natural daylight scene */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#cce8ff" />

        <CapsuleHouseModel color={color} />

        <Environment preset="apartment" />
        <ContactShadows
          position={[0, -1.92, 0]}
          opacity={0.5}
          scale={18}
          blur={2.5}
          far={3}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={16}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
