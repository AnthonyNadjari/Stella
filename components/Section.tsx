import { ReactNode } from "react";

interface SectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export default function Section({ number, title, children }: SectionProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <section id={id} className="my-14 scroll-mt-20">
      <div className="flex items-center gap-4 mb-5">
        {number && (
          <span
            className="font-mono text-[11px] tracking-widest shrink-0 tabular-nums"
            style={{ color: "var(--accent)", opacity: 0.55 }}
          >
            {String(number).padStart(2, "0")}
          </span>
        )}
        <h2
          className="text-xl font-semibold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-1)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>

      {/* Separator */}
      <div
        className="h-px mb-7"
        style={{
          background: "linear-gradient(90deg, var(--accent-dim) 0%, rgba(167,139,250,0.06) 50%, transparent 100%)",
        }}
      />

      <div>{children}</div>
    </section>
  );
}
