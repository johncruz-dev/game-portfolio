"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
}

export function ProjectImage({ src, alt }: ProjectImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden bg-black transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale contrast-125 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.35)_50%)] bg-size-[100%_4px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-80" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(243,230,0,0.18),transparent_65%)]" />
    </div>
  );
}
