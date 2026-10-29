"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { site } from "@/data/portfolio";
import Magnetic from "../Magnetic";
import Reveal from "../Reveal";
import { GithubIcon, LinkedinIcon } from "../BrandIcons";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const links = [
    { label: "GitHub", href: site.github, icon: <GithubIcon size={18} /> },
    { label: "LinkedIn", href: site.linkedin, icon: <LinkedinIcon size={18} /> },
    { label: "Resume", href: site.resume, icon: <Download size={18} />, download: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 rotate-180" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-signal">05</span> {"//"} contact
          </p>
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
            Let&apos;s build <br />
            something that <span className="text-signal">thinks.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted">
            Open to internships and full-time roles in full-stack and AI engineering. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="say hi"
              className="flex items-center gap-3 rounded-full bg-signal px-7 py-4 text-base font-semibold text-void md:text-lg"
            >
              {site.email} <ArrowUpRight size={20} />
            </a>
          </Magnetic>
          <button
            onClick={copy}
            className="flex w-fit items-center gap-2 rounded-full border border-line px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
          >
            {copied ? <Check size={16} className="text-signal" /> : <Copy size={16} />}
            {copied ? "copied" : "copy email"}
          </button>
        </Reveal>

        <Reveal delay={0.25} className="mt-20 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
              className="group flex items-center justify-between rounded-2xl border border-line bg-panel/50 px-6 py-5 transition-colors hover:border-signal/40"
            >
              <span className="flex items-center gap-3 font-medium">
                {l.icon} {l.label}
              </span>
              <ArrowUpRight size={18} className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
            </a>
          ))}
        </Reveal>
      </div>

      <footer className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 font-mono text-[11px] text-muted md:flex-row md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Next.js · React Three Fiber · Motion — press ⌘K to search</span>
        </div>
      </footer>
    </section>
  );
}
