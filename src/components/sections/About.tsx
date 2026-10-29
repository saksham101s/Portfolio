import { about, education } from "@/data/portfolio";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="01"
        label="about"
        title={
          <>
            Engineer of the parts <br className="hidden md:block" />
            <span className="text-outline">you don&apos;t see</span> — and the ones you do.
          </>
        }
      />

      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.1}>
              <div className="flex items-baseline gap-5 border-b border-line pb-4">
                <span className="font-display text-5xl font-bold text-signal">{s.value}</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.label}</span>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
            <div className="mt-8 rounded-2xl border border-line bg-panel/60 p-6">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ice">education</p>
              <p className="font-display text-lg font-semibold">{education.school}</p>
              <p className="text-sm text-muted">
                {education.degree} · {education.period}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <span key={c} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
