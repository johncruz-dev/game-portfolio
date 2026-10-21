import type { CSSProperties } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CyberSocialLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  index?: number;
  className?: string;
};

export function CyberSocialLink({
  href,
  label,
  icon: Icon,
  index = 0,
  className,
}: CyberSocialLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("cyber-social-link", className)}
      style={{ "--social-index": index } as CSSProperties}
    >
      <span className="cyber-social-link__glow" aria-hidden />
      <span className="cyber-social-link__scan" aria-hidden />
      <span
        className="cyber-social-link__corner cyber-social-link__corner--tl"
        aria-hidden
      />
      <span
        className="cyber-social-link__corner cyber-social-link__corner--tr"
        aria-hidden
      />
      <span
        className="cyber-social-link__corner cyber-social-link__corner--bl"
        aria-hidden
      />
      <span
        className="cyber-social-link__corner cyber-social-link__corner--br"
        aria-hidden
      />
      <Icon className="cyber-social-link__icon" aria-hidden />
    </Link>
  );
}
