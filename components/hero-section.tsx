"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Box,
  Cloud,
  Code2,
  Container as ContainerIcon,
  Cpu,
  Database,
  Download,
  Gamepad2,
  Github,
  Globe,
  Linkedin,
  Mail,
  Network,
  Send,
  Server,
  Shield,
  Twitter,
  Workflow,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import { HeroShaderBackground } from "@/components/hero-shader-background-lazy";
import { CyberpunkHeroTitle } from "@/components/cyberpunk-hero-title";
import { CyberpunkNameLogo } from "@/components/cyberpunk-name-logo";
import { CyberSocialLink } from "@/components/cyber-social-link";
import { HeroActivityTerrain } from "@/components/hero-activity-terrain-lazy";

const STATS = [
  { value: "50+", label: "Projects", icon: Code2 },
  { value: "5+", label: "Years Exp.", icon: Workflow },
  { value: "30+", label: "Clients", icon: Network },
  { value: "∞", label: "Game Dev Passionate", icon: Gamepad2 },
] as const;

const EXPERTISE = [
  { label: "AI / Machine Learning", icon: Brain },
  { label: "Cybersecurity", icon: Shield },
  { label: "Three.js / WebGL", icon: Box },
  { label: "Python / Data", icon: Database },
  { label: "Docker / K8s", icon: ContainerIcon },
  { label: "Kubernetes", icon: Server },
  { label: "React / Next.js", icon: Code2 },
  { label: "Cloud / Azure", icon: Cloud },
  { label: "Node.js", icon: Cpu },
  { label: "PostgreSQL", icon: Database },
  { label: "Git / GitHub Actions", icon: Workflow },
  { label: "Game Dev / Unity", icon: Gamepad2 },
] as const;

const TECH_TAGS = [
  "JavaScript",
  "TypeScript",
  "Solidity",
  "Ansible",
  "Jenkins",
  "Linux / Bash",
  "Rust",
  "Go",
  "C / C++",
] as const;

const CURRENT_FOCUS = [
  "Building AI-powered applications",
  "Enhancing cybersecurity skills",
  "Optimizing K8s deployments",
  "Exploring Three.js for 3D web",
] as const;

function HeroSystemStatusMonitor() {
  const tracePath =
    "M0 28 L12 28 L16 27 L20 28 L28 28 L36 28 L44 28 L52 28 L60 28 L68 28 L76 28 L84 28 L92 28 L100 28 L108 28 L116 28 L124 28 L132 28 L140 28 L148 27 L152 29 L156 28 L164 28 L168 26 L172 28 L180 28 L184 25 L188 29 L192 28 L200 27 L204 23 L208 31 L212 26 L216 28 L224 27 L228 22 L232 32 L236 25 L240 28 L248 26 L252 30 L256 19 L260 35 L264 17 L268 33 L272 21 L276 29 L280 24 L284 28 L292 25 L296 31 L300 18 L304 34 L308 20 L312 30 L316 23 L320 28 L328 24 L332 32 L336 16 L340 36 L344 15 L348 35 L352 19 L356 31 L360 22 L364 28 L372 26 L376 32 L380 18 L384 30 L388 22 L392 28 L396 25 L400 28";

  return (
    <div className="hero-system-status" aria-hidden>
      <div className="hero-system-status__monitor">
        <span className="hero-system-status__scanlines" />
        <svg
          className="hero-system-status__svg"
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="heroOscGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="0.5"
              />
            </pattern>
            <filter
              id="heroOscGlow"
              x="-10%"
              y="-50%"
              width="120%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="heroPulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect
            className="hero-system-status__grid"
            width="400"
            height="56"
            fill="url(#heroOscGrid)"
          />

          <path
            className="hero-system-status__trace-bg"
            d={tracePath}
            filter="url(#heroOscGlow)"
          />
          <path className="hero-system-status__trace" d={tracePath} />
          <circle className="hero-system-status__pulse-ring" cx="400" cy="28" r="7" />
          <circle className="hero-system-status__pulse" cx="400" cy="28" r="3.5" />
        </svg>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <Container
      id="hero"
      wrapperClassName="hero-section relative min-h-screen overflow-hidden pt-16"
      className="mx-auto max-w-7xl flex flex-col gap-8 pb-10"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
        <HeroShaderBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
      </div>

      <div className="hero-section__topbar relative z-10">
        <div className="hero-section__status">
          <span className="hero-section__status-dot" aria-hidden />
          SYSTEM ONLINE // AVAILABLE FOR HIRE
        </div>
        <div className="hero-section__topbar-right">
          <span className="hero-section__utc">[ UTC+05:30 ]</span>
          <div className="cyber-social-links flex gap-2">
            <CyberSocialLink href="#" label="GitHub" icon={Github} index={0} />
            <CyberSocialLink
              href="#"
              label="LinkedIn"
              icon={Linkedin}
              index={1}
            />
            <CyberSocialLink href="#" label="Email" icon={Mail} index={2} />
          </div>
        </div>
      </div>

      <div className="hero-section__grid relative z-10">
        <div className="hero-section__main">
          <h1 className="hero-identity" aria-label="APO, Software Engineer">
            <CyberpunkNameLogo />
            <CyberpunkHeroTitle />
          </h1>

          <p className="hero-section__bio">
            Full-stack engineer specializing in AI, Cybersecurity, DevOps, and
            3D web experiences. Building secure, scalable systems and immersive
            digital interfaces.
          </p>

          <div className="hero-section__badge">
            <span className="hero-section__status-dot" aria-hidden />
            AVAILABLE FOR NEW OPPORTUNITIES
          </div>

          <div className="hero-section__actions">
            <Link href="#projects" className={buttonVariants({ size: "lg" })}>
              View Projects <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Download className="size-4" />
              Download CV
            </Link>
            <Link
              href="#contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Send className="size-4" />
              Contact Me
            </Link>
          </div>

          <div className="hero-section__stats">
            <p className="hero-section__stats-heading">
              LET&apos;S BUILD SOMETHING EXTRAORDINARY.
            </p>
            <div className="hero-section__stats-grid">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-section__stat">
                  <stat.icon className="hero-section__stat-icon" aria-hidden />
                  <span className="hero-section__stat-value">{stat.value}</span>
                  <span className="hero-section__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="hero-dashboard" aria-label="System status dashboard">
          <span className="hero-dashboard__corner hero-dashboard__corner--tl" />
          <span className="hero-dashboard__corner hero-dashboard__corner--tr" />
          <span className="hero-dashboard__corner hero-dashboard__corner--bl" />
          <span className="hero-dashboard__corner hero-dashboard__corner--br" />
          <span className="hero-dashboard__scan" aria-hidden />

          <div className="hero-dashboard__header">
            <span>// SYSTEM STATUS</span>
            <span>UPTIME: 99.9%</span>
          </div>

          <HeroSystemStatusMonitor />

          <div className="hero-dashboard__block">
            <h2 className="hero-dashboard__label">// CORE EXPERTISE</h2>
            <div className="hero-dashboard__expertise">
              {EXPERTISE.map((item) => (
                <div key={item.label} className="hero-dashboard__expertise-item">
                  <item.icon className="size-5" aria-hidden />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-dashboard__block">
            <h2 className="hero-dashboard__label">// TECH STACK</h2>
            <div className="hero-dashboard__tags">
              {TECH_TAGS.map((tag) => (
                <span key={tag} className="hero-dashboard__tag">
                  <span className="hero-dashboard__tag-dot" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-dashboard__split">
            <div className="hero-dashboard__block">
              <h2 className="hero-dashboard__label">// CURRENT FOCUS</h2>
              <ul className="hero-dashboard__focus">
                {CURRENT_FOCUS.map((item) => (
                  <li key={item}>/ {item}</li>
                ))}
              </ul>
            </div>

            <div className="hero-dashboard__block hero-dashboard__activity">
              <h2 className="hero-dashboard__label">&gt; ACTIVITY</h2>
              <div className="hero-dashboard__map-wrap">
                <HeroActivityTerrain />
              </div>
            </div>
          </div>

          <div className="hero-dashboard__footer">
            <div>
              <span className="hero-dashboard__meta-label">LAST LOGIN</span>
              <span className="hero-dashboard__meta-value">
                2026-06-18 08:42:17 UTC
              </span>
            </div>
            <div className="hero-dashboard__location">
              <Globe className="size-3.5" aria-hidden />
              <span>LOCATION: EARTH</span>
            </div>
          </div>
        </aside>
      </div>

      <footer className="hero-section__footer relative z-10">
        <span className="hero-section__footer-label">FIND ME ON</span>
        <div className="hero-section__footer-links">
          <Link href="#" className="hero-section__footer-link">
            <Github className="size-3.5" /> GITHUB
          </Link>
          <Link href="#" className="hero-section__footer-link">
            <Linkedin className="size-3.5" /> LINKEDIN
          </Link>
          <Link href="#" className="hero-section__footer-link">
            <Mail className="size-3.5" /> EMAIL
          </Link>
          <Link href="#" className="hero-section__footer-link">
            <Twitter className="size-3.5" /> TWITTER
          </Link>
        </div>
      </footer>
    </Container>
  );
}
