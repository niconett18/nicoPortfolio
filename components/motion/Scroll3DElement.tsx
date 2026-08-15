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

  /* An original low-poly hand built from primitives — palm, four curled
     fingers, an angled thumb and a forearm — rather than a downloaded model.
     Each phalanx hangs off the previous one so the curl accumulates down the
     finger the way a real joint chain does. */
  const hand = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      color: "#3b5bff",
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });

    const root = new THREE.Group();
    // Inner rig carries the modelling scale and centring, leaving the outer
    // group's scale free for the scroll waypoints to drive.
    const rig = new THREE.Group();
    rig.scale.setScalar(0.62);
    rig.position.y = 0.3;
    root.add(rig);

    const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

    // Palm, slightly tapered towards the wrist.
    const palm = new THREE.Mesh(box(1.02, 1.15, 0.3), material);
    rig.add(palm);

    // Short forearm stub — enough to read as an arm without dominating.
    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.23, 0.95, 8, 1), material);
    forearm.position.y = -1.02;
    rig.add(forearm);

    // One finger as a chain of shrinking phalanges, each curling a little more.
    const finger = (lengths: number[], width: number) => {
      const base = new THREE.Group();
      let parent: THREE.Group = base;
      lengths.forEach((len, i) => {
        const joint = new THREE.Group();
        joint.rotation.x = -(0.26 + i * 0.2);
        parent.add(joint);

        const bone = new THREE.Mesh(box(width, len, width), material);
        bone.position.y = len / 2;
        joint.add(bone);

        const next = new THREE.Group();
        next.position.y = len;
        joint.add(next);
        parent = next;
      });
      return base;
    };

    // Index → little finger, splayed across the knuckle line.
    const fingers: [number, number, number[], number][] = [
      [-0.34, 0.02, [0.4, 0.28, 0.2], 0.19],
      [-0.11, 0.06, [0.45, 0.32, 0.22], 0.2],
      [0.12, 0.04, [0.42, 0.3, 0.21], 0.19],
      [0.34, -0.02, [0.33, 0.24, 0.17], 0.17],
    ];
    fingers.forEach(([x, lift, lengths, width], i) => {
      const f = finger(lengths, width);
      f.position.set(x, 0.575 + lift, 0);
      f.rotation.z = (i - 1.5) * 0.05;
      rig.add(f);
    });

    // Thumb, swung out and forward from the side of the palm.
    const thumb = finger([0.36, 0.28], 0.2);
    thumb.position.set(-0.5, 0.1, 0.06);
    thumb.rotation.set(0.35, 0, 1.0);
    rig.add(thumb);

    return root;
  }, []);

  useEffect(() => {
    const current = hand;
    return () => {
      current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
    };
  }, [hand]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const progress = scrollYProgress.get();
    const velocity = scrollVelocity.get();

    // ── Idle auto-rotation (always spinning slowly) ──
    const idleSpeed = 0.15;
    idleRotation.current.x += delta * idleSpeed * 0.7;
    idleRotation.current.y += delta * idleSpeed;
    idleRotation.current.z += delta * idleSpeed * 0.3;

    // ── Scroll-linked rotation ──
    // Mostly a turn about Y so the hand reads as a hand; X and Z only sway,
    // which a tumbling knot could get away with but a limb cannot.
    const scrollRotBoost = velocity * 0.002;
    meshRef.current.rotation.x =
      Math.sin(idleRotation.current.x) * 0.2 + progress * Math.PI * 0.4;
    meshRef.current.rotation.y =
      idleRotation.current.y + progress * Math.PI * 2 + scrollRotBoost;
    meshRef.current.rotation.z =
      Math.sin(idleRotation.current.z) * 0.16 + progress * Math.PI * 0.3;

    // ── Position & scale from waypoints ──
    const [wx, wy, ws] = lerpWaypoints(progress);
    // Smooth lerp towards target for fluid feel
    meshRef.current.position.x += (wx - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (wy - meshRef.current.position.y) * 0.08;
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (ws - currentScale) * 0.08;
    meshRef.current.scale.setScalar(newScale);
  });

  return <primitive ref={meshRef} object={hand} />;
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
