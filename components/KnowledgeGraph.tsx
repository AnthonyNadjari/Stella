"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NoteMetadata } from "@/lib/notes";

interface KnowledgeGraphProps {
  byCategory: Record<string, NoteMetadata[]>;
}

export default function KnowledgeGraph({ byCategory }: KnowledgeGraphProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      {Object.entries(byCategory).map(([category, notes]) => {
        const isOpen = collapsed[category] !== true;

        return (
          <div key={category}>
            {/* Category header — clickable to collapse */}
            <button
              onClick={() => setCollapsed((p) => ({ ...p, [category]: !p[category] }))}
              className="w-full flex items-center gap-3 mb-3 group"
            >
              <span
                className="text-[10px] font-mono tracking-widest uppercase"
                style={{ color: "var(--accent)", opacity: 0.7, letterSpacing: "0.14em" }}
              >
                {category}
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span style={{ color: "var(--text-4)" }}>
                {isOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-2 sm:grid-cols-2">
                {notes.map((note) => (
                  <Link key={note.path} href={`/notes/${note.path}`} className="note-card group block rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3
                        className="text-[14px] font-medium leading-snug"
                        style={{ color: "var(--text-1)" }}
                      >
                        {note.title}
                      </h3>
                      <span
                        className="shrink-0 font-mono text-[12px] transition-transform group-hover:translate-x-0.5"
                        style={{ color: "var(--text-4)" }}
                      >
                        →
                      </span>
                    </div>
                    {note.description && (
                      <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--text-4)" }}>
                        {note.description}
                      </p>
                    )}
                    {note.readingTime && (
                      <div className="mt-2">
                        <span className="text-[10px] font-mono" style={{ color: "var(--text-4)", opacity: 0.6 }}>
                          {note.readingTime}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
