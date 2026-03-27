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

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="mb-16 pt-4">
        <div className="flex items-start gap-5 mb-8">
          {/* Constellation icon */}
          <div className="shrink-0 mt-1">
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 opacity-80">
              <circle cx="20" cy="20" r="3" fill="#7aa2ff" />
              <circle cx="20" cy="20" r="3" fill="#7aa2ff" style={{ filter: "blur(4px)", opacity: 0.5 }} />
              {([
                [8, 8], [32, 8], [8, 32], [32, 32],
                [20, 4], [4, 20], [36, 20], [20, 36],
              ] as [number, number][]).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i < 4 ? 1.2 : 0.8} fill="#7aa2ff" opacity={i < 4 ? 0.5 : 0.3} />
              ))}
              {([[20, 20, 8, 8], [20, 20, 32, 8], [20, 20, 8, 32], [20, 20, 32, 32]] as [number,number,number,number][]).map(
                ([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7aa2ff" strokeWidth="0.5" opacity="0.2" />
                )
              )}
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1
                className="font-display text-4xl font-semibold text-ink-100 tracking-tight"
                style={{ letterSpacing: "-0.025em" }}
              >
                STELLA
              </h1>
              <span
                className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded"
                style={{
                  color: "#7aa2ff",
                  background: "rgba(122,162,255,0.07)",
                  border: "1px solid rgba(122,162,255,0.12)",
                }}
              >
                v0.1
              </span>
            </div>
            <p className="text-base text-ink-400 leading-relaxed max-w-xl">
              A structured knowledge system for quantitative finance. Notes on derivatives,
              volatility models, structured products, and mathematical finance — built for depth,
              not breadth.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center gap-8 py-4 px-5 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {[
            { value: totalNotes, label: "notes" },
            { value: Object.keys(byCategory).length, label: "categories" },
            { value: allNotes.reduce((acc, n) => acc + (n.tags?.length || 0), 0), label: "concepts" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-xl font-display font-semibold text-ink-100">{value}</span>
              <span className="text-xs text-ink-600 font-mono">{label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-comet-blue animate-pulse-glow" />
            <span className="text-xs text-ink-600 font-mono">continuously updated</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(122,162,255,0.4), transparent)",
              }}
            />
            <span className="text-[10px] font-mono text-ink-600 tracking-widest uppercase">
              Knowledge Graph
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(byCategory).map(([category, notes]) => (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono tracking-widest uppercase text-comet-blue">
                  {category}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
                  }}
                />
                <span className="text-[10px] text-ink-600 font-mono">{notes.length}</span>
              </div>

              {/* Notes grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {notes.map((note) => (
                  <Link
                    key={note.path}
                    href={`/notes/${note.path}`}
                    className="note-card group block rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-base font-medium text-ink-100 leading-snug group-hover:text-white transition-colors">
                        {note.title}
                      </h3>
                      <span className="text-[10px] font-mono text-ink-600 shrink-0 mt-0.5 group-hover:text-comet-blue transition-colors">
                        →
                      </span>
                    </div>

                    {note.description && (
                      <p className="text-sm text-ink-600 leading-relaxed line-clamp-2 mb-3">
                        {note.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {note.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-ink-600 px-1.5 py-0.5 rounded bg-white/3 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {note.readingTime && (
                        <span className="ml-auto text-[10px] text-ink-600 font-mono">
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

      {/* Footer */}
      <footer className="pt-8 pb-4 border-t border-white/4">
        <p className="text-xs text-ink-600 text-center">
          STELLA · Quantitative Finance Knowledge System ·{" "}
          <span className="font-mono">v0.1.0</span>
        </p>
      </footer>
    </div>
  );
}
