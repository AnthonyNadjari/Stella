import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center page-enter">
      <div className="mb-6">
        <svg viewBox="0 0 60 60" fill="none" className="w-16 h-16 mx-auto opacity-40 mb-4">
          <circle cx="30" cy="30" r="4" fill="#7aa2ff" opacity="0.6" />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const r = 22;
            const x = 30 + r * Math.cos((a * Math.PI) / 180);
            const y = 30 + r * Math.sin((a * Math.PI) / 180);
            return <circle key={a} cx={x} cy={y} r={1.2} fill="#7aa2ff" opacity={0.3} />;
          })}
        </svg>
        <div className="font-mono text-6xl font-light text-ink-600 mb-3">404</div>
        <h1 className="font-display text-xl text-ink-400 mb-2">Note not found</h1>
        <p className="text-sm text-ink-600 max-w-sm">
          This coordinate doesn&apos;t exist in the knowledge graph.
        </p>
      </div>
      <Link
        href="/"
        className="text-sm text-comet-blue hover:text-white transition-colors font-mono"
      >
        ← Return to overview
      </Link>
    </div>
  );
}
