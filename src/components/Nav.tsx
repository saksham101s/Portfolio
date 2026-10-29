"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { nav, site } from "@/data/portfolio";
import { openPalette, scrollToId } from "@/lib/scroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-void/70 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm tracking-tight"
          aria-label="Back to top"
        >
          <span className="text-signal">~/</span>
          {site.firstName.toLowerCase()}
          <span className="animate-pulse text-signal">_</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className="group font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
              >
                <span className="text-signal/60 group-hover:text-signal">0{i + 1}.</span> {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={openPalette}
          className="flex items-center gap-3 rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-signal/40 hover:text-fg"
        >
          <span>search</span>
          <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
      </nav>
    </motion.header>
  );
}
