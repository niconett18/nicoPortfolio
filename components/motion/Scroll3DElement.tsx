"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import * as THREE from "three";

/* ── Waypoints ──────────────────────────────────────────────────
   Define keyframe positions for the 3D object at different scroll
   progress values, so it travels across the entire viewport like
   lenis.dev's torus knot. Each waypoint is [x, y, scale].        */
const WAYPOINTS: [number, [number, number, number]][] = [
  [0.0, [3.0, 1.5, 1.8]],   // top-right, large
  [0.15, [1.5, 0.0, 1.4]],  // drift center-right
  [0.3, [-2.5, -1.0, 1.0]], // swing far-left, smaller
  [0.5, [0.0, 0.5, 1.6]],   // back to center, bigger
  [0.65, [2.8, -0.5, 1.2]], // far-right again
  [0.8, [-1.5, 1.0, 1.5]],  // left-upper area
  [1.0, [0.0, -1.5, 2.0]],  // end center-bottom, zoom in
];

function lerpWaypoints(progress: number): [number, number, number] {
  if (progress <= 0) return WAYPOINTS[0][1];
  if (progress >= 1) return WAYPOINTS[WAYPOINTS.length - 1][1];

  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const [t0, v0] = WAYPOINTS[i];
    const [t1, v1] = WAYPOINTS[i + 1];
    if (progress >= t0 && progress <= t1) {
      const t = (progress - t0) / (t1 - t0);
      // Smooth-step for organic feel
      const s = t * t * (3 - 2 * t);
      return [
        v0[0] + (v1[0] - v0[0]) * s,
        v0[1] + (v1[1] - v0[1]) * s,
        v0[2] + (v1[2] - v0[2]) * s,
      ];
    }
  }
  return WAYPOINTS[WAYPOINTS.length - 1][1];
}

function Scene({ scrollYProgress, scrollVelocity }: {
  scrollYProgress: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const idleRotation = useRef({ x: 0, y: 0, z: 0 });

  // A faceted icosahedron: one readable solid instead of a dense knot, so the
  // wireframe stays a handful of clean triangles behind the content.
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.45, 1), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const progress = scrollYProgress.get();
    const velocity = scrollVelocity.get();

    // ── Idle auto-rotation (always spinning slowly) ──
    const idleSpeed = 0.15;
    idleRotation.current.x += delta * idleSpeed * 0.7;
    idleRotation.current.y += delta * idleSpeed;
    idleRotation.current.z += delta * idleSpeed * 0.3;

    // ── Scroll-linked rotation (velocity drives speed) ──
    const scrollRotBoost = velocity * 0.003;
    meshRef.current.rotation.x = idleRotation.current.x + progress * Math.PI * 2 + scrollRotBoost;
    meshRef.current.rotation.y = idleRotation.current.y + progress * Math.PI * 3;
    meshRef.current.rotation.z = idleRotation.current.z + progress * Math.PI * 0.5;

    // ── Position & scale from waypoints ──
    const [wx, wy, ws] = lerpWaypoints(progress);
    // Smooth lerp towards target for fluid feel
    meshRef.current.position.x += (wx - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (wy - meshRef.current.position.y) * 0.08;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (ws - currentScale) * 0.08;
    meshRef.current.scale.setScalar(newScale);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#3b5bff"
        wireframe
        transparent
        opacity={0.38}
      />
    </mesh>
  );
}

export default function Scroll3DElement() {
  const { scrollYProgress } = useScroll();

  // Spring-based velocity tracking for smooth rotation response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll velocity for rotation speed boost
  const velocityRef = useRef(0);
  const prevProgress = useRef(0);
  const velocityMotion = useSpring(0, { stiffness: 100, damping: 20 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const vel = (latest - prevProgress.current) * 1000;
    prevProgress.current = latest;
    velocityMotion.set(vel);
  });

  return (
    <div
      className="scroll-3d-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene
          scrollYProgress={smoothProgress}
          scrollVelocity={velocityMotion}
        />
      </Canvas>
    </div>
  );
}
