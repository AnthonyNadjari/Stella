"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Menu, X } from "lucide-react";
import clsx from "clsx";
import type { NoteMetadata } from "@/lib/notes";

interface SidebarProps {
  notesByCategory: Record<string, NoteMetadata[]>;
}

const CATEGORY_ORDER = [
  "Equity",
  "Volatility",
  "Rates",
  "Structured Products",
  "Stochastic Calculus",
  "Numerical Methods",
  "General",
];

const CATEGORY_ICONS: Record<string, string> = {
  Equity: "◈",
  Volatility: "◎",
  Rates: "◇",
  "Structured Products": "◉",
  "Stochastic Calculus": "○",
  "Numerical Methods": "◫",
  General: "·",
};

export default function Sidebar({ notesByCategory }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => notesByCategory[c]),
    ...Object.keys(notesByCategory).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  function toggleCategory(cat: string) {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  function isActive(notePath: string) {
    return pathname === `/notes/${notePath}/` || pathname === `/notes/${notePath}`;
  }

  const sidebarContent = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <div className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 flex items-center justify-center">
              {/* Star/comet icon */}
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <circle cx="14" cy="14" r="2.5" fill="#7aa2ff" />
                <circle cx="14" cy="14" r="2.5" fill="#7aa2ff" className="animate-pulse-glow" style={{ filter: "blur(3px)", opacity: 0.6 }} />
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const r = i % 2 === 0 ? 11 : 8;
                  const x = 14 + r * Math.cos((angle * Math.PI) / 180);
                  const y = 14 + r * Math.sin((angle * Math.PI) / 180);
                  return (
                    <circle
                      key={angle}
                      cx={x}
                      cy={y}
                      r={i % 2 === 0 ? 0.8 : 0.5}
                      fill="#7aa2ff"
                      opacity={i % 2 === 0 ? 0.6 : 0.3}
                    />
                  );
                })}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  if (i % 2 !== 0) return null;
                  const r1 = 4;
                  const r2 = 11;
                  const x1 = 14 + r1 * Math.cos((angle * Math.PI) / 180);
                  const y1 = 14 + r1 * Math.sin((angle * Math.PI) / 180);
                  const x2 = 14 + r2 * Math.cos((angle * Math.PI) / 180);
                  const y2 = 14 + r2 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <line
                      key={`line-${angle}`}
                      x1={x1} y1={y1}
                      x2={x2} y2={y2}
                      stroke="#7aa2ff"
                      strokeWidth="0.5"
                      opacity="0.2"
                    />
                  );
                })}
              </svg>
            </div>
            <div>
              <div className="text-[15px] font-display font-semibold tracking-wide text-ink-100 group-hover:text-comet-blue transition-colors">
                STELLA
              </div>
              <div className="text-[10px] text-ink-600 tracking-widest uppercase">
                Knowledge
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {/* Home */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className={clsx(
            "nav-item flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200",
            pathname === "/"
              ? "sidebar-item-active text-ink-100 bg-comet-blue-glow"
              : "text-ink-400 hover:text-ink-200 hover:bg-white/3"
          )}
        >
          <BookOpen size={13} className="shrink-0 opacity-70" />
          <span>Overview</span>
        </Link>

        {/* Separator */}
        <div className="gradient-separator h-px my-3 mx-2" />

        {/* Categories */}
        {orderedCategories.map((category) => {
          const notes = notesByCategory[category];
          const isOpen = collapsed[category] !== true; // open by default
          const icon = CATEGORY_ICONS[category] || "·";

          return (
            <div key={category} className="mb-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-md group transition-all duration-200 hover:bg-white/3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-comet-blue opacity-60 font-mono w-3 text-center">
                    {icon}
                  </span>
                  <span className="text-[10.5px] font-medium tracking-widest uppercase text-ink-600 group-hover:text-ink-400 transition-colors">
                    {category}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown size={11} className="text-ink-600 opacity-60" />
                ) : (
                  <ChevronRight size={11} className="text-ink-600 opacity-60" />
                )}
              </button>

              {isOpen && (
                <div className="mt-0.5 ml-3 pl-2 border-l border-white/5 space-y-0.5">
                  {notes.map((note) => (
                    <Link
                      key={note.path}
                      href={`/notes/${note.path}`}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        "nav-item block px-3 py-1.5 rounded-r-md text-sm leading-snug transition-all duration-200 truncate",
                        isActive(note.path)
                          ? "sidebar-item-active text-comet-blue bg-comet-blue-glow"
                          : "text-ink-400 hover:text-ink-200 hover:bg-white/3"
                      )}
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
      <div className="px-4 py-3 border-t border-white/5">
        <div className="text-[10px] text-ink-600 tracking-wider">
          {Object.values(notesByCategory).flat().length} notes indexed
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 flex-col w-[272px] z-30"
        style={{
          background:
            "linear-gradient(180deg, #0a0d18 0%, #0b0e1c 50%, #09111e 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-3.5 left-4 z-50 p-1.5 rounded-md bg-space-800 border border-white/8 text-ink-400 hover:text-ink-100 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={clsx(
          "md:hidden fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "#0a0d18",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
