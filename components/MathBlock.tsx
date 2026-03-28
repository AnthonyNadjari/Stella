import { ReactNode } from "react";

interface MathBlockProps {
  children: ReactNode;
  label?: string;
  number?: string;
}

export default function MathBlock({ children, label, number }: MathBlockProps) {
  return (
    <div className="my-8 group math-block-inner relative">
      <div
        className="rounded-xl relative overflow-hidden"
        style={{
          background: "var(--prose-pre-bg)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
          padding: "1.25rem 1.5rem",
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent-dim), transparent)" }}
        />

        {/* Label row */}
        {(label || number) && (
          <div className="flex items-center justify-between mb-3">
            {label && (
              <span
                className="text-[10px] font-mono tracking-widest uppercase"
                style={{ color: "var(--accent)", opacity: 0.55 }}
              >
                {label}
              </span>
            )}
            {number && (
              <span className="text-[10px] font-mono ml-auto" style={{ color: "var(--text-4)" }}>
                ({number})
              </span>
            )}
          </div>
        )}

        <div className="overflow-x-auto text-center">{children}</div>
      </div>
    </div>
  );
}
