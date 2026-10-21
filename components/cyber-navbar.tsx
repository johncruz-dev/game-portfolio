import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#blog", label: "Logs" },
  { href: "#contact", label: "Contact" },
] as const;

export function CyberNavbar() {
  return (
    <Container
      component="header"
      wrapperClassName="cyber-navbar fixed top-0 left-0 w-full z-50"
      className="mx-auto max-w-7xl flex items-center justify-between h-16"
    >
      <span className="cyber-navbar__scan" aria-hidden />
      <Link href="#hero" className="cyber-navbar__brand">
        APO
      </Link>

      <nav className="cyber-navbar__nav hidden md:flex" aria-label="Main">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="cyber-navbar__link">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* <Button variant="outline" size="sm">
        resume_v4.pdf
      </Button> */}
    </Container>
  );
}
