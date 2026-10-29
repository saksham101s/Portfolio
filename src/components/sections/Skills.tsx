"use client";

import { motion } from "motion/react";
import { skills } from "@/data/portfolio";
import SectionHeading from "../SectionHeading";

// Deterministic pseudo-random dots so each cluster gets its own little scatter plot
function dots(seed: number, n: number) {
  let s = seed * 9301 + 49297;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 28;
    return { x: 50 + Math.cos(a) * r, y: 40 + Math.sin(a) * r * 0.7, o: 0.3 + rand() * 0.7 };
  });
}

// Bento layout: 6 columns on tablet, 12 on desktop
const span = [
  "md:col-span-3 lg:col-span-6",
  "md:col-span-3 lg:col-span-6",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="04"
        label="skills"
        title={
          <>
            My stack, <span className="text-outline">clustered.</span>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
        {skills.map((group, gi) => (
          <motion.div
            key={group.cluster}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative overflow-hidden rounded-3xl border border-line bg-panel/50 p-6 transition-colors duration-500 hover:border-ice/30 ${span[gi % span.length]}`}
          >
            <svg
              aria-hidden
              viewBox="0 0 100 80"
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-40 opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
            >
              {dots(gi + 1, 26).map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={i % 7 === 0 ? 1.6 : 0.9} fill={i % 5 === 0 ? "#c6ff3d" : "#6ee7ff"} opacity={d.o} />
              ))}
            </svg>

            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              cluster_{gi} · n={group.items.length}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">{group.cluster}</h3>

            <div className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + gi * 0.05 + i * 0.03 }}
                  className="rounded-full border border-line bg-void/60 px-3 py-1.5 text-sm text-fg/85 transition-colors hover:border-signal/50 hover:text-signal"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
