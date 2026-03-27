interface NoteHeaderProps {
  title: string;
  category: string;
  description?: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export default function NoteHeader({
  title,
  category,
  description,
  date,
  readingTime,
  tags,
}: NoteHeaderProps) {
  return (
    <header className="mb-12 pb-8 relative">
      {/* Category badge */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            color: "#7aa2ff",
            background: "rgba(122,162,255,0.08)",
            border: "1px solid rgba(122,162,255,0.15)",
          }}
        >
          {category}
        </span>
        {readingTime && (
          <span className="text-[11px] text-ink-600 font-mono">{readingTime}</span>
        )}
        {date && (
          <>
            <span className="text-ink-600 opacity-30">·</span>
            <span className="text-[11px] text-ink-600 font-mono">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1
        className="font-display text-3xl md:text-4xl font-semibold text-ink-100 leading-tight tracking-tight mb-4"
        style={{ letterSpacing: "-0.025em" }}
      >
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-base text-ink-400 leading-relaxed max-w-2xl">{description}</p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-ink-600 px-2 py-0.5 rounded bg-white/3 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(122,162,255,0.15) 0%, rgba(167,139,250,0.08) 50%, transparent 100%)",
        }}
      />
    </header>
  );
}
