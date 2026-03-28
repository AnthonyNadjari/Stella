import { getNotesByCategory } from "@/lib/notes";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STELLA — Quantitative Finance Knowledge",
};

export default function HomePage() {
  const byCategory = getNotesByCategory();

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="mb-10 pt-1">
        <div className="mb-1 flex items-center gap-3">
          <span style={{ color: "var(--accent)", fontSize: "24px", lineHeight: 1 }}>✦</span>
          <h1
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--text-1)",
            }}
          >
            STELLA
          </h1>
        </div>
        <p className="text-[14px] leading-relaxed max-w-lg mt-3" style={{ color: "var(--text-3)" }}>
          A structured knowledge system for quantitative finance — derivatives pricing, volatility models, structured products.
        </p>
      </section>

      {/* ── Knowledge graph ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-4)", letterSpacing: "0.14em" }}>
            Notes
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <KnowledgeGraph byCategory={byCategory} />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-12 pt-5 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-[10px] font-mono text-center" style={{ color: "var(--text-4)", letterSpacing: "0.08em" }}>
          STELLA · Quantitative Finance Knowledge System · v0.1.0
        </p>
      </footer>
    </div>
  );
}
