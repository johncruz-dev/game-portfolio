import Link from "next/link";
import {
  ChevronDown,
  Code2,
  Github,
  Globe,
  Linkedin,
  Lock,
  Mail,
  MessageSquare,
  Send,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/zippystarter/container";

const CONTACT_NODES = [
  {
    title: "EMAIL",
    value: "apo.god.0585@gmail.com",
    href: "mailto:apo.god.0585@gmail.com",
    hint: "Best way to reach me",
    icon: Mail,
  },
  {
    title: "TELEGRAM",
    value: "@@apobyte",
    href: "https://t.me/apobyte",
    hint: "Quick responses",
    icon: SiTelegram,
  },
  {
    title: "GITHUB",
    value: "github.com/apobyte",
    href: "https://github.com/apobyte",
    hint: "Check out my code",
    icon: Github,
  },
] as const;

const CONNECTION_FEATURES = [
  {
    title: "100% SECURE",
    desc: "End-to-end encrypted communication",
    icon: Shield,
  },
  {
    title: "FAST RESPONSE",
    desc: "Usually responds within 24 hours",
    icon: Zap,
  },
  {
    title: "GLOBAL",
    desc: "Available for remote collaborations",
    icon: Globe,
  },
  {
    title: "TECH FOCUSED",
    desc: "Let's build something amazing together",
    icon: Code2,
  },
] as const;

const SUBJECT_OPTIONS = [
  "Project Inquiry",
  "Collaboration",
  "Job Opportunity",
  "Consulting",
  "Other",
] as const;

function ContactHudFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <span className="cyber-contact-hud__corner cyber-contact-hud__corner--tl" />
      <span className="cyber-contact-hud__corner cyber-contact-hud__corner--tr" />
      <span className="cyber-contact-hud__corner cyber-contact-hud__corner--bl" />
      <span className="cyber-contact-hud__corner cyber-contact-hud__corner--br" />
      <span className="cyber-contact-hud__glow" aria-hidden />
      {children}
    </div>
  );
}

function ContactRadar() {
  return (
    <div className="cyber-contact-radar" aria-hidden>
      <svg className="cyber-contact-radar__svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeOpacity="0.22" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        <g className="cyber-contact-radar__sweep">
          <path d="M50 50 L50 6 A44 44 0 0 1 78 20 Z" fill="var(--primary)" fillOpacity="0.14" />
          <line x1="50" y1="50" x2="50" y2="6" stroke="var(--primary)" strokeWidth="1.25" />
        </g>
        <circle className="cyber-contact-radar__blip" cx="66" cy="28" r="2" />
        <circle className="cyber-contact-radar__blip" cx="38" cy="42" r="1.6" />
        <circle cx="50" cy="50" r="1.8" fill="var(--primary)" />
      </svg>
    </div>
  );
}

function HexIcon({ children }: { children: React.ReactNode }) {
  return <span className="cyber-contact__hex-icon">{children}</span>;
}

export function ContactSection() {
  return (
    <Container
      id="contact"
      wrapperClassName="cyber-contact-section border-t border-primary/15"
      className="mx-auto max-w-7xl py-24"
    >
      <div className="cyber-contact">
        <header className="cyber-contact__header">
          <span className="cyber-contact__tag">// UPLINK CHANNEL</span>
          <h2 className="cyber-contact__title">INITIATE_CONTACT</h2>
          <p className="cyber-contact__desc">
            Have a project in mind or just want to discuss the singularity?
            <br />
            Establish a secure line and send a signal.
          </p>
        </header>

        <div className="cyber-contact__main">
          <ContactHudFrame className="cyber-contact__form-panel">
            <span className="cyber-contact__scan" aria-hidden />
            <div className="cyber-contact__form-bar">
              <span className="cyber-contact__channel">
                <Lock className="size-3.5" aria-hidden />
                SECURE CHANNEL // READY
              </span>
              <span className="cyber-contact__encrypted">
                <Shield className="size-3" aria-hidden />
                ENCRYPTED
              </span>
            </div>

            <form className="cyber-contact__form">
              <div className="cyber-contact__fields cyber-contact__fields--split">
                <div className="cyber-contact__field">
                  <label htmlFor="name" className="cyber-contact__label">
                    NAME
                  </label>
                  <div className="cyber-contact__input-wrap">
                    <User className="cyber-contact__input-icon" aria-hidden />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="cyber-contact__input"
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div className="cyber-contact__field">
                  <label htmlFor="email" className="cyber-contact__label">
                    EMAIL
                  </label>
                  <div className="cyber-contact__input-wrap">
                    <Mail className="cyber-contact__input-icon" aria-hidden />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="cyber-contact__input"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              <div className="cyber-contact__field">
                <label htmlFor="subject" className="cyber-contact__label">
                  SUBJECT
                </label>
                <div className="cyber-contact__input-wrap cyber-contact__input-wrap--select">
                  <span className="cyber-contact__diamond" aria-hidden />
                  <select
                    id="subject"
                    name="subject"
                    className="cyber-contact__select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="cyber-contact__select-chevron" aria-hidden />
                </div>
              </div>

              <div className="cyber-contact__field">
                <label htmlFor="message" className="cyber-contact__label">
                  MESSAGE
                </label>
                <div className="cyber-contact__input-wrap cyber-contact__input-wrap--textarea">
                  <MessageSquare className="cyber-contact__input-icon cyber-contact__input-icon--textarea" aria-hidden />
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your transmission..."
                    className="cyber-contact__textarea"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="cyber-contact__submit w-full">
                <Send className="size-4" aria-hidden />
                SEND TRANSMISSION
              </Button>

              <p className="cyber-contact__privacy">
                <Lock className="size-3.5 shrink-0" aria-hidden />
                Your data is encrypted end-to-end. No spam. No data sharing.
              </p>
            </form>
          </ContactHudFrame>

          <div className="cyber-contact__sidebar">
            <p className="cyber-contact__block-label">// CONTACT_NODES</p>
            <ContactHudFrame className="cyber-contact__nodes-panel">
              <ul className="cyber-contact__nodes">
                {CONTACT_NODES.map((node) => {
                  const Icon = node.icon;
                  return (
                    <li key={node.title}>
                      <Link href={node.href} className="cyber-contact__node">
                        <HexIcon>
                          <Icon className="size-4" aria-hidden />
                        </HexIcon>
                        <div className="cyber-contact__node-body">
                          <span className="cyber-contact__node-title">{node.title}</span>
                          <span className="cyber-contact__node-value">{node.value}</span>
                          <span className="cyber-contact__node-hint">{node.hint}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="cyber-contact__status-block">
                <p className="cyber-contact__block-label">// STATUS</p>
                <div className="cyber-contact__status-row">
                  <div>
                    <p className="cyber-contact__hire">
                      <span className="cyber-contact__hire-dot" aria-hidden />
                      AVAILABLE_FOR_HIRE
                    </p>
                    <p className="cyber-contact__hire-desc">
                      Open to exciting opportunities worldwide.
                    </p>
                  </div>
                  <ContactRadar />
                </div>
              </div>
            </ContactHudFrame>
          </div>
        </div>

        <div className="cyber-contact__establish">
          <p className="cyber-contact__block-label">// ESTABLISH_CONNECTION</p>
          <ContactHudFrame className="cyber-contact__establish-panel">
            <div className="cyber-contact__features">
              {CONNECTION_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="cyber-contact__feature">
                    <HexIcon>
                      <Icon className="size-4" aria-hidden />
                    </HexIcon>
                    <div>
                      <h3 className="cyber-contact__feature-title">{feature.title}</h3>
                      <p className="cyber-contact__feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ContactHudFrame>
        </div>
      </div>
    </Container>
  );
}
