import { ReactNode } from "react";

interface SectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export default function Section({ number, title, children }: SectionProps) {
  const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <section id={id} className="my-8 scroll-mt-20">
      <div className="flex items-center gap-3 mb-4">
        {number && (
          <span
            className="font-mono text-[10px] tracking-widest shrink-0 tabular-nums px-1.5 py-0.5 rounded"
            style={{
              color: "var(--accent)",
              background: "var(--accent-dim)",
              border: "1px solid rgba(122,162,255,0.12)",
            }}
          >
            {String(number).padStart(2, "0")}
          </span>
        )}
        <h2
          className="text-xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-1)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>

      {/* Separator */}
      <div
        className="h-px mb-5"
        style={{
          background: "linear-gradient(90deg, var(--accent-str) 0%, rgba(167,139,250,0.2) 40%, transparent 100%)",
        }}
      />

      <div>{children}</div>
    </section>
  );
}
