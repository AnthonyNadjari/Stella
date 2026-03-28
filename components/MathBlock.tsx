import { ReactNode } from "react";

interface MathBlockProps {
  children: ReactNode;
  label?: string;
  number?: string;
}

export default function MathBlock({ children, label, number }: MathBlockProps) {
  return (
    <div className="my-5 group relative">
      <div
        className="rounded-xl relative overflow-hidden"
        style={{
          background: "var(--pre-bg)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
          padding: "1.1rem 1.4rem",
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent-str), var(--violet), transparent)" }}
        />

        {/* Label row */}
        {(label || number) && (
          <div className="flex items-center justify-between mb-2.5">
            {label && (
              <span
                className="text-[10px] font-mono tracking-widest uppercase"
                style={{ color: "var(--accent)", opacity: 0.7 }}
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
