"use client";

import {
  LOADING_COMPLETE_EVENT,
  MIN_LOADING_DURATION_MS,
  markLoadingComplete,
  markLoaderHidden,
  resetLoadingSession,
} from "@/lib/loading";
import { preloadSiteAssets } from "@/lib/preload-assets";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const BAR_SEGMENTS = 28;
const RING_TICKS = 48;
const STARLIGHT = "#f3e600";
const STARLIGHT_RGB = "rgb(243, 230, 0)";
const STARLIGHT_GLOW = "rgba(243, 230, 0, 0.55)";

const glowText = {
  textShadow: `0 0 8px ${STARLIGHT_RGB}, 0 0 18px ${STARLIGHT_GLOW}`,
};

function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = "11px JetBrains Mono, monospace";
      const cols = Math.ceil(window.innerWidth / 16);
      const rows = Math.ceil(window.innerHeight / 20);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const char = Math.random() > 0.5 ? "1" : "0";
          ctx.fillStyle = `rgba(243, 230, 0, ${0.04 + Math.random() * 0.12})`;
          ctx.fillText(char, col * 16 + 2, row * 20 + 14);
        }
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden
    />
  );
}

function LoadingLabel() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDots((current) => (current % 3) + 1);
    }, 420);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-sm uppercase tracking-[0.4em] sm:text-base" style={glowText}>
      Loading{".".repeat(dots)}
    </span>
  );
}

function CircularHud({ progress }: { progress: number }) {
  const filledTicks = Math.round((progress / 100) * RING_TICKS);
  const arcLength = 2 * Math.PI * 42;
  const arcOffset = arcLength * (1 - progress / 100);

  return (
    <div
      className="relative shrink-0"
      style={{ animation: "loader-pulse-glow 2.4s ease-in-out infinite" }}
    >
      <svg
        viewBox="0 0 140 140"
        className="size-28 sm:size-32"
        aria-hidden
      >
        {/* Dashed outer ring — clockwise */}
        <g
          style={{
            transformOrigin: "70px 70px",
            animation: "loader-spin-cw 18s linear infinite",
          }}
        >
          <circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke={STARLIGHT}
            strokeWidth="0.75"
            strokeDasharray="3 6"
            opacity="0.35"
          />
        </g>

        {/* Segmented tick ring — counter-clockwise */}
        <g
          style={{
            transformOrigin: "70px 70px",
            animation: "loader-spin-ccw 24s linear infinite",
          }}
        >
          {Array.from({ length: RING_TICKS }).map((_, index) => {
            const angle = (index / RING_TICKS) * 360 - 90;
            const active = index < filledTicks;
            return (
              <rect
                key={index}
                x="68.25"
                y="14"
                width="3.5"
                height="10"
                rx="0.5"
                fill={active ? STARLIGHT : "rgba(243,230,0,0.18)"}
                transform={`rotate(${angle} 70 70)`}
                style={
                  active
                    ? {
                        filter: `drop-shadow(0 0 4px ${STARLIGHT})`,
                        transition: "fill 0.15s ease",
                      }
                    : undefined
                }
              />
            );
          })}
        </g>

        {/* Inner progress arc */}
        <circle
          cx="70"
          cy="70"
          r="42"
          fill="none"
          stroke="rgba(243,230,0,0.15)"
          strokeWidth="2"
        />
        <circle
          cx="70"
          cy="70"
          r="42"
          fill="none"
          stroke={STARLIGHT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={arcOffset}
          transform="rotate(-90 70 70)"
          style={{
            filter: `drop-shadow(0 0 6px ${STARLIGHT_GLOW})`,
            transition: "stroke-dashoffset 0.2s ease",
          }}
        />

        {/* Inner decorative arcs */}
        <g opacity="0.5">
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d="M 70 34 A 36 36 0 0 1 88 40"
              fill="none"
              stroke={STARLIGHT}
              strokeWidth="1"
              transform={`rotate(${angle} 70 70)`}
            />
          ))}
        </g>
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold tabular-nums sm:text-2xl"
        style={{
          ...glowText,
          animation: "loader-flicker 4s linear infinite",
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}

function HorizontalHud({ progress }: { progress: number }) {
  const filled = Math.round((progress / 100) * BAR_SEGMENTS);

  return (
    <div className="w-full min-w-0 flex-1 space-y-3">
      <LoadingLabel />

      {/* Top HUD accents */}
      <div className="flex items-center gap-2 opacity-80">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-[#f3e600]"
              style={{
                animation: `loader-pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="h-px flex-1 max-w-16 bg-[#f3e600]/50" />
        <div className="h-px w-8 bg-[#f3e600]/30" />
      </div>

      {/* Main segmented bar */}
      <div
        className="relative overflow-hidden border border-[#f3e600]/80 bg-black/60 px-2 py-2"
        style={{
          boxShadow: `inset 0 0 12px rgba(243,230,0,0.08), 0 0 10px rgba(243,230,0,0.15)`,
          animation: "loader-pulse-glow 2.8s ease-in-out infinite",
        }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#f3e600]/20 to-transparent"
          style={{ animation: "loader-scan 2.2s linear infinite" }}
          aria-hidden
        />

        <div
          className="grid h-7 gap-[2px] sm:h-8 sm:gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${BAR_SEGMENTS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: BAR_SEGMENTS }).map((_, index) => {
            const active = index < filled;
            return (
              <div
                key={index}
                className={cn(
                  "origin-bottom transition-colors duration-150",
                  active ? "bg-[#f3e600]" : "bg-[#f3e600]/10"
                )}
                style={
                  active
                    ? {
                        boxShadow: `0 0 6px ${STARLIGHT_GLOW}`,
                        animation: `loader-segment-pop 0.35s ease-out ${index * 0.02}s both`,
                      }
                    : {
                        boxShadow: "inset 0 0 0 1px rgba(243,230,0,0.12)",
                      }
                }
              />
            );
          })}
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="flex items-end gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="flex gap-[3px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="inline-block h-2 w-[3px] -skew-x-[25deg] bg-[#f3e600]/25"
                style={{
                  opacity: i < filled / 2 ? 0.9 : 0.25,
                  transition: "opacity 0.2s ease",
                }}
              />
            ))}
          </div>

          {/* Slider track */}
          <div className="relative h-px bg-[#f3e600]/30">
            <div
              className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full border border-[#f3e600] bg-black"
              style={{
                left: `${progress}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 8px ${STARLIGHT_GLOW}`,
                transition: "left 0.2s ease",
              }}
            />
          </div>
        </div>

        <div
          className="relative hidden h-8 w-14 skew-x-[-18deg] overflow-hidden border border-[#f3e600]/40 sm:block"
          style={{ animation: "loader-pulse-glow 3s ease-in-out infinite" }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(243,230,0,0.35)_0,rgba(243,230,0,0.35)_2px,transparent_2px,transparent_5px)]" />
          <div
            className="absolute inset-y-0 left-0 bg-[#f3e600]/70 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const targetRef = useRef(0);
  const doneRef = useRef(false);
  const appReadyRef = useRef(false);
  const assetsReadyRef = useRef(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!visible) return;

    const html = document.documentElement;
    const { overflow: htmlOverflow } = html.style;
    const { overflow: bodyOverflow } = document.body.style;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [visible]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDisplayProgress((current) => {
        if (current >= progress) return progress;
        return Math.min(current + 1, progress);
      });
    }, 30);
    return () => clearInterval(id);
  }, [progress]);

  useEffect(() => {
    resetLoadingSession();
    startedAtRef.current = Date.now();

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      targetRef.current = 100;
      setProgress(100);
      window.setTimeout(() => setExiting(true), 250);
      window.setTimeout(() => {
        setVisible(false);
      }, 750);
      window.setTimeout(() => {
        markLoaderHidden();
      }, 900);
    };

    const tryFinish = () => {
      if (doneRef.current || !appReadyRef.current || !assetsReadyRef.current) return;

      const elapsed = Date.now() - startedAtRef.current;
      const remaining = MIN_LOADING_DURATION_MS - elapsed;

      if (remaining > 0) {
        window.setTimeout(tryFinish, remaining);
        return;
      }

      finish();
    };

    const onAppReady = () => {
      appReadyRef.current = true;
      tryFinish();
    };

    preloadSiteAssets((loaded, total) => {
      const assetProgress = 20 + Math.round((loaded / total) * 55);
      targetRef.current = Math.max(targetRef.current, assetProgress);
    }).finally(() => {
      assetsReadyRef.current = true;
      tryFinish();
    });

    targetRef.current = 8;
    setProgress(8);

    const onDomReady = () => {
      targetRef.current = Math.max(targetRef.current, 38);
    };

    const onWindowLoad = () => {
      targetRef.current = Math.max(targetRef.current, 62);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", onDomReady);
    } else {
      onDomReady();
    }

    if (document.readyState === "complete") {
      onWindowLoad();
    } else {
      window.addEventListener("load", onWindowLoad);
    }

    window.addEventListener(LOADING_COMPLETE_EVENT, onAppReady);

    const fallbackMs = Math.max(MIN_LOADING_DURATION_MS, 5000);
    const fallback = window.setTimeout(() => {
      markLoadingComplete();
    }, fallbackMs);

    const creep = window.setInterval(() => {
      setProgress((current) => {
        const elapsed = Date.now() - startedAtRef.current;
        const duration = Math.max(MIN_LOADING_DURATION_MS, 5000);
        const timeCap = Math.min((elapsed / duration) * 96, 96);

        if (MIN_LOADING_DURATION_MS > 0) {
          targetRef.current = Math.max(targetRef.current, timeCap);
        } else if (current >= targetRef.current) {
          if (targetRef.current < 90 && !doneRef.current) {
            targetRef.current = Math.min(targetRef.current + 0.35, 90);
          }
          return current;
        }

        const target = targetRef.current;
        if (current >= target) return current;
        return Math.min(current + 1, target);
      });
    }, 50);

    return () => {
      document.removeEventListener("DOMContentLoaded", onDomReady);
      window.removeEventListener("load", onWindowLoad);
      window.removeEventListener(LOADING_COMPLETE_EVENT, onAppReady);
      clearTimeout(fallback);
      clearInterval(creep);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      data-page-loader
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500",
        exiting && "opacity-0"
      )}
      aria-live="polite"
      aria-busy={!exiting}
      aria-label={`Loading ${Math.round(displayProgress)} percent`}
    >
      <BinaryBackground />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(243,230,0,0.07) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative flex w-[min(94vw,680px)] flex-col items-center gap-10 px-6 sm:flex-row sm:items-center sm:gap-8">
        <CircularHud progress={displayProgress} />
        <HorizontalHud progress={displayProgress} />
      </div>
    </div>
  );
}
