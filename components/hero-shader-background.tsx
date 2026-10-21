"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { markLoadingComplete } from "@/lib/loading";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type QualityTier = "medium" | "low";

const TIER_CONFIG = {
  medium: { fps: 24, dpr: 0.5, loops: 30, octaves: 3 },
  low: { fps: 20, dpr: 0.35, loops: 22, octaves: 2 },
} as const;

function buildFragmentShader(loops: number, octaves: number) {
  return `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float iTime;
uniform vec2 iResolution;

const vec3 STARLIGHT = vec3(0.952941, 0.901961, 0.0);

#define NUM_OCTAVES ${octaves}
#define LOOP_COUNT ${loops}.0

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  return mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 shake = vec2(sin(iTime * 1.5) * 0.01, cos(iTime * 2.7) * 0.01);
  vec2 p =
    ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) /
    iResolution.y *
    mat2(8.0, -6.0, 6.0, 8.0);

  float o = 0.0;
  float f = 3.0 + fbm(p + vec2(iTime * 7.0, 0.0));

  for (float i = 0.0; i < LOOP_COUNT; i += 1.0) {
    vec2 v =
      p +
      cos(i * i + (iTime + p.x * 0.1) * 0.03 + i * vec2(11.0, 9.0)) * 5.0 +
      vec2(sin(iTime * 4.0 + i) * 0.005, cos(iTime * 4.5 - i) * 0.005);

    float tailNoise = noise(v * 0.4 + vec2(iTime, i)) * (1.0 - (i / LOOP_COUNT));
    float brightness =
      (cos(sin(i)) + 1.0) *
      exp(sin(i * i + iTime)) /
      length(max(v, vec2(v.x * f * 0.02, v.y)));
    float thinnessFactor = smoothstep(0.0, 1.0, i / LOOP_COUNT);
    o += brightness * (1.0 + tailNoise * 2.0) * thinnessFactor;
  }

  o = tanh(pow(o / 1e2, 1.5));
  gl_FragColor = vec4(STARLIGHT * o, 1.0);
}
`;
}

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const bufferSize = new THREE.Vector2();
const startTime = typeof performance !== "undefined" ? performance.now() : 0;

function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "medium";

  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const lowCpu =
    navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const lowMemory =
    "deviceMemory" in navigator &&
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;

  if (mobile || lowCpu || lowMemory || saveData) return "low";
  return "medium";
}

function ShaderPlane({
  active,
  tier,
}: {
  active: boolean;
  tier: QualityTier;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const readySentRef = useRef(false);
  const { invalidate, gl } = useThree();
  const config = TIER_CONFIG[tier];
  const frameInterval = 1000 / config.fps;

  const fragmentShader = useMemo(
    () => buildFragmentShader(config.loops, config.octaves),
    [config.loops, config.octaves]
  );

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < frameInterval) return;
      last = now;

      if (materialRef.current) {
        gl.getDrawingBufferSize(bufferSize);
        materialRef.current.uniforms.iTime.value = (now - startTime) / 1000;
        materialRef.current.uniforms.iResolution.value.copy(bufferSize);
      }

      if (!readySentRef.current) {
        readySentRef.current = true;
        markLoadingComplete();
      }

      invalidate();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, frameInterval, gl, invalidate]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}

function StaticFallback() {
  return <div className="absolute inset-0 bg-black" aria-hidden />;
}

export function HeroShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tier, setTier] = useState<QualityTier>("medium");

  const shouldRender =
    mounted && ready && visible && tabVisible && !reducedMotion;

  useEffect(() => {
    setTier(getQualityTier());

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    motionQuery.addEventListener("change", onMotionChange);

    let cancelled = false;
    const startShader = () => {
      if (!cancelled) setReady(true);
    };

    const idleId =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(startShader, { timeout: 1500 })
        : setTimeout(startShader, 300);

    setMounted(true);

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", onMotionChange);
      if (typeof requestIdleCallback !== "undefined") {
        cancelIdleCallback(idleId as number);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      markLoadingComplete();
    }
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibility = () => {
      setTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {shouldRender ? (
        <Canvas
          orthographic
          frameloop="demand"
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={TIER_CONFIG[tier].dpr}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000);
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.NoToneMapping;
          }}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            preserveDrawingBuffer: false,
          }}
          className="!absolute inset-0 !h-full !w-full"
          style={{ touchAction: "none" }}
        >
          <ShaderPlane active={shouldRender} tier={tier} />
        </Canvas>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
