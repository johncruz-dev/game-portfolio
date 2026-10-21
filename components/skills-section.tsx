import type { ReactNode } from "react";
import { Gamepad2 } from "lucide-react";
import { Container as PageContainer } from "@/components/zippystarter/container";
import {
  AiMlIcon,
  CybersecurityIcon,
  DevOpsIcon,
  MobileDevIcon,
  WebDevIcon,
  WebGlIcon,
} from "@/components/skills-expertise-icons";
import { SkillsTechIcon } from "@/components/skills-tech-icon";

const EXPERTISE = [
  {
    title: "Cybersecurity",
    description:
      "Pentesting, security tooling, and hardening systems against modern threats.",
    icon: CybersecurityIcon,
  },
  {
    title: "AI / Machine Learning",
    description:
      "Building intelligent systems with LLMs, computer vision, and data pipelines.",
    icon: AiMlIcon,
  },
  {
    title: "DevOps",
    description:
      "CI/CD pipelines, container orchestration, and infrastructure automation.",
    icon: DevOpsIcon,
  },
  {
    title: "WebGL / Three.js",
    description:
      "Immersive 3D experiences, shaders, and real-time graphics in the browser.",
    icon: WebGlIcon,
  },
  {
    title: "Web Development",
    description:
      "Full-stack web apps with modern frameworks, APIs, and responsive design.",
    icon: WebDevIcon,
  },
  {
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with native performance and polished UX.",
    icon: MobileDevIcon,
  },
] as const;

const TECH_STACK = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "GraphQL", "REST API"],
  },
  {
    category: "Database & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "S3 / Cloud"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Linux", "Nginx", "Figma", "VS Code"],
  },
] as const;

const GAME_TOOLS = [
  "Unity",
  "Unreal Engine",
  "Godot",
  "C#",
  "Blender",
] as const;

const EXPLORING = [
  "Advanced LLM Applications",
  "AI Agents & Automation",
  "WebGPU & Advanced Graphics",
  "Blockchain & Smart Contracts",
] as const;

function SkillsRadar() {
  return (
    <div className="skills-radar" aria-hidden>
      <svg className="skills-radar__svg" viewBox="0 0 120 120">
        <defs>
          <filter id="skillsRadarGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[48, 34, 20, 8].map((r) => (
          <circle
            key={r}
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={r === 48 ? 0.42 : 0.22}
            strokeWidth={r === 48 ? 1 : 0.75}
          />
        ))}
        <g className="skills-radar__sweep" filter="url(#skillsRadarGlow)">
          <path
            d="M60 60 L60 12 A48 48 0 0 1 92 28 Z"
            fill="var(--primary)"
            fillOpacity="0.1"
          />
          <path
            d="M60 12 A48 48 0 0 1 92 28"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.95"
          />
        </g>
        <circle
          className="skills-radar__blip skills-radar__blip--center"
          cx="60"
          cy="60"
          r="2.5"
        />
        <circle
          className="skills-radar__blip skills-radar__blip--outer"
          cx="84"
          cy="34"
          r="2.25"
        />
      </svg>
    </div>
  );
}

function HudFrame({
  className,
  ticks = true,
  children,
}: {
  className?: string;
  ticks?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <span className="skills-hud__corner skills-hud__corner--tl" />
      <span className="skills-hud__corner skills-hud__corner--tr" />
      <span className="skills-hud__corner skills-hud__corner--bl" />
      <span className="skills-hud__corner skills-hud__corner--br" />
      {ticks ? (
        <>
          <span className="skills-hud__tick skills-hud__tick--top" />
          <span className="skills-hud__tick skills-hud__tick--bottom" />
          <span className="skills-hud__tick skills-hud__tick--left" />
          <span className="skills-hud__tick skills-hud__tick--right" />
        </>
      ) : null}
      <span className="skills-hud__glow" aria-hidden />
      {children}
    </div>
  );
}

export function SkillsSection() {
  return (
    <PageContainer
      id="skills"
      component="section"
      wrapperClassName="skills-section border-t border-primary/15"
      className="mx-auto max-w-7xl flex-1 py-24"
    >
      <HudFrame className="skills-dashboard" ticks={false}>
        <span className="skills-dashboard__scanlines" aria-hidden />
        <span className="skills-dashboard__scan" aria-hidden />
        <span className="skills-dashboard__grid-bg" aria-hidden />
        <span className="skills-dashboard__vignette" aria-hidden />

        <div className="skills-dashboard__topbar">
          <span className="skills-dashboard__tag">// SKILLS.EXE</span>
          <div className="skills-dashboard__status">
            <span className="skills-dashboard__status-dot" aria-hidden />
            <span>[ SYSTEM ONLINE ]</span>
          </div>
        </div>

        <header className="skills-dashboard__header">
          <h2 className="skills-dashboard__title">CORE EXPERTISE</h2>
          <p className="skills-dashboard__subtitle">
            Building secure, intelligent and immersive digital experiences across
            multiple domains.
          </p>
        </header>

        <div className="skills-dashboard__body">
          <div className="skills-expertise-grid">
            {EXPERTISE.map((item) => {
              const Icon = item.icon;
              return (
                <HudFrame key={item.title} className="skills-expertise-card">
                  <div className="skills-expertise-card__icon">
                    <Icon />
                  </div>
                  <h3 className="skills-expertise-card__title">{item.title}</h3>
                  <p className="skills-expertise-card__desc">{item.description}</p>
                  <span className="skills-expertise-card__badge">▶ EXPERT</span>
                </HudFrame>
              );
            })}
          </div>

          <div className="skills-dashboard__bottom">
            <div className="skills-special">
              <p className="skills-block-label">// SPECIAL INTEREST</p>
              <HudFrame className="skills-special__card">
                <div className="skills-special__left">
                  <span className="skills-special__icon-box">
                    <Gamepad2 className="skills-special__icon" aria-hidden />
                  </span>
                  <div className="skills-special__copy">
                    <h3 className="skills-special__title">GAME DEVELOPMENT</h3>
                    <p className="skills-special__desc">
                      Passionate about building engaging games and interactive
                      experiences.
                    </p>
                  </div>
                </div>
                <div className="skills-special__tools">
                  {GAME_TOOLS.map((tool) => (
                    <SkillsTechIcon key={tool} label={tool} plain />
                  ))}
                </div>
              </HudFrame>
            </div>

            <div className="skills-exploring">
              <p className="skills-block-label">// CURRENTLY EXPLORING</p>
              <HudFrame className="skills-exploring__panel">
                <ul className="skills-exploring__list">
                  {EXPLORING.map((item) => (
                    <li key={item} className="skills-exploring__item">
                      <span aria-hidden>&gt;</span> {item}
                    </li>
                  ))}
                </ul>
                <SkillsRadar />
              </HudFrame>
            </div>
          </div>

          <aside className="skills-stack">
            <p className="skills-block-label">// TECH STACK</p>
            <HudFrame className="skills-stack__panel">
              {TECH_STACK.map((group, index) => (
                <div
                  key={group.category}
                  className="skills-stack__group"
                  data-last={index === TECH_STACK.length - 1 || undefined}
                >
                  <div className="skills-stack__group-head">
                    <span className="skills-stack__group-bullet" aria-hidden />
                    <h3 className="skills-stack__group-title">{group.category}</h3>
                  </div>
                  <div className="skills-stack__items">
                    {group.items.map((item) => (
                      <SkillsTechIcon key={item} label={item} />
                    ))}
                  </div>
                </div>
              ))}
            </HudFrame>
          </aside>
        </div>

        <footer className="skills-dashboard__footer">
          <code className="skills-dashboard__terminal">
            &gt; const skills = [passion, curiosity, discipline, impact];
          </code>
        </footer>
      </HudFrame>
    </PageContainer>
  );
}
