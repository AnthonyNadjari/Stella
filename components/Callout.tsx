import { ReactNode } from "react";

type CalloutType = "insight" | "warning" | "result" | "note" | "definition";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const CONFIG: Record<CalloutType, {
  label: string;
  icon: string;
  borderColor: string;
  bgColor: string;
  labelColor: string;
  glowColor: string;
}> = {
  insight: {
    label: "INSIGHT",
    icon: "◈",
    borderColor: "rgba(122,162,255,0.25)",
    bgColor: "rgba(122,162,255,0.06)",
    labelColor: "var(--accent)",
    glowColor: "rgba(122,162,255,0.12)",
  },
  warning: {
    label: "WARNING",
    icon: "⚠",
    borderColor: "rgba(246,193,119,0.3)",
    bgColor: "rgba(246,193,119,0.06)",
    labelColor: "var(--gold)",
    glowColor: "rgba(246,193,119,0.1)",
  },
  result: {
    label: "RESULT",
    icon: "✦",
    borderColor: "rgba(167,139,250,0.25)",
    bgColor: "rgba(167,139,250,0.06)",
    labelColor: "var(--violet)",
    glowColor: "rgba(167,139,250,0.1)",
  },
  note: {
    label: "NOTE",
    icon: "◎",
    borderColor: "var(--border-mid)",
    bgColor: "var(--surface-2)",
    labelColor: "var(--text-3)",
    glowColor: "transparent",
  },
  definition: {
    label: "DEFINITION",
    icon: "◇",
    borderColor: "rgba(122,162,255,0.2)",
    bgColor: "rgba(122,162,255,0.04)",
    labelColor: "var(--accent)",
    glowColor: "rgba(122,162,255,0.08)",
  },
};

export default function Callout({ type = "insight", title, children }: CalloutProps) {
  const c = CONFIG[type];

  return (
    <div
      className="my-7 rounded-xl relative overflow-hidden"
      style={{
        border: `1px solid ${c.borderColor}`,
        background: c.bgColor,
        boxShadow: `0 0 24px ${c.glowColor}, inset 0 1px 0 rgba(255,255,255,0.03)`,
        padding: "1rem 1.25rem",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c.borderColor}, transparent)` }}
      />

      {/* Label */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="text-xs font-mono" style={{ color: c.labelColor }}>{c.icon}</span>
        <span
          className="text-[10px] font-semibold tracking-widest uppercase font-mono"
          style={{ color: c.labelColor }}
        >
          {title || c.label}
        </span>
      </div>

      {/* Content */}
      <div
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-2)" }}
      >
        {children}
      </div>
    </div>
  );
}
