import { getNotesByCategory } from "@/lib/notes";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STELLA — Quantitative Finance Knowledge",
};

/* 4-pointed star path centred at (40,40), outer=32 inner=7 */
const STAR = "M40,8 L46.1,33.9 L72,40 L46.1,46.1 L40,72 L33.9,46.1 L8,40 L33.9,33.9 Z";

/* Constellation star positions [x,y,size] */
const STARS: [number, number, number][] = [
  [20, 15, 1.4], [55, 8, 1.0], [78, 22, 1.2], [68, 50, 0.8],
  [85, 72, 1.3], [50, 78, 0.9], [18, 65, 1.1], [38, 45, 0.7],
  [12, 40, 0.6], [60, 30, 0.8],
];
const LINES: [number, number, number, number][] = [
  [20,15, 55,8], [55,8, 78,22], [78,22, 68,50], [68,50, 85,72],
  [20,15, 18,65], [18,65, 50,78],
];

export default function HomePage() {
  const byCategory = getNotesByCategory();

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="mb-12 pt-2 flex flex-col items-center text-center">

        {/* Star / constellation mark */}
        <div className="relative mb-5" style={{ width: 140, height: 140 }}>
          {/* Background constellation map */}
          <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full" fill="none">
            {LINES.map(([x1,y1,x2,y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--accent)" strokeWidth="0.5" opacity="0.18" />
            ))}
            {STARS.map(([x,y,r], i) => (
              <circle key={i} cx={x} cy={y} r={r}
                fill="var(--accent)" opacity={0.3 + r * 0.15} />
            ))}
          </svg>

          {/* Central star glyph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 80 80" style={{ width: 60, height: 60 }} fill="none">
              {/* Outer glow rings */}
              <circle cx="40" cy="40" r="36" fill="var(--accent)" opacity="0.03" />
              <circle cx="40" cy="40" r="26" fill="var(--accent)" opacity="0.04" />
              <circle cx="40" cy="40" r="18" fill="var(--accent)" opacity="0.06" />
              {/* Cross hairs */}
              <line x1="40" y1="4" x2="40" y2="76" stroke="var(--accent)" strokeWidth="0.4" opacity="0.12" />
              <line x1="4" y1="40" x2="76" y2="40" stroke="var(--accent)" strokeWidth="0.4" opacity="0.12" />
              {/* 4-pointed star */}
              <path d={STAR} fill="var(--accent)" opacity="0.92" />
              {/* Centre dot */}
              <circle cx="40" cy="40" r="2.5" fill="var(--bg)" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 700,
          letterSpacing: "0.28em",
          color: "var(--text-1)",
          marginBottom: "0.5rem",
        }}>
          STELLA
        </h1>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "var(--accent)",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          opacity: 0.7,
        }}>
          Knowledge System
        </p>
        <p style={{ fontSize: "14px", color: "var(--text-3)", maxWidth: 420, lineHeight: 1.7 }}>
          A structured reference for quantitative finance — derivatives pricing, volatility models, and structured products.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 mb-6">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", color: "var(--text-4)", textTransform: "uppercase" }}>
          Notes
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* ── Knowledge graph ── */}
      <KnowledgeGraph byCategory={byCategory} />

      {/* ── Footer ── */}
      <footer className="mt-12 pt-5 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: "var(--text-4)", textAlign: "center", textTransform: "uppercase" }}>
          Stella · Quantitative Finance · v0.1.0
        </p>
      </footer>
    </div>
  );
}
