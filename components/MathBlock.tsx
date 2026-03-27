import { ReactNode } from "react";

interface MathBlockProps {
  children: ReactNode;
  label?: string;
  number?: string;
}

export default function MathBlock({ children, label, number }: MathBlockProps) {
  return (
    <div className="my-8 relative group math-block-inner">
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(122,162,255,0.06), rgba(167,139,250,0.04))",
        }}
      />

      {/* Main panel */}
      <div
        className="rounded-xl px-6 py-5 relative overflow-hidden"
        style={{
          background: "#0c1022",
          border: "1px solid rgba(122,162,255,0.12)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(122,162,255,0.3), transparent)",
          }}
        />

        {/* Label row */}
        {(label || number) && (
          <div className="flex items-center justify-between mb-3">
            {label && (
              <span className="text-[10px] font-mono text-comet-blue opacity-50 tracking-widest uppercase">
                {label}
              </span>
            )}
            {number && (
              <span className="text-[10px] font-mono text-ink-600 ml-auto">
                ({number})
              </span>
            )}
          </div>
        )}

        {/* Math content — rendered by rehype-katex */}
        <div className="overflow-x-auto text-center">{children}</div>
      </div>
    </div>
  );
}
