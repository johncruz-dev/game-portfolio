"use client";

import dynamic from "next/dynamic";

const ActivityFallback = () => (
  <div className="hero-activity-terrain hero-activity-terrain--fallback" aria-hidden>
    <span className="hero-activity-terrain__corner hero-activity-terrain__corner--tl" />
    <span className="hero-activity-terrain__corner hero-activity-terrain__corner--tr" />
    <span className="hero-activity-terrain__corner hero-activity-terrain__corner--bl" />
    <span className="hero-activity-terrain__corner hero-activity-terrain__corner--br" />
    <span className="hero-activity-terrain__grid" />
  </div>
);

export const HeroActivityTerrain = dynamic(
  () =>
    import("@/components/hero-activity-terrain").then(
      (mod) => mod.HeroActivityTerrain
    ),
  {
    ssr: false,
    loading: ActivityFallback,
  }
);
