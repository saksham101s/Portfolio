import { experience } from "@/data/portfolio";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="02" label="experience" title="Where I ship." />

      <div className="relative border-l border-line pl-8 md:pl-14">
        {experience.map((job, i) => (
          <Reveal key={job.company + job.title} delay={i * 0.1} className="relative pb-6">
            <span className="absolute -left-[37px] top-2 flex h-3 w-3 md:-left-[61px]">
              {job.current && <span className="absolute h-full w-full animate-ping rounded-full bg-signal opacity-50" />}
              <span className="relative h-3 w-3 rounded-full border-2 border-void bg-signal" />
            </span>

            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-2xl font-bold md:text-4xl">
                {job.company}
                <span className="ml-3 align-middle font-sans text-base font-medium text-muted md:text-lg">{job.title}</span>
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ice">{job.period}</p>
            </div>

            <ul className="mt-6 max-w-3xl space-y-3 text-muted md:text-lg">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-[0.6em] h-px w-4 shrink-0 bg-signal" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span key={t} className="rounded-full bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
