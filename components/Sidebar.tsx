"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, LayoutGrid, Menu, X } from "lucide-react";
import clsx from "clsx";
import type { NoteMetadata } from "@/lib/notes";

interface SidebarProps {
  notesByCategory: Record<string, NoteMetadata[]>;
}

const CATEGORY_ORDER = ["Equity","Volatility","Rates","Structured Products","Stochastic Calculus","Numerical Methods","General"];
const CATEGORY_ICONS: Record<string, string> = {
  Equity: "◈", Volatility: "◎", Rates: "◇",
  "Structured Products": "◉", "Stochastic Calculus": "○", "Numerical Methods": "◫", General: "·",
};

export default function Sidebar({ notesByCategory }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => notesByCategory[c]),
    ...Object.keys(notesByCategory).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  function isActive(notePath: string) {
    return pathname === `/notes/${notePath}/` || pathname === `/notes/${notePath}`;
  }

  const totalNotes = Object.values(notesByCategory).flat().length;

  const content = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <div className="flex items-center gap-3 group">
            {/* Stella glyph */}
            <div className="relative w-8 h-8 shrink-0">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                {/* Outer ring dots */}
                {[0,45,90,135,180,225,270,315].map((a, i) => {
                  const r = 13;
                  const x = 16 + r * Math.cos((a * Math.PI) / 180);
                  const y = 16 + r * Math.sin((a * Math.PI) / 180);
                  return <circle key={a} cx={x} cy={y} r={i % 2 === 0 ? 1 : 0.6} fill="var(--accent)" opacity={i % 2 === 0 ? 0.7 : 0.3} />;
                })}
                {/* Connector lines */}
                {[0,90,180,270].map((a) => {
                  const r1 = 5, r2 = 13;
                  return <line key={a}
                    x1={16 + r1 * Math.cos((a * Math.PI) / 180)}
                    y1={16 + r1 * Math.sin((a * Math.PI) / 180)}
                    x2={16 + r2 * Math.cos((a * Math.PI) / 180)}
                    y2={16 + r2 * Math.sin((a * Math.PI) / 180)}
                    stroke="var(--accent)" strokeWidth="0.5" opacity="0.2"
                  />;
                })}
                {/* Core */}
                <circle cx="16" cy="16" r="3" fill="var(--accent)" opacity="0.9" />
                <circle cx="16" cy="16" r="5" fill="var(--accent)" opacity="0.08" />
              </svg>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)" }} />
            </div>

            <div>
              <div
                className="text-[15px] font-semibold tracking-wider transition-colors"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-1)", letterSpacing: "0.12em" }}
              >
                STELLA
              </div>
              <div className="text-[9px] tracking-widest uppercase font-mono" style={{ color: "var(--text-4)" }}>
                Knowledge System
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {/* Overview */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className={clsx("nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === "/" ? "sidebar-item-active" : ""
          )}
          style={{ color: pathname === "/" ? "var(--accent)" : "var(--text-3)" }}
        >
          <LayoutGrid size={12} className="shrink-0 opacity-70" />
          <span>Overview</span>
        </Link>

        {/* Separator */}
        <div className="gradient-separator h-px my-3 mx-1" />

        {/* Categories */}
        {orderedCategories.map((category) => {
          const notes = notesByCategory[category];
          const isOpen = collapsed[category] !== true;
          const icon = CATEGORY_ICONS[category] || "·";

          return (
            <div key={category} className="mb-0.5">
              <button
                onClick={() => setCollapsed((p) => ({ ...p, [category]: !p[category] }))}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-md transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-3 text-center" style={{ color: "var(--accent)", opacity: 0.5 }}>
                    {icon}
                  </span>
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase transition-colors"
                    style={{ color: "var(--text-4)", letterSpacing: "0.1em" }}
                  >
                    {category}
                  </span>
                </div>
                {isOpen
                  ? <ChevronDown size={10} style={{ color: "var(--text-4)", opacity: 0.5 }} />
                  : <ChevronRight size={10} style={{ color: "var(--text-4)", opacity: 0.5 }} />}
              </button>

              {isOpen && (
                <div className="mt-0.5 ml-3 pl-2 space-y-0.5" style={{ borderLeft: "1px solid var(--border)" }}>
                  {notes.map((note) => (
                    <Link
                      key={note.path}
                      href={`/notes/${note.path}`}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        "nav-item block px-3 py-1.5 rounded-r-md text-[13px] leading-snug transition-colors truncate",
                        isActive(note.path) ? "sidebar-item-active" : ""
                      )}
                      style={{ color: isActive(note.path) ? "var(--accent)" : "var(--text-3)" }}
                    >
                      {note.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full animate-pulse-glow" style={{ background: "var(--accent)" }} />
          <span className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>
            {totalNotes} note{totalNotes !== 1 ? "s" : ""} · live
          </span>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="stella-sidebar constellation-bg hidden md:flex fixed left-0 top-0 bottom-0 flex-col w-[272px] z-30"
      >
        {content}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-3.5 left-4 z-50 p-1.5 rounded-md transition-colors"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-mid)",
          color: "var(--text-3)",
        }}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={clsx(
          "md:hidden stella-sidebar constellation-bg fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}
