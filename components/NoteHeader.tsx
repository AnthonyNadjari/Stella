interface NoteHeaderProps {
  title: string;
  category: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export default function NoteHeader({ title, category, description, date, readingTime, tags }: NoteHeaderProps) {
  return (
    <header className="mb-12 pb-8 relative">
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <span
          className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            color: "var(--accent)",
            background: "var(--accent-dim)",
            border: "1px solid rgba(122,162,255,0.15)",
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
        className="text-3xl md:text-4xl font-semibold leading-tight mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-1)", letterSpacing: "-0.025em" }}
      >
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: "var(--text-3)" }}>
          {description}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ color: "var(--text-4)", background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, var(--accent-dim) 0%, rgba(167,139,250,0.06) 50%, transparent 100%)" }}
      />
    </header>
  );
}
