"use client";

import { useRef, useMemo, useEffect } from "react";
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
  const meshRef = useRef<THREE.Group>(null);
  const idleRotation = useRef({ x: 0, y: 0, z: 0 });

  /* A single polished ring. Simple enough to stay out of the content's way,
     curved enough to catch the light as it turns. */
  const object = useMemo(() => {
    // A drawn line, not a solid form. Mostly emissive so a hairline tube still
    // registers, with just enough roughness to vary as it turns.
    const material = new THREE.MeshStandardMaterial({
      color: "#2440a8",
      emissive: "#3b5bff",
      emissiveIntensity: 0.75,
      roughness: 0.45,
      metalness: 0.3,
      transparent: true,
      opacity: 0.5,
    });

    // Hairline tube on a wide radius: the earlier 0.3 tube was what made it
    // read as a heavy donut. Segment counts stay high so the circle is clean.
    const geometry = new THREE.TorusGeometry(1.28, 0.038, 16, 220);

    const group = new THREE.Group();
    // Inner rig holds the modelling scale so the outer group's scale stays
    // free for the scroll waypoints to drive.
    const rig = new THREE.Group();
    // A wide thin circle carries more elegance than a small thick one.
    rig.scale.setScalar(0.85);
    rig.add(new THREE.Mesh(geometry, material));
    group.add(rig);
    return group;
  }, []);

  useEffect(() => {
    const current = object;
    return () => {
      current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
    };
  }, [object]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const progress = scrollYProgress.get();
    const velocity = scrollVelocity.get();

    // ── Idle auto-rotation (always spinning slowly) ──
    const idleSpeed = 0.09;
    idleRotation.current.x += delta * idleSpeed * 0.7;
    idleRotation.current.y += delta * idleSpeed;
    idleRotation.current.z += delta * idleSpeed * 0.3;

    // ── Scroll-linked rotation ──
    // Unhurried and continuous. The drift across the viewport carries the
    // effect; a fast spin would read as busy rather than considered.
    const scrollRotBoost = velocity * 0.0018;
    meshRef.current.rotation.x =
      idleRotation.current.x + progress * Math.PI * 1.1 + scrollRotBoost;
    meshRef.current.rotation.y = idleRotation.current.y + progress * Math.PI * 1.5;
    meshRef.current.rotation.z = idleRotation.current.z + progress * Math.PI * 0.35;

    // ── Position & scale from waypoints ──
    const [wx, wy, ws] = lerpWaypoints(progress);
    // Smooth lerp towards target for fluid feel
    // Softer follow than the waypoints alone, so the object trails the scroll
    // and settles rather than snapping to each target.
    meshRef.current.position.x += (wx - meshRef.current.position.x) * 0.055;
    meshRef.current.position.y += (wy - meshRef.current.position.y) * 0.055;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (ws - currentScale) * 0.055;
    meshRef.current.scale.setScalar(newScale);
  });

  return (
    <>
      {/* Standard material needs light; a cool key plus a warm rim keeps the
          silhouette legible without flattening it. */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} color="#8fa4ff" />
      <pointLight position={[-4, -2, 3]} intensity={10} distance={18} color="#3b5bff" />
      <primitive ref={meshRef} object={object} />
    </>
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
