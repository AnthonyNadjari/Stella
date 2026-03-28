interface NoteHeaderProps {
  title: string;
  category: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export default function NoteHeader({ title, category, description, date, readingTime }: NoteHeaderProps) {
  return (
    <header className="mb-8 pb-6 relative">
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <span
          className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            color: "var(--accent)",
            background: "var(--accent-dim)",
            border: "1px solid var(--border-mid)",
            letterSpacing: "0.12em",
          }}
        >
          {category}
        </span>
        {readingTime && (
          <span className="text-[11px] font-mono" style={{ color: "var(--text-4)" }}>{readingTime}</span>
        )}
        {date && (
          <>
            <span style={{ color: "var(--text-4)", opacity: 0.3 }}>·</span>
            <span className="text-[11px] font-mono" style={{ color: "var(--text-4)" }}>
              {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-semibold leading-tight mb-3"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-1)", letterSpacing: "-0.025em" }}
      >
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-[14.5px] leading-relaxed max-w-2xl" style={{ color: "var(--text-3)" }}>
          {description}
        </p>
      )}

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, var(--accent-str) 0%, var(--border-mid) 50%, transparent 100%)" }}
      />
    </header>
  );
}
