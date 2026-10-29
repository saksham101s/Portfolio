"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Particles start as clusters in a 3D "embedding space", then converge
// into the name. Scrolling disperses them back into clusters and the
// cursor pushes them away.

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform vec2 uTextScale;
  uniform float uTextY;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  attribute vec3 aStart;
  attribute vec2 aTarget;
  attribute float aRandom;
  varying float vRandom;
  varying float vFormed;

  void main() {
    // Each particle arrives at a slightly different time
    float t = clamp((uProgress - aRandom * 0.35) / 0.65, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vFormed = t;
    vRandom = aRandom;

    vec3 target = vec3(aTarget * uTextScale, 0.0);
    target.y += uTextY;

    // Drift while in cluster form, subtle shimmer once formed
    vec3 drift = vec3(
      sin(uTime * 0.4 + aRandom * 40.0),
      cos(uTime * 0.3 + aRandom * 25.0),
      sin(uTime * 0.5 + aRandom * 10.0)
    );
    vec3 start = aStart + drift * 0.35;
    vec3 pos = mix(start, target + drift * 0.015, t);

    // Cursor repulsion
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float force = smoothstep(1.4, 0.0, dist) * 0.7;
    pos.xy += normalize(d + 0.0001) * force;
    pos.z += force * 1.5;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(2.2 + aRandom * 3.5, 1.6 + aRandom * 1.4, t);
    gl_PointSize = size * uSizeScale * uPixelRatio * (10.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  varying float vRandom;
  varying float vFormed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 signal = vec3(0.776, 1.0, 0.239);
    vec3 ice = vec3(0.431, 0.906, 1.0);
    vec3 ember = vec3(1.0, 0.478, 0.271);
    vec3 cloud = mix(ice, ember, step(0.92, vRandom));
    vec3 color = mix(cloud, mix(signal, ice, step(0.8, vRandom)), vFormed);
    gl_FragColor = vec4(color, alpha * mix(0.55, 0.95, vFormed));
  }
`;

// Rasterise the name onto an offscreen canvas and sample filled pixels.
function sampleText(lines: string[], fontFamily: string, count: number) {
  const W = 1400;
  const H = 520;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Shrink the font until the widest line fits with a margin
  let fontSize = 210;
  ctx.font = `800 ${fontSize}px ${fontFamily}`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  if (widest > W * 0.94) {
    fontSize = Math.floor((fontSize * W * 0.94) / widest);
    ctx.font = `800 ${fontSize}px ${fontFamily}`;
  }
  const lineHeight = fontSize * 1.05;
  lines.forEach((line, i) => ctx.fillText(line, W / 2, H / 2 + (i - (lines.length - 1) / 2) * lineHeight));

  const data = ctx.getImageData(0, 0, W, H).data;
  const filled: number[] = [];
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (data[(y * W + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }

  const out = new Float32Array(count * 2);
  const pixels = filled.length / 2;
  for (let i = 0; i < count; i++) {
    const p = Math.floor(Math.random() * pixels) * 2;
    // Normalise to width 1, centred
    out[i * 2] = (filled[p] + Math.random() * 3 - W / 2) / W;
    out[i * 2 + 1] = -(filled[p + 1] + Math.random() * 3 - H / 2) / W;
  }
  return out;
}

function gaussian() {
  return Math.sqrt(-2 * Math.log(Math.random() || 1e-6)) * Math.cos(2 * Math.PI * Math.random());
}

function Particles({ lines, count, reducedMotion }: { lines: string[]; count: number; reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { viewport, gl } = useThree();
  const [targets, setTargets] = useState<Float32Array | null>(null);
  const intro = useRef(reducedMotion ? 1 : 0);
  const mouse = useRef(new THREE.Vector2(99, 99));
  const pointerActive = useRef(false);

  // Only repel once the user actually moves the mouse (pointer defaults to the centre)
  useEffect(() => {
    const on = (e: PointerEvent) => (pointerActive.current = e.pointerType === "mouse");
    const off = () => (pointerActive.current = false);
    window.addEventListener("pointermove", on);
    document.documentElement.addEventListener("pointerleave", off);
    return () => {
      window.removeEventListener("pointermove", on);
      document.documentElement.removeEventListener("pointerleave", off);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-syne").trim() || "sans-serif";
    document.fonts.load(`800 210px ${family}`).finally(() => {
      if (!cancelled) setTargets(sampleText(lines, family, count));
    });
    return () => {
      cancelled = true;
    };
  }, [lines, count]);

  const { starts, randoms } = useMemo(() => {
    const starts = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const centers = Array.from({ length: 7 }, () => [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 6 - 1,
    ]);
    for (let i = 0; i < count; i++) {
      const c = centers[i % centers.length];
      const spread = 0.6 + (i % 3) * 0.35;
      starts[i * 3] = c[0] + gaussian() * spread;
      starts[i * 3 + 1] = c[1] + gaussian() * spread;
      starts[i * 3 + 2] = c[2] + gaussian() * spread;
      randoms[i] = Math.random();
    }
    return { starts, randoms };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uTextScale: { value: new THREE.Vector2(1, 1) },
      uTextY: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSizeScale: { value: 1 },
    }),
    [gl],
  );

  useFrame((state, delta) => {
    if (!material.current || !targets) return;
    const u = material.current.uniforms;
    if (!reducedMotion) u.uTime.value += delta;

    intro.current = Math.min(1, intro.current + delta / 2.6);
    const scroll = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
    u.uProgress.value = intro.current * (1 - scroll);

    // Text fills ~88% of the viewport width, capped so it stays readable on wide screens
    const width = Math.min(viewport.width * (viewport.aspect < 1 ? 0.94 : 0.88), 13);
    u.uTextScale.value.set(width, width);
    u.uTextY.value = viewport.height * (viewport.aspect < 1 ? 0.25 : 0.14);

    u.uSizeScale.value = THREE.MathUtils.clamp(state.size.width / 1440, 0.62, 1);

    if (pointerActive.current) {
      mouse.current.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2);
    } else {
      mouse.current.set(99, 99);
    }
    u.uMouse.value.lerp(mouse.current, 0.12);

    if (!reducedMotion && pointerActive.current) {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.6, 0.03);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.4, 0.03);
      state.camera.lookAt(0, 0, 0);
    }
  });

  if (!targets) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[starts, 3]} />
        <bufferAttribute attach="attributes-aStart" args={[starts, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targets, 2]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function EmbeddingField({ lines }: { lines: string[] }) {
  const [config, setConfig] = useState<{ count: number; reducedMotion: boolean } | null>(null);

  useEffect(() => {
    const small = window.innerWidth < 768;
    setConfig({
      count: small ? 9000 : 14000,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  if (!config) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      // Keep pointer tracking alive even though the overlay sits above the canvas
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Particles lines={lines} count={config.count} reducedMotion={config.reducedMotion} />
    </Canvas>
  );
}
