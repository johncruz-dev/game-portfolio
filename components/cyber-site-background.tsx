import type { CSSProperties } from "react";

export function CyberSiteBackground() {
  return (
    <div className="cyber-site-bg" aria-hidden>
      <div className="cyber-site-bg__base" />
      <div className="cyber-site-bg__perspective">
        <div className="cyber-site-bg__floor" />
      </div>
      <div className="cyber-site-bg__grid" />
      <div className="cyber-site-bg__grid cyber-site-bg__grid--fine" />
      <div className="cyber-site-bg__hex" />
      <div className="cyber-site-bg__glow cyber-site-bg__glow--a" />
      <div className="cyber-site-bg__glow cyber-site-bg__glow--b" />
      <div className="cyber-site-bg__glow cyber-site-bg__glow--c" />
      <div className="cyber-site-bg__streams">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="cyber-site-bg__stream"
            style={{ "--stream-index": i } as CSSProperties}
          />
        ))}
      </div>
      <div className="cyber-site-bg__scanlines" />
      <div className="cyber-site-bg__beam" />
      <div className="cyber-site-bg__noise" />
      <div className="cyber-site-bg__vignette" />
    </div>
  );
}
