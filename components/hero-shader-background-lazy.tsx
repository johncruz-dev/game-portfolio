"use client";

import dynamic from "next/dynamic";

const HeroShaderFallback = () => (
  <div className="absolute inset-0 bg-black" aria-hidden />
);

export const HeroShaderBackground = dynamic(
  () =>
    import("@/components/hero-shader-background").then(
      (mod) => mod.HeroShaderBackground
    ),
  {
    ssr: false,
    loading: HeroShaderFallback,
  }
);
