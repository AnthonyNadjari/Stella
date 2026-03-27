import { ReactNode } from "react";

interface SectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export default function Section({ number, title, children }: SectionProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <section id={id} className="my-12 scroll-mt-20">
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-6">
        {number && (
          <span className="font-mono text-[11px] text-comet-blue opacity-60 shrink-0 tracking-widest">
            {number.padStart(2, "0")}
          </span>
        )}
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold text-ink-100 tracking-tight leading-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Gradient separator line */}
      <div
        className="h-px mb-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(122,162,255,0.2) 0%, rgba(167,139,250,0.08) 40%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div>{children}</div>
    </section>
  );
}
