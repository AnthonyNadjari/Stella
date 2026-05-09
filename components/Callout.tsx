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
  textColor: string;
}> = {
  insight: {
    label: "INSIGHT",
    icon: "◈",
    borderColor: "rgba(122,162,255,0.3)",
    bgColor: "rgba(122,162,255,0.07)",
    labelColor: "var(--accent)",
    glowColor: "rgba(122,162,255,0.15)",
    textColor: "var(--text-2)",
  },
  warning: {
    label: "WARNING",
    icon: "⚠",
    borderColor: "rgba(246,193,119,0.35)",
    bgColor: "rgba(246,193,119,0.07)",
    labelColor: "var(--gold)",
    glowColor: "rgba(246,193,119,0.12)",
    textColor: "var(--text-2)",
  },
  result: {
    label: "RESULT",
    icon: "✦",
    borderColor: "rgba(167,139,250,0.35)",
    bgColor: "rgba(167,139,250,0.07)",
    labelColor: "var(--violet)",
    glowColor: "rgba(167,139,250,0.15)",
    textColor: "var(--text-2)",
  },
  note: {
    label: "NOTE",
    icon: "◎",
    borderColor: "var(--border-mid)",
    bgColor: "var(--surface-2)",
    labelColor: "var(--text-3)",
    glowColor: "transparent",
    textColor: "var(--text-2)",
  },
  definition: {
    label: "DEFINITION",
    icon: "◇",
    borderColor: "rgba(122,162,255,0.25)",
    bgColor: "rgba(122,162,255,0.05)",
    labelColor: "var(--accent)",
    glowColor: "rgba(122,162,255,0.1)",
    textColor: "var(--text-2)",
  },
};

export default function Callout({ type = "insight", title, children }: CalloutProps) {
  const c = CONFIG[type];

  return (
    <div
      className="my-5 rounded-xl relative overflow-hidden"
      style={{
        border: `1px solid ${c.borderColor}`,
        background: c.bgColor,
        boxShadow: `0 0 20px ${c.glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        padding: "0.9rem 1.1rem",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c.borderColor}, transparent)` }}
      />

      {/* Label */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-xs font-mono" style={{ color: c.labelColor }}>{c.icon}</span>
        <span
          className="text-[10px] font-semibold tracking-widest uppercase font-mono"
          style={{ color: c.labelColor }}
        >
          {title || c.label}
        </span>
      </div>

      {/* Content */}
      <div className="text-sm leading-relaxed" style={{ color: c.textColor }}>
        {children}
      </div>
    </div>
  );
}
