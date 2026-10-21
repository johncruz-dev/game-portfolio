"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ProjectImage } from "@/components/project-image";
import { ProjectCardFrame } from "@/components/project-card-frame";
import { cn } from "@/lib/utils";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  repo: string;
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={cn(
        "project-card group relative grid grid-rows-subgrid row-span-2 content-start items-start bg-black",
        inView && "project-card--in-view"
      )}
      style={{ "--card-stagger": `${index * 120}ms` } as CSSProperties}
    >
      <div className="project-card-frame pointer-events-none absolute inset-0" aria-hidden>
        <ProjectCardFrame index={index} animate={inView} />
      </div>

      <div className="project-card-content grid grid-rows-subgrid row-span-2 gap-0">
        <ProjectImage src={project.image} alt={project.title} />

        <div className="grid gap-4 pt-4">
          <header className="grid gap-3">
            <p className="cyber-label">
              Project // {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="cyber-title group-hover:cyber-title-active transition-colors duration-300">
              {project.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <span className="cyber-tag">{tag}</span>
                </li>
              ))}
            </ul>
          </header>

          <p className="cyber-body">{project.description}</p>
        </div>
      </div>
    </article>
  );
}
