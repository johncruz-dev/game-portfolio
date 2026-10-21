"use client";

import { useEffect, useId, useRef } from "react";

const STROKE = "#f3e600";
const STROKE_DIM = "rgba(243, 230, 0, 0.45)";
const FILL_DIM = "rgba(243, 230, 0, 0.12)";

function getStrokeLength(el: SVGGeometryElement): number {
  if (typeof el.getTotalLength === "function") {
    const length = el.getTotalLength();
    if (length > 0) return length;
  }

  if (el instanceof SVGLineElement) {
    const x1 = el.x1.baseVal.value;
    const y1 = el.y1.baseVal.value;
    const x2 = el.x2.baseVal.value;
    const y2 = el.y2.baseVal.value;
    return Math.hypot(x2 - x1, y2 - y1);
  }

  return 100;
}

function prepareStroke(el: SVGGeometryElement) {
  const length = getStrokeLength(el);
  el.style.strokeDasharray = String(length);
  el.style.strokeDashoffset = String(length);
  return length;
}

/** Asymmetric cyberpunk HUD frame — matches reference silhouette */
export function ProjectCardFrame({
  index = 0,
  animate = false,
}: {
  index?: number;
  animate?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const hazardId = `hazard-${uid}`;
  const pixelId = `pixel-${uid}`;
  const scanId = `scan-${uid}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const hasDrawnRef = useRef(false);

  useEffect(() => {
    if (!animate || hasDrawnRef.current || !svgRef.current) return;
    hasDrawnRef.current = true;

    const svg = svgRef.current;
    const stagger = index * 120;
    const outline = svg.querySelector<SVGPathElement>(
      ".project-card-frame-outline"
    );

    if (outline) {
      prepareStroke(outline);
      requestAnimationFrame(() => {
        outline.style.transition = `stroke-dashoffset 1.8s ease-out ${stagger}ms`;
        outline.style.strokeDashoffset = "0";
      });

      const onOutlineDone = () => {
        outline.classList.add("project-card-frame-outline--drawn");
        outline.removeEventListener("transitionend", onOutlineDone);
      };
      outline.addEventListener("transitionend", onOutlineDone);
    }

    const detailStrokes = svg.querySelectorAll<SVGGeometryElement>(
      ".project-card-frame-stroke"
    );
    detailStrokes.forEach((el, i) => {
      prepareStroke(el);
      const delay = stagger + 900 + i * 100;
      requestAnimationFrame(() => {
        el.style.transition = `stroke-dashoffset 0.55s ease-out ${delay}ms`;
        el.style.strokeDashoffset = "0";
      });
    });

    svg.classList.add("project-card-frame--drawn");
  }, [animate, index]);

  return (
    <svg
      ref={svgRef}
      className="project-card-frame-svg"
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <pattern
          id={hazardId}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="5" height="10" fill={STROKE} />
          <rect x="5" width="5" height="10" fill="transparent" />
        </pattern>
        <pattern
          id={pixelId}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="3" height="3" fill={STROKE} />
          <rect x="3" y="3" width="3" height="3" fill={STROKE} />
        </pattern>
        <linearGradient id={scanId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={FILL_DIM} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Main outer contour */}
      <path
        className="project-card-frame-outline"
        d="
          M 26 4
          L 318 4
          L 346 4
          L 358 16
          L 358 52
          L 358 188
          L 308 188
          L 308 232
          L 358 232
          L 358 518
          L 382 542
          L 382 552
          L 248 552
          L 228 532
          L 172 532
          L 152 552
          L 26 552
          L 4 530
          L 4 28
          L 26 4
          Z
        "
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {/* Inner parallel border (top-left segment) */}
      <path
        className="project-card-frame-stroke"
        d="M 14 18 L 14 120"
        fill="none"
        stroke={STROKE_DIM}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top inner border line */}
      <path
        className="project-card-frame-stroke"
        d="M 26 24 L 340 24"
        fill="none"
        stroke={STROKE_DIM}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top hazard stripes */}
      <rect
        className="project-card-hazard-top project-card-frame-decor"
        x="30"
        y="6"
        width="300"
        height="16"
        fill={`url(#${hazardId})`}
        opacity="0.9"
      />

      {/* Top-right pixel column */}
      <rect
        className="project-card-pixels-tr project-card-frame-decor"
        x="346"
        y="16"
        width="10"
        height="38"
        fill={`url(#${pixelId})`}
      />

      {/* Left bar graph */}
      <g className="project-card-bars-left project-card-frame-decor">
        <line className="project-card-frame-stroke" x1="8" y1="36" x2="22" y2="36" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="46" x2="30" y2="46" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="56" x2="18" y2="56" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="66" x2="26" y2="66" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="76" x2="20" y2="76" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="86" x2="28" y2="86" stroke={STROKE} strokeWidth="2" />
        <line className="project-card-frame-stroke" x1="8" y1="96" x2="16" y2="96" stroke={STROKE} strokeWidth="2" />
      </g>

      {/* Bottom-left hazard corner — thick diagonal bands */}
      <path
        className="project-card-hazard-bl project-card-frame-decor"
        d="M 4 530 L 4 468 L 66 530 Z"
        fill={`url(#${hazardId})`}
        opacity="0.9"
      />
      <path
        className="project-card-hazard-bl project-card-frame-decor"
        d="M 4 530 L 36 552 L 4 552 Z"
        fill={`url(#${hazardId})`}
        opacity="0.9"
      />
      <path
        className="project-card-hazard-bl project-card-frame-decor"
        d="M 4 552 L 48 552 L 4 508 Z"
        fill={`url(#${hazardId})`}
        opacity="0.75"
      />

      {/* Bottom-left pixel scatter */}
      <g className="project-card-pixels-bl project-card-frame-decor">
        <rect x="18" y="500" width="4" height="4" fill={STROKE} />
        <rect x="26" y="508" width="4" height="4" fill={STROKE} />
        <rect x="34" y="496" width="4" height="4" fill={STROKE} />
        <rect x="42" y="504" width="4" height="4" fill={STROKE} />
        <rect x="22" y="518" width="4" height="4" fill={STROKE} />
        <rect x="38" y="514" width="4" height="4" fill={STROKE} />
        <rect x="50" y="508" width="4" height="4" fill={STROKE} />
      </g>

      {/* Plus symbol bottom-left */}
      <g className="project-card-frame-decor" stroke={STROKE} strokeWidth="2" vectorEffect="non-scaling-stroke">
        <line className="project-card-frame-stroke" x1="58" y1="524" x2="58" y2="536" />
        <line className="project-card-frame-stroke" x1="52" y1="530" x2="64" y2="530" />
      </g>

      {/* Right notch circuit lines */}
      <g className="project-card-circuit">
        <line className="project-card-frame-stroke" x1="308" y1="196" x2="270" y2="196" stroke={STROKE} strokeWidth="1.5" />
        <circle className="project-card-frame-decor" cx="270" cy="196" r="3.5" fill="none" stroke={STROKE} strokeWidth="1.5" />
        <line className="project-card-frame-stroke" x1="308" y1="212" x2="286" y2="212" stroke={STROKE_DIM} strokeWidth="1" />
        <circle className="project-card-frame-decor" cx="286" cy="212" r="2.5" fill="none" stroke={STROKE_DIM} strokeWidth="1" />
        <line className="project-card-frame-stroke" x1="358" y1="420" x2="328" y2="420" stroke={STROKE_DIM} strokeWidth="1" />
        <circle className="project-card-frame-decor" cx="328" cy="420" r="2" fill="none" stroke={STROKE_DIM} strokeWidth="1" />
      </g>

      {/* Bottom-right signal bars */}
      <g className="project-card-bars-br project-card-frame-decor">
        <rect x="318" y="480" width="28" height="3" fill={STROKE} />
        <rect x="318" y="488" width="20" height="3" fill={STROKE_DIM} />
        <rect x="318" y="496" width="24" height="3" fill={STROKE} />
        <rect x="318" y="504" width="14" height="3" fill={STROKE_DIM} />
        <rect x="318" y="512" width="22" height="3" fill={STROKE} />
      </g>

      {/* Bottom center recess outline */}
      <path
        className="project-card-frame-stroke"
        d="M 152 552 L 172 532 L 228 532 L 248 552"
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {/* Three hollow circles above recess */}
      <g className="project-card-circles project-card-frame-decor" fill="none" stroke={STROKE} strokeWidth="1.5">
        <circle cx="178" cy="524" r="4" />
        <circle cx="200" cy="524" r="4" />
        <circle cx="222" cy="524" r="4" />
      </g>

      {/* Scanline overlay inside frame */}
      <rect
        className="project-card-frame-scanline"
        x="20"
        y="0"
        width="360"
        height="24"
        fill={`url(#${scanId})`}
      />
    </svg>
  );
}
