import { ReactNode } from "react";

interface SketchProps {
  title?: string;
  caption?: string;
  children: ReactNode;
  height?: string | number;
}

export default function Sketch({ title, caption, children, height }: SketchProps) {
  return (
    <figure className="my-6">
      {title && (
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded"
            style={{ color: "var(--accent)", background: "var(--accent-dim)", border: "1px solid rgba(122,162,255,0.12)" }}>
            Fig
          </span>
          <span className="text-[13px]" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{title}</span>
        </div>
      )}

      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
          minHeight: height || 200,
        }}
      >
        {/* Corner glow accents */}
        <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
          style={{ background: "radial-gradient(circle at 0% 0%, var(--accent-dim) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
          style={{ background: "radial-gradient(circle at 100% 100%, rgba(167,139,250,0.06) 0%, transparent 70%)" }} />

        <div className="flex items-center justify-center p-6" style={{ minHeight: height || 200 }}>
          {children}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-[11px] text-center leading-relaxed" style={{ color: "var(--text-4)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
