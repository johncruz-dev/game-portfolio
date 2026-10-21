import type { IconType } from "react-icons";
import {
  SiBlender,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiGodotengine,
  SiGo,
  SiGraphql,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSharp,
  SiTailwindcss,
  SiTerraform,
  SiThreedotjs,
  SiTypescript,
  SiUnity,
  SiUnrealengine,
  SiVsco,
} from "react-icons/si";
import { TbBrandAmazon, TbBrandAws } from "react-icons/tb";

const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  Go: SiGo,
  GraphQL: SiGraphql,
  "REST API": SiOpenapiinitiative,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  MySQL: SiMysql,
  "S3 / Cloud": TbBrandAmazon,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: TbBrandAws,
  "GitHub Actions": SiGithubactions,
  Terraform: SiTerraform,
  Git: SiGit,
  Linux: SiLinux,
  Nginx: SiNginx,
  Figma: SiFigma,
  "VS Code": SiVsco,
  Unity: SiUnity,
  Unreal: SiUnrealengine,
  "Unreal Engine": SiUnrealengine,
  Godot: SiGodotengine,
  "C#": SiSharp,
  Blender: SiBlender,
};

export function SkillsTechIcon({
  label,
  plain = false,
}: {
  label: string;
  plain?: boolean;
}) {
  const Icon = TECH_ICONS[label];

  return (
    <div
      className={
        plain ? "skills-tech-icon skills-tech-icon--plain" : "skills-tech-icon"
      }
    >
      <span className="skills-tech-icon__box" aria-hidden>
        {Icon ? (
          <Icon className="skills-tech-icon__svg" />
        ) : (
          <span className="skills-tech-icon__fallback">
            {label.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="skills-tech-icon__label">{label}</span>
    </div>
  );
}
