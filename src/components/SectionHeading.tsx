import Reveal from "./Reveal";

export default function SectionHeading({ index, label, title }: { index: string; label: string; title: React.ReactNode }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        <span className="text-signal">{index}</span> {"//"} {label}
      </p>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
    </Reveal>
  );
}
