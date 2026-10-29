"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../BrandIcons";
import { projects, type Project } from "@/data/portfolio";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="rounded-md border border-line bg-void/80 px-2.5 py-1 font-mono text-[11px] text-fg"
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <span className="relative mx-1.5 h-px w-6 overflow-hidden bg-line md:w-8">
              <span className="flow-line absolute inset-0" style={{ animationDelay: `${i * 0.25}s` }} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <article
        className="spotlight group rounded-3xl border border-line bg-panel/50 p-6 transition-colors duration-500 hover:border-signal/30 md:p-10"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted">[{String(index).padStart(2, "0")}]</span>
            <span className="flex items-center gap-2">
              <span className="text-muted">score</span>
              <span className="relative h-1 w-20 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-signal"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.score * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="text-signal">{project.score.toFixed(2)}</span>
            </span>
          </div>
          <span
            className={`rounded-full border px-3 py-1 uppercase tracking-[0.15em] ${
              project.status === "in development" ? "border-ember/40 text-ember" : "border-ice/40 text-ice"
            }`}
          >
            {project.status}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{project.name}</h3>
            <p className="mt-4 text-lg text-muted">{project.summary}</p>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">pipeline</p>
              <Pipeline steps={project.pipeline} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="code"
                  className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg/40"
                >
                  <GithubIcon size={16} /> Source
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-void"
                >
                  Live demo <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <div>
            <ul className="space-y-4 text-muted">
              {project.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg/80">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="03"
        label="projects"
        title={
          <>
            Retrieved <span className="text-signal">{projects.length}</span> results.
          </>
        }
      />
      <Reveal className="-mt-10 mb-12 md:-mt-14">
        <p className="font-mono text-xs text-muted">
          top_k={projects.length} · sorted by relevance · index: <span className="text-ice">projects.v1</span>
        </p>
      </Reveal>
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
