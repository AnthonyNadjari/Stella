"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Sun, Moon, Command } from "lucide-react";
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

  // Theme persistence
  useEffect(() => {
    const stored = localStorage.getItem("stella-theme") as "dark" | "light" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("light", stored === "light");
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("stella-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  }

  // Keyboard shortcut for search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Search logic
  function handleSearch(value: string) {
    setQuery(value);
    setActiveResult(0);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const q = value.toLowerCase();
    const matches = searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.content.toLowerCase().includes(q)
      )
      .slice(0, 8);

    setResults(matches);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveResult((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveResult((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[activeResult]) {
      router.push(`/notes/${results[activeResult].path}`);
      closeSearch();
    }
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  // Breadcrumb
  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) =>
      seg
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );

  return (
    <>
      <header
        className="fixed top-0 right-0 z-20 flex items-center h-[56px] px-5 gap-4"
        style={{
          left: "272px",
          background: "rgba(7,9,15,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Mobile left spacer */}
        <div className="md:hidden w-8" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-ink-600 flex-1 min-w-0">
          <Link href="/" className="hover:text-ink-400 transition-colors shrink-0">
            Stella
          </Link>
          {breadcrumb.map((seg, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <span className="opacity-30">/</span>
              <span
                className={clsx(
                  "truncate",
                  i === breadcrumb.length - 1 ? "text-ink-200" : "hover:text-ink-400 transition-colors"
                )}
              >
                {seg}
              </span>
            </span>
          ))}
        </div>

        {/* Search trigger */}
        <button
          onClick={() => {
            setSearchOpen(true);
            setTimeout(() => searchRef.current?.focus(), 0);
          }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-ink-600 hover:text-ink-400 transition-all duration-200 group"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Search size={13} className="shrink-0" />
          <span className="hidden sm:block text-xs">Search notes</span>
          <div className="hidden sm:flex items-center gap-0.5 ml-1">
            <kbd className="text-[10px] px-1 py-0.5 rounded bg-white/5 text-ink-600 font-mono">/</kbd>
          </div>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-ink-600 hover:text-ink-200 transition-all duration-200 hover:bg-white/5"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          style={{ background: "rgba(4,6,12,0.8)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
        >
          <div
            className="w-full max-w-[600px] rounded-xl overflow-hidden animate-slide-up"
            style={{
              background: "#0f1320",
              border: "1px solid rgba(122, 162, 255, 0.15)",
              boxShadow:
                "0 0 0 1px rgba(122,162,255,0.05), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px rgba(122,162,255,0.05)",
            }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search size={15} className="text-comet-blue shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search notes, formulas, topics..."
                className="flex-1 bg-transparent text-ink-100 placeholder-ink-600 text-sm outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="text-[10px] px-1.5 py-1 rounded bg-white/5 text-ink-600 font-mono shrink-0">
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
                    className={clsx(
                      "flex items-start gap-3 px-4 py-3 transition-all duration-150",
                      i === activeResult
                        ? "bg-comet-blue-glow"
                        : "hover:bg-white/3"
                    )}
                    onMouseEnter={() => setActiveResult(i)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm text-ink-100 truncate">
                          {highlightMatch(item.title, query)}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-comet-blue bg-comet-blue-glow shrink-0">
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-ink-600 truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-ink-600 shrink-0 mt-0.5 font-mono">→</span>
                  </Link>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-ink-600 text-sm">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {!query && (
              <div className="px-4 py-4">
                <div className="text-[11px] text-ink-600 uppercase tracking-widest mb-2">
                  Quick nav
                </div>
                <div className="flex flex-wrap gap-2">
                  {["↑↓ Navigate", "↵ Open", "ESC Close"].map((hint) => (
                    <span
                      key={hint}
                      className="text-[11px] text-ink-600 px-2 py-1 rounded bg-white/3 font-mono"
                    >
                      {hint}
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
