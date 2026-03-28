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
            <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
              <circle cx="24" cy="24" r="3.5" fill="var(--accent)" />
              <circle cx="24" cy="24" r="8" fill="var(--accent)" opacity="0.06" />
              <circle cx="24" cy="24" r="14" fill="var(--accent)" opacity="0.02" />
              {([
                [7,7],[41,7],[7,41],[41,41],
                [24,4],[4,24],[44,24],[24,44],
                [12,12],[36,12],[12,36],[36,36],
              ] as [number,number][]).map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r={i<4?1.4:i<8?0.9:0.6}
                  fill="var(--accent)" opacity={i<4?0.55:i<8?0.3:0.15} />
              ))}
              {([[24,24,7,7],[24,24,41,7],[24,24,7,41],[24,24,41,41]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--accent)" strokeWidth="0.5" opacity="0.15"/>
              ))}
              {/* Extra faint outer ring dots */}
              {[30,60,120,150,210,240,300,330].map((a) => {
                const r = 22, x = 24 + r*Math.cos(a*Math.PI/180), y = 24 + r*Math.sin(a*Math.PI/180);
                return <circle key={a} cx={x} cy={y} r={0.4} fill="var(--violet)" opacity={0.25}/>;
              })}
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
                  border: "1px solid rgba(122,162,255,0.15)",
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
        <div
          className="stella-stats flex items-center gap-0 rounded-xl overflow-hidden"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {[
            { value: totalNotes, label: "notes" },
            { value: Object.keys(byCategory).length, label: Object.keys(byCategory).length === 1 ? "category" : "categories" },
            { value: totalConcepts, label: "concepts" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="flex items-baseline gap-2 px-5 py-3.5 flex-1"
              style={{ borderRight: i < 2 ? "1px solid var(--border)" : undefined }}
            >
              <span
                className="text-2xl font-semibold tabular-nums gradient-text"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </span>
              <span className="text-xs" style={{ color: "var(--text-4)" }}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--accent)" }} />
            <span className="text-[10px] tracking-widest" style={{ color: "var(--text-4)" }}>LIVE</span>
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
                <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                  {category}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>
                  {notes.length} note{notes.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Note cards */}
              <div className="grid gap-3 sm:grid-cols-2">
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
                        className="text-sm font-mono shrink-0 mt-0.5 transition-colors group-hover:translate-x-0.5 transition-transform"
                        style={{ color: "var(--accent)" }}
                      >
                        →
                      </span>
                    </div>

                    {note.description && (
                      <p className="text-[12.5px] leading-relaxed line-clamp-2 mb-2.5" style={{ color: "var(--text-4)" }}>
                        {note.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {note.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            color: "var(--accent)",
                            background: "var(--accent-dim)",
                            border: "1px solid rgba(122,162,255,0.1)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                      {note.readingTime && (
                        <span className="ml-auto text-[10px] font-mono" style={{ color: "var(--text-4)" }}>
                          {note.readingTime}
                        </span>
                      )}
                    </div>
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
