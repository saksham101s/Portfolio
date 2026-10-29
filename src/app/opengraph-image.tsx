import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card shown when the link is shared on LinkedIn, Slack, etc.
export default function OpengraphImage() {
  const dots = Array.from({ length: 90 }, (_, i) => ({
    x: (i * 137.5) % 1200,
    y: (i * 89.3) % 630,
    r: (i % 4) + 1,
    c: i % 6 === 0 ? "#c6ff3d" : "#6ee7ff",
  }));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72, background: "#05060a", color: "#e8eaf0", position: "relative" }}>
        {dots.map((d, i) => (
          <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.r * 2, height: d.r * 2, borderRadius: 99, background: d.c, opacity: 0.5 }} />
        ))}
        <div style={{ fontSize: 26, color: "#c6ff3d", fontFamily: "monospace", marginBottom: 20, display: "flex" }}>{'> query: "full-stack ai engineer"'}</div>
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -4, lineHeight: 1, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 40, color: "#8a90a2", marginTop: 20, display: "flex" }}>{`${site.role} · RAG · Next.js · Distributed Systems`}</div>
      </div>
    ),
    size,
  );
}
