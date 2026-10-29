"use client";

import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Copy, Download, FolderGit2, Hash, Mail } from "lucide-react";
import { nav, projects, site, skills } from "@/data/portfolio";
import { OPEN_PALETTE, scrollToId } from "@/lib/scroll";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

type Item = {
  id: string;
  group: "Projects" | "Sections" | "Actions";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords: string[];
  run: () => void;
};

// Lightweight lexical "similarity": average best match of each query token
// against the item's label + keywords. Good enough to feel like retrieval.
function score(query: string, item: Item) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return 1;
  const haystack = [item.label, ...item.keywords].join(" ").toLowerCase().split(/[\s/—·()-]+/).filter(Boolean);
  const label = item.label.toLowerCase();
  let total = 0;
  let labelHits = 0;
  for (const t of tokens) {
    if (label.includes(t)) labelHits++;
    let best = 0;
    for (const h of haystack) {
      if (h === t) best = 1;
      else if (h.startsWith(t)) best = Math.max(best, 0.85);
      else if (h.includes(t)) best = Math.max(best, 0.6);
    }
    total += best;
  }
  // Matches in the title count for more than keyword-only matches
  return (total / tokens.length) * 0.7 + (labelHits / tokens.length) * 0.3;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "/" && !open && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      setOpen(false);
      setTimeout(() => scrollToId(id), 50);
    };
    return [
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects" as const,
        label: p.name,
        hint: p.stack.slice(0, 3).join(" · "),
        icon: <FolderGit2 size={16} />,
        keywords: [...p.keywords, ...p.stack],
        run: go("projects"),
      })),
      ...nav.map((n) => ({
        id: `s-${n.id}`,
        group: "Sections" as const,
        label: n.label,
        icon: <Hash size={16} />,
        keywords:
          n.id === "skills"
            ? skills.flatMap((s) => [s.cluster, ...s.items])
            : n.id === "about"
              ? ["who", "saksham", "bio", "education", "btkit", "student"]
              : n.id === "experience"
                ? ["work", "intern", "biowellth", "azure", "job"]
                : n.id === "contact"
                  ? ["hire", "email", "reach", "talk"]
                  : [],
        run: go(n.id),
      })),
      {
        id: "a-email",
        group: "Actions",
        label: "Copy email",
        hint: site.email,
        icon: <Copy size={16} />,
        keywords: ["email", "mail", "contact", "hire"],
        run: () => {
          navigator.clipboard.writeText(site.email);
          setToast("Email copied");
          setOpen(false);
        },
      },
      {
        id: "a-mail",
        group: "Actions",
        label: "Send an email",
        icon: <Mail size={16} />,
        keywords: ["email", "mail", "contact", "hire", "message"],
        run: () => (window.location.href = `mailto:${site.email}`),
      },
      {
        id: "a-resume",
        group: "Actions",
        label: "Download resume",
        hint: "PDF",
        icon: <Download size={16} />,
        keywords: ["resume", "cv", "pdf", "download"],
        run: () => window.open(site.resume, "_blank"),
      },
      {
        id: "a-github",
        group: "Actions",
        label: "Open GitHub",
        icon: <GithubIcon size={16} />,
        keywords: ["github", "code", "repos", "source"],
        run: () => window.open(site.github, "_blank"),
      },
      {
        id: "a-linkedin",
        group: "Actions",
        label: "Open LinkedIn",
        icon: <LinkedinIcon size={16} />,
        keywords: ["linkedin", "social", "connect"],
        run: () => window.open(site.linkedin, "_blank"),
      },
    ];
  }, []);

  const results = useMemo(() => {
    const scored = items.map((item) => ({ item, s: score(query, item) }));
    if (!query.trim()) return scored;
    return scored.filter((r) => r.s > 0.25).sort((a, b) => b.s - a.s);
  }, [items, query]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const groups = (["Projects", "Sections", "Actions"] as const)
    .map((g) => ({ g, rows: results.filter((r) => r.item.group === g) }))
    .filter((x) => x.rows.length);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-void/70 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-ink/95 shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              <Command shouldFilter={false} label="Search the portfolio" loop>
                <div className="flex items-center gap-3 border-b border-line px-4">
                  <span className="font-mono text-sm text-signal">&gt;</span>
                  <Command.Input
                    autoFocus
                    value={query}
                    onValueChange={setQuery}
                    placeholder="query the portfolio… try “rag”, “nextjs”, “resume”"
                    className="h-14 flex-1 bg-transparent font-mono text-sm text-fg outline-none placeholder:text-muted"
                  />
                  <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
                </div>

                <Command.List className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
                  <Command.Empty className="px-4 py-10 text-center font-mono text-sm text-muted">
                    0 results above threshold. Try another query.
                  </Command.Empty>
                  {groups.map(({ g, rows }) => (
                    <Command.Group
                      key={g}
                      heading={g}
                      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.25em] [&_[cmdk-group-heading]]:text-muted"
                    >
                      {rows.map(({ item, s }) => (
                        <Command.Item
                          key={item.id}
                          value={item.id}
                          onSelect={item.run}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg/85 data-[selected=true]:bg-signal/10 data-[selected=true]:text-fg"
                        >
                          <span className="text-muted">{item.icon}</span>
                          <span className="flex-1 truncate">
                            {item.label}
                            {item.hint && <span className="ml-2 font-mono text-[11px] text-muted">{item.hint}</span>}
                          </span>
                          {query.trim() ? (
                            <span className="font-mono text-[11px] text-signal">{(0.45 + s * 0.54).toFixed(2)}</span>
                          ) : (
                            <ArrowRight size={14} className="text-muted" />
                          )}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                <div className="flex justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
                  <span>↑↓ navigate · ↵ select</span>
                  <span>{results.length} vectors retrieved</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-signal/40 bg-ink px-5 py-2.5 font-mono text-xs text-signal"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
