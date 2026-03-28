"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import type { NoteMetadata } from "@/lib/notes";

interface SidebarProps {
  notesByCategory: Record<string, NoteMetadata[]>;
}

const CATEGORY_ORDER = ["Equity","Volatility","Rates","Structured Products","Stochastic Calculus","Numerical Methods","General"];

export default function Sidebar({ notesByCategory }: SidebarProps) {
  const pathname = usePathname();
  const [catCollapsed, setCatCollapsed] = useState<Record<string, boolean>>({});
  const [tocCollapsed, setTocCollapsed] = useState<Record<string, boolean>>({});
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
    <nav className="flex flex-col h-full overflow-hidden">

      {/* ── Logo ── */}
      <div className="px-4 py-4 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
          {/* Mark: simple diamond cross */}
          <div className="shrink-0" style={{ color: "var(--accent)", fontSize: "20px", lineHeight: 1, opacity: 0.9 }}>
            ✦
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-mono)",
              color: "var(--text-1)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.22em",
            }}>
              STELLA
            </div>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-4)", fontSize: "9px", letterSpacing: "0.16em" }}>
              KNOWLEDGE SYSTEM
            </div>
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <div className="flex-1 overflow-y-auto py-2">

        {/* Overview */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className={clsx("sidebar-item flex items-center gap-2 mx-2 px-3 py-2 rounded text-[13px] transition-colors", pathname === "/" ? "sidebar-item--active" : "sidebar-item--default")}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", opacity: 0.6 }}>⊞</span>
          <span>Overview</span>
        </Link>

        {/* Divider */}
        <div className="mx-3 my-2" style={{ height: "1px", background: "var(--border)" }} />

        {/* Categories */}
        {orderedCategories.map((category) => {
          const notes = notesByCategory[category];
          const catOpen = catCollapsed[category] !== true;

          return (
            <div key={category} className="mb-1">
              {/* Category toggle */}
              <button
                onClick={() => setCatCollapsed((p) => ({ ...p, [category]: !p[category] }))}
                className="w-full flex items-center justify-between px-5 py-1 hover:text-accent transition-colors"
                style={{ color: "var(--text-4)", fontFamily: "var(--font-mono)", fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                <span>{category}</span>
                {catOpen
                  ? <ChevronDown size={9} style={{ opacity: 0.5 }} />
                  : <ChevronRight size={9} style={{ opacity: 0.5 }} />}
              </button>

              {catOpen && (
                <div className="mt-0.5">
                  {notes.map((note) => {
                    const active = isActive(note.path);
                    const hasSections = note.sections.length > 0;
                    const tocOpen = tocCollapsed[note.path] !== false; // open by default when active

                    return (
                      <div key={note.path}>
                        {/* Note row */}
                        <div className="flex items-center mx-2">
                          <Link
                            href={`/notes/${note.path}`}
                            onClick={() => setMobileOpen(false)}
                            className={clsx(
                              "sidebar-item flex-1 px-3 py-1.5 rounded text-[12.5px] leading-snug truncate transition-colors",
                              active ? "sidebar-item--active" : "sidebar-item--default"
                            )}
                          >
                            {note.title}
                          </Link>
                          {/* TOC toggle — only show when active and has sections */}
                          {active && hasSections && (
                            <button
                              onClick={() => setTocCollapsed((p) => ({ ...p, [note.path]: p[note.path] !== false ? false : true }))}
                              className="shrink-0 p-1 rounded transition-colors"
                              style={{ color: "var(--text-4)" }}
                              title={tocOpen ? "Hide sections" : "Show sections"}
                            >
                              {tocOpen ? <ChevronDown size={9} /> : <ChevronRight size={9} />}
                            </button>
                          )}
                        </div>

                        {/* Sections TOC — only for active note */}
                        {active && hasSections && tocOpen && (
                          <div className="ml-5 mt-0.5 mb-1" style={{ borderLeft: "1px solid var(--border-mid)" }}>
                            {note.sections.map((sec) => (
                              <Link
                                key={sec.id}
                                href={`/notes/${note.path}#${sec.id}`}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-1 text-[11px] leading-snug truncate transition-colors hover:text-accent"
                                style={{
                                  color: "var(--text-4)",
                                  paddingLeft: sec.level === 3 ? "1.5rem" : "0.75rem",
                                }}
                              >
                                {sec.text}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--accent)" }} />
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-4)", fontSize: "10px" }}>
            {totalNotes} notes · live
          </span>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="stella-sidebar hidden md:flex fixed left-0 top-0 bottom-0 flex-col w-[260px] z-30">
        {content}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="mobile-toggle md:hidden fixed top-3.5 left-4 z-50 p-1.5 rounded transition-colors"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={clsx(
          "md:hidden stella-sidebar fixed left-0 top-0 bottom-0 w-[260px] z-50 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}
