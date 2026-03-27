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
          <span className="text-[10px] font-mono text-ink-600 tracking-widest uppercase">
            Fig.
          </span>
          <span className="text-sm text-ink-400">{title}</span>
        </div>
      )}

      {/* Frame */}
      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          background: "#0a0e1c",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
          minHeight: height || 200,
        }}
      >
        {/* Corner accents */}
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
          (pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-4 h-4 pointer-events-none`}
              style={{
                background: `radial-gradient(circle at ${i % 2 === 0 ? "0% 0%" : "100% 0%"}${i >= 2 ? " 100%" : ""}, rgba(122,162,255,0.1) 0%, transparent 70%)`,
              }}
            />
          )
        )}

        {/* Content */}
        <div className="flex items-center justify-center p-6" style={{ minHeight: height || 200 }}>
          {children}
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-3 text-xs text-ink-600 text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
