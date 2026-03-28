import { ReactNode } from "react";

interface SketchProps {
  title?: string;
  caption?: string;
  children: ReactNode;
  height?: string | number;
}

export default function Sketch({ title, caption, children, height }: SketchProps) {
  return (
    <figure className="my-9 sketch-frame">
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "var(--text-4)" }}>
            Fig.
          </span>
          <span className="text-sm" style={{ color: "var(--text-3)" }}>{title}</span>
        </div>
      )}

      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
          minHeight: height || 200,
        }}
      >
        {/* Corner accents */}
        {(["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"] as const).map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-5 h-5 pointer-events-none`}
            style={{ background: `radial-gradient(circle at ${i % 2 === 0 ? "0% 0%" : "100% 0%"}, var(--accent-dim) 0%, transparent 70%)` }}
          />
        ))}

        <div
          className="flex items-center justify-center p-6"
          style={{ minHeight: height || 200 }}
        >
          {children}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-center leading-relaxed" style={{ color: "var(--text-4)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
