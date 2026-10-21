import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconClass = "skills-expertise-svg";

export function CybersecurityIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path
        d="M24 4L8 12v12c0 9.5 6.5 18.2 16 20 9.5-1.8 16-10.5 16-20V12L24 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="20"
        width="12"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 20v-2a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AiMlIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path
        d="M24 8c-6 0-10 4.5-10 10 0 4 2 7.5 5 9.5V38h10V27.5c3-2 5-5.5 5-9.5 0-5.5-4-10-10-10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18 18c1.5-2 4-3 6-3s4.5 1 6 3M15 24h3M30 24h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="22" r="1.5" fill="currentColor" />
      <circle cx="28" cy="22" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function DevOpsIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path
        d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 24c0-5.5 4.5-10 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 24c0-5.5 4.5-10 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WebGlIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path
        d="M24 8 38 16v16L24 40 10 32V16L24 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M24 8v32M10 16l28 16M38 16 10 32" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 8 10 16M24 8l14 8M24 40 10 32M24 40l14-8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function WebDevIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <path
        d="M14 12 8 24l6 12M34 12l6 12-6 12M28 10l-8 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileDevIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      <rect
        x="14"
        y="6"
        width="20"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
      <path d="M20 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
