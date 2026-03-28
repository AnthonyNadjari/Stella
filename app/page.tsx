import Link from "next/link";
import { getAllNotes, getNotesByCategory } from "@/lib/notes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STELLA — Quantitative Finance Knowledge",
};

export default function HomePage() {
  const allNotes = getAllNotes();
  const byCategory = getNotesByCategory();
  const totalNotes = allNotes.length;
  const totalConcepts = allNotes.reduce((acc, n) => acc + (n.tags?.length || 0), 0);

  return (
    <div className="page-enter">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="mb-10 pt-1">
        <div className="flex items-start gap-5 mb-6">

          {/* Constellation mark */}
          <div className="shrink-0 mt-1.5">
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
              <circle cx="24" cy="24" r="3" fill="var(--accent)" />
              <circle cx="24" cy="24" r="8" fill="var(--accent)" opacity="0.05" />
              {([
                [7,7],[41,7],[7,41],[41,41],
                [24,4],[4,24],[44,24],[24,44],
              ] as [number,number][]).map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r={i<4?1.3:0.8}
                  fill="var(--accent)" opacity={i<4?0.5:0.25} />
              ))}
              {([[24,24,7,7],[24,24,41,7],[24,24,7,41],[24,24,41,41]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--accent)" strokeWidth="0.4" opacity="0.12"/>
              ))}
            </svg>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h1
                className="text-4xl md:text-5xl font-semibold gradient-text"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                STELLA
              </h1>
              <span
                className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded"
                style={{
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-mid)",
                }}
              >
                v0.1
              </span>
            </div>
            <p className="text-[14.5px] leading-relaxed max-w-lg" style={{ color: "var(--text-3)" }}>
              A structured knowledge system for quantitative finance — derivatives pricing, volatility models, and structured products.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stella-stats flex items-center gap-0 rounded-xl overflow-hidden">
          {[
            { value: totalNotes, label: "notes" },
            { value: Object.keys(byCategory).length, label: "categories" },
            { value: totalConcepts, label: "concepts" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="flex items-baseline gap-2 px-5 py-3.5 flex-1"
              style={{ borderRight: i < 2 ? "1px solid var(--border)" : undefined }}
            >
              <span
                className="text-2xl font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
              >
                {value}
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--accent)" }} />
            <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--text-4)" }}>LIVE</span>
          </div>
        </div>
      </section>

      {/* ── Knowledge graph ───────────────────────────────── */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-6" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-4)" }}>
            Knowledge Graph
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="space-y-8">
          {Object.entries(byCategory).map(([category, notes]) => (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--accent)", opacity: 0.7 }}>
                  {category}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>
                  {notes.length}
                </span>
              </div>

              {/* Note cards */}
              <div className="grid gap-2.5 sm:grid-cols-2">
                {notes.map((note) => (
                  <Link key={note.path} href={`/notes/${note.path}`} className="note-card group block rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className="text-[14.5px] font-medium leading-snug"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-1)" }}
                      >
                        {note.title}
                      </h3>
                      <span
                        className="shrink-0 mt-0.5 font-mono text-[13px] transition-transform group-hover:translate-x-0.5"
                        style={{ color: "var(--text-4)" }}
                      >
                        →
                      </span>
                    </div>

                    {note.description && (
                      <p className="text-[12.5px] leading-relaxed line-clamp-2" style={{ color: "var(--text-4)" }}>
                        {note.description}
                      </p>
                    )}

                    {note.readingTime && (
                      <div className="mt-2.5">
                        <span className="text-[10px] font-mono" style={{ color: "var(--text-4)", opacity: 0.7 }}>
                          {note.readingTime}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="pt-6 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-[11px] font-mono text-center" style={{ color: "var(--text-4)" }}>
          STELLA · Quantitative Finance Knowledge System · v0.1.0
        </p>
      </footer>
    </div>
  );
}
