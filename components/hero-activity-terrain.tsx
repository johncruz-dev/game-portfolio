"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PRIMARY = 0xf3e600;
const SEGMENTS = 20;

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 252, 180, 1)");
  gradient.addColorStop(0.22, "rgba(243, 230, 0, 0.95)");
  gradient.addColorStop(0.5, "rgba(243, 230, 0, 0.35)");
  gradient.addColorStop(0.75, "rgba(243, 230, 0, 0.08)");
  gradient.addColorStop(1, "rgba(243, 230, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function ridge(value: number) {
  return 1 - Math.abs(Math.sin(value));
}

function triangleWave(value: number) {
  return Math.abs((value % 1) * 2 - 1);
}

/** Sharper, more angular height field — ridged folds instead of smooth waves */
function sampleHeight(x: number, z: number, time: number) {
  const t = time * 0.22;

  const height =
    ridge(x * 2.35 + t) * 0.28 +
    ridge(z * 2.05 - t * 0.75) * 0.24 +
    ridge((x + z) * 1.85 + t * 0.45) * 0.16 +
    ridge(x * 3.6 - z * 3.1 + t * 0.6) * 0.12 +
    triangleWave(x * 4.8 - z * 3.9 + t * 0.35) * 0.1 +
    Math.pow(Math.max(0, Math.sin(x * 5.4 - z * 4.6 + t)), 2.2) * 0.14;

  return height - 0.14;
}

function buildTerrainGeometry() {
  const size = 3.6;
  const geometry = new THREE.PlaneGeometry(size, size, SEGMENTS, SEGMENTS);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function pickHotspotIndices(geometry: THREE.PlaneGeometry, count = 7) {
  const positions = geometry.attributes.position;
  const candidates: { index: number; y: number }[] = [];

  for (let i = 0; i < positions.count; i++) {
    candidates.push({ index: i, y: positions.getY(i) });
  }

  candidates.sort((a, b) => b.y - a.y);

  const chosen: number[] = [];
  for (const { index } of candidates) {
    if (chosen.length >= count) break;
    const x = positions.getX(index);
    const z = positions.getZ(index);
    const tooClose = chosen.some((other) => {
      const ox = positions.getX(other);
      const oz = positions.getZ(other);
      return Math.hypot(x - ox, z - oz) < 0.38;
    });
    if (!tooClose) chosen.push(index);
  }

  return chosen;
}

function pickSparkleIndices(geometry: THREE.PlaneGeometry, count = 64) {
  const positions = geometry.attributes.position;
  const width = SEGMENTS + 1;
  const scores: { index: number; score: number }[] = [];

  for (let i = 0; i < positions.count; i++) {
    const row = Math.floor(i / width);
    const col = i % width;
    if (row === 0 || col === 0 || row === SEGMENTS || col === SEGMENTS) continue;

    const y = positions.getY(i);
    const neighbors = [i - 1, i + 1, i - width, i + width];
    let gradient = 0;
    for (const neighbor of neighbors) {
      gradient += Math.abs(y - positions.getY(neighbor));
    }

    const hash = Math.sin(i * 12.9898) * 43758.5453;
    const jitter = hash - Math.floor(hash);
    scores.push({ index: i, score: gradient * 1.6 + y * 0.35 + jitter * 0.08 });
  }

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, count).map((entry) => entry.index);
}

const sparkleVertexShader = /* glsl */ `
  attribute float aPhase;
  attribute float aScale;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    float twinkle = 0.25 + 0.75 * pow(abs(sin(uTime * 3.6 + aPhase)), 2.4);
    vAlpha = twinkle;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * twinkle * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sparkleFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    float core = smoothstep(0.5, 0.0, dist);
    float glow = smoothstep(0.5, 0.08, dist);
    float alpha = (core * 0.95 + glow * 0.45) * vAlpha;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(uColor + vec3(0.12), alpha);
  }
`;

function ActivityScene() {
  const groupRef = useRef<THREE.Group>(null);
  const hotspotRef = useRef<THREE.Points>(null);
  const sparkleRef = useRef<THREE.Points>(null);
  const sparkleMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const { terrainGeometry, hotspotIndices, sparkleIndices, glowTexture } =
    useMemo(() => {
      const terrain = buildTerrainGeometry();
      const positions = terrain.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        positions.setY(i, sampleHeight(x, z, 0));
      }
      positions.needsUpdate = true;

      return {
        terrainGeometry: terrain,
        hotspotIndices: pickHotspotIndices(terrain),
        sparkleIndices: pickSparkleIndices(terrain),
        glowTexture: makeGlowTexture(),
      };
    }, []);

  const hotspotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(hotspotIndices.length * 3), 3)
    );
    return geo;
  }, [hotspotIndices]);

  const { sparkleGeometry, sparkleMaterial } = useMemo(() => {
    const phases = new Float32Array(sparkleIndices.length);
    const scales = new Float32Array(sparkleIndices.length);

    sparkleIndices.forEach((_, i) => {
      const hash = Math.sin((i + 1) * 78.233) * 43758.5453;
      phases[i] = (hash - Math.floor(hash)) * Math.PI * 2;
      scales[i] = 0.045 + (i % 5) * 0.012;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(sparkleIndices.length * 3), 3)
    );
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(PRIMARY) },
      },
      vertexShader: sparkleVertexShader,
      fragmentShader: sparkleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { sparkleGeometry: geo, sparkleMaterial: material };
  }, [sparkleIndices]);

  sparkleMaterialRef.current = sparkleMaterial;

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const group = groupRef.current;
    const positions = terrainGeometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      positions.setY(i, sampleHeight(x, z, time));
    }
    positions.needsUpdate = true;

    if (group) {
      group.rotation.y = -0.42 + Math.sin(time * 0.18) * 0.04;
    }

    if (hotspotRef.current) {
      const pointPositions = hotspotRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      hotspotIndices.forEach((vertexIndex, i) => {
        pointPositions.setXYZ(
          i,
          positions.getX(vertexIndex),
          positions.getY(vertexIndex) + 0.035,
          positions.getZ(vertexIndex)
        );
      });
      pointPositions.needsUpdate = true;

      const material = hotspotRef.current.material as THREE.PointsMaterial;
      material.size = 0.32 + Math.sin(time * 2.2) * 0.04;
    }

    if (sparkleRef.current) {
      const pointPositions = sparkleRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      sparkleIndices.forEach((vertexIndex, i) => {
        pointPositions.setXYZ(
          i,
          positions.getX(vertexIndex),
          positions.getY(vertexIndex) + 0.015,
          positions.getZ(vertexIndex)
        );
      });
      pointPositions.needsUpdate = true;
    }

    if (sparkleMaterialRef.current) {
      sparkleMaterialRef.current.uniforms.uTime.value = time;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={terrainGeometry}>
        <meshBasicMaterial
          color={PRIMARY}
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>
      <mesh geometry={terrainGeometry}>
        <meshBasicMaterial
          color={PRIMARY}
          wireframe
          transparent
          opacity={0.92}
        />
      </mesh>
      <points ref={hotspotRef} geometry={hotspotGeometry}>
        <pointsMaterial
          map={glowTexture ?? undefined}
          color={PRIMARY}
          size={0.32}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <points
        ref={sparkleRef}
        geometry={sparkleGeometry}
        material={sparkleMaterial}
      />
    </group>
  );
}

export function HeroActivityTerrain() {
  return (
    <div className="hero-activity-terrain" aria-hidden>
      <span className="hero-activity-terrain__corner hero-activity-terrain__corner--tl" />
      <span className="hero-activity-terrain__corner hero-activity-terrain__corner--tr" />
      <span className="hero-activity-terrain__corner hero-activity-terrain__corner--bl" />
      <span className="hero-activity-terrain__corner hero-activity-terrain__corner--br" />
      <span className="hero-activity-terrain__grid" />
      <Canvas
        className="hero-activity-terrain__canvas"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [2.9, 2.15, 2.9], fov: 36, near: 0.1, far: 20 }}
        onCreated={({ camera }) => camera.lookAt(0, -0.05, 0)}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 4, 9]} />
        <ActivityScene />
      </Canvas>
    </div>
  );
}
