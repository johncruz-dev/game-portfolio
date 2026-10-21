import { Button } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { ContactSection } from "@/components/contact-section";
import { SkillsSection } from "@/components/skills-section";
import { CyberSiteBackground } from "@/components/cyber-site-background";
import { CyberNavbar } from "@/components/cyber-navbar";
export default function Home() {
  const projects = [
    {
      title: "Nebula Dashboard",
      description:
        "Real-time analytics platform for distributed systems. Built with React, WebSocket, and Go.",
      tags: ["React", "Go", "WebSocket", "D3.js"],
      image: "/project-placeholder-1.jpg",
      link: "#",
      repo: "#",
    },
    {
      title: "Void Chain",
      description:
        "Decentralized identity verification protocol. Smart contracts written in Solidity.",
      tags: ["Solidity", "Ethereum", "Web3.js", "Node.js"],
      image: "/project-placeholder-2.jpg",
      link: "#",
      repo: "#",
    },
    {
      title: "Cyber Construct",
      description:
        "3D architectural visualization tool running in the browser using WebGL.",
      tags: ["Three.js", "WebGL", "Vue", "Python"],
      image: "/project-placeholder-3.jpg",
      link: "#",
      repo: "#",
    },
  ];

  const blogPosts = [
    {
      title: "Optimizing React Render Cycles in High-Frequency Data Apps",
      date: "Oct 12, 2024",
      readTime: "5 min read",
      excerpt:
        "Deep dive into memoization strategies and custom hooks for handling 100+ updates per second.",
    },
    {
      title: "The State of WebAssembly in 2024",
      date: "Sep 28, 2024",
      readTime: "8 min read",
      excerpt:
        "Is WASM ready to replace JavaScript for heavy compute tasks? A performance benchmark.",
    },
    {
      title: "Building a Custom Kubernetes Operator with Go",
      date: "Aug 15, 2024",
      readTime: "12 min read",
      excerpt:
        "Automating stateful application management using the Operator pattern.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <CyberNavbar />

      <HeroSection />

      <div className="site-body">
        <CyberSiteBackground />
        <div className="site-body__content">
      {/* Projects Section */}
      <Container
        id="projects"
        component="section"
        wrapperClassName="py-24 border-t border-primary/15"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="grid justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
              SELECTED
              <br />
              WORKS
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="text-muted-foreground max-w-sm text-left">
            A collection of experiments, production apps, and open source
            contributions.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] grid-rows-[repeat(2,auto)] gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
      {/* Skills Section */}
      <SkillsSection />      {/* Blog Section */}
      <Container
        id="blog"
        wrapperClassName="py-24 border-t border-primary/15"
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-display mb-12 uppercase">Transmissions</h2>

        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <Link href="#" key={index} className="group">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] items-baseline justify-between mb-2">
                <h3 className="text-2xl font-display group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {post.date} // {post.readTime}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                {post.excerpt}
              </p>
              <div className="h-[1px] w-full bg-border group-hover:bg-primary/50 transition-colors"></div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            VIEW ALL POSTS
          </Button>
        </div>
      </Container>
      <ContactSection />
      {/* Footer */}
      <Container
        component="footer"
        wrapperClassName="border-t border-primary/15"
        className="py-8 text-center max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-mono text-muted-foreground">
            © 2025 APO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-xs font-mono">
            <Link href="#" className="cyber-footer-link">
              GITHUB
            </Link>
            <Link href="#" className="cyber-footer-link">
              LINKEDIN
            </Link>
            <Link href="#" className="cyber-footer-link">
              TWITTER
            </Link>
          </div>
        </div>
      </Container>
        </div>
      </div>
    </div>
  );
}
