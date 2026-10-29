"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { site } from "@/data/portfolio";
import { openPalette, scrollToId } from "@/lib/scroll";
import Magnetic from "../Magnetic";

const EmbeddingField = dynamic(() => import("../three/EmbeddingField"), { ssr: false });

const queries = ["distributed rag system", "full-stack next.js apps", "who is saksham?", "vector search + claude"];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = words[word];
      char += deleting ? -1 : 1;
      setText(current.slice(0, char));
      let wait = deleting ? 35 : 75;
      if (!deleting && char === current.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && char === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        wait = 400;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

const lines = [site.firstName.toUpperCase(), site.lastName.toUpperCase()];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const typed = useTypewriter(queries);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <EmbeddingField lines={lines} />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 md:px-10 md:pb-16">
        <h1 className="sr-only">
          {site.name} — {site.role}
        </h1>

        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease }}
          >
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {site.currently}
            </p>
            <p className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {site.role.split("&")[0]}
              <span className="text-signal">&</span>
              {site.role.split("&")[1]}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{site.tagline}</p>
          </motion.div>

          <motion.div
            className="pointer-events-auto flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.85, ease }}
          >
            <button
              onClick={openPalette}
              data-cursor="query"
              className="group flex w-full items-center gap-3 rounded-xl border border-line bg-panel/70 px-4 py-3.5 text-left font-mono text-sm backdrop-blur-md transition-colors hover:border-signal/50"
              aria-label="Search the portfolio"
            >
              <span className="text-signal">&gt;</span>
              <span className="text-muted">query:</span>
              <span className="flex-1 truncate text-fg">
                &quot;{typed}&quot;
                <span className="animate-pulse text-signal">▍</span>
              </span>
              <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted group-hover:text-signal">⌘K</kbd>
            </button>

            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <button
                  onClick={() => scrollToId("projects")}
                  className="flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
                >
                  View my work <ArrowDown size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.resume}
                  download
                  className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-fg/40"
                >
                  Resume <Download size={16} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
