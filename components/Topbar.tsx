"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface SearchItem {
  title: string;
  description: string;
  path: string;
  category: string;
  tags: string[];
  content: string;
}

interface TopbarProps {
  searchIndex: SearchItem[];
}

export default function Topbar({ searchIndex }: TopbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeResult, setActiveResult] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Init theme from localStorage
  useEffect(() => {
    const stored = (localStorage.getItem("stella-theme") as "dark" | "light") || "dark";
    applyTheme(stored);
    setTheme(stored);
  }, []);

  function applyTheme(t: "dark" | "light") {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(t);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("stella-theme", next);
    applyTheme(next);
  }

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(tag)) {
        e.preventDefault();
        openSearch();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") closeSearch();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 0);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
    setActiveResult(0);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setActiveResult(0);
    if (!value.trim()) { setResults([]); return; }
    const q = value.toLowerCase();
    setResults(
      searchIndex
        .filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.tags.some((t) => t.toLowerCase().includes(q)) ||
            item.content.toLowerCase().includes(q)
        )
        .slice(0, 7)
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveResult((p) => Math.min(p + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveResult((p) => Math.max(p - 1, 0)); }
    else if (e.key === "Enter" && results[activeResult]) {
      router.push(`/notes/${results[activeResult].path}`);
      closeSearch();
    }
  }

  // Breadcrumb
  const segments = pathname.split("/").filter(Boolean);

  return (
    <>
      <header
        className="stella-topbar fixed top-0 right-0 z-20 flex items-center h-[56px] gap-4 px-5"
        style={{ left: "272px" }}
      >
        {/* Mobile spacer */}
        <div className="md:hidden w-8" />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm flex-1 min-w-0" style={{ color: "var(--text-4)" }}>
          <Link href="/" className="hover:text-accent transition-colors shrink-0" style={{ color: "var(--text-4)" }}>
            Stella
          </Link>
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <span style={{ color: "var(--text-4)", opacity: 0.4 }}>/</span>
              <span
                className="truncate transition-colors"
                style={{
                  color: i === segments.length - 1 ? "var(--text-2)" : "var(--text-4)",
                  textTransform: "capitalize",
                }}
              >
                {seg.replace(/-/g, " ")}
              </span>
            </span>
          ))}
        </nav>

        {/* Search trigger */}
        <button
          onClick={openSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-mid)",
            color: "var(--text-4)",
          }}
        >
          <Search size={12} className="shrink-0" />
          <span className="hidden sm:block text-xs">Search</span>
          <kbd
            className="hidden sm:block text-[10px] px-1 py-0.5 rounded font-mono ml-1"
            style={{ background: "var(--surface-3)", color: "var(--text-4)" }}
          >
            /
          </kbd>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all duration-200"
          style={{ color: "var(--text-4)" }}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark"
            ? <Sun size={15} />
            : <Moon size={15} />}
        </button>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div
            className="stella-search-modal w-full max-w-[580px] rounded-xl overflow-hidden page-enter"
            style={{
              boxShadow: "0 0 0 1px var(--accent-dim), 0 24px 60px rgba(0,0,0,0.5), 0 0 80px var(--accent-dim)",
            }}
          >
            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <Search size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search notes, formulas, concepts…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-1)" }}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0"
                style={{ background: "var(--surface-2)", color: "var(--text-4)" }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="py-1 max-h-[400px] overflow-y-auto">
                {results.map((item, i) => (
                  <Link
                    key={item.path}
                    href={`/notes/${item.path}`}
                    onClick={closeSearch}
                    className="flex items-start gap-3 px-4 py-3 transition-colors"
                    style={{ background: i === activeResult ? "var(--accent-dim)" : undefined }}
                    onMouseEnter={() => setActiveResult(i)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm truncate" style={{ color: "var(--text-1)" }}>
                          {highlightMatch(item.title, query)}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded shrink-0 font-mono"
                          style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs truncate" style={{ color: "var(--text-4)" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs shrink-0 mt-0.5 font-mono" style={{ color: "var(--text-4)" }}>→</span>
                  </Link>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-10 text-center text-sm" style={{ color: "var(--text-4)" }}>
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {!query && (
              <div className="px-4 py-4">
                <p className="text-[11px] font-mono mb-3" style={{ color: "var(--text-4)", letterSpacing: "0.08em" }}>
                  KEYBOARD
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["↑↓ Navigate", "↵ Open", "ESC Close"].map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono px-2 py-1 rounded"
                      style={{ background: "var(--surface-2)", color: "var(--text-4)" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}
