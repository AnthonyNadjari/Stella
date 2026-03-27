import { ReactNode } from "react";
import clsx from "clsx";

type CalloutType = "insight" | "warning" | "result" | "note" | "definition";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  {
    label: string;
    icon: string;
    border: string;
    bg: string;
    labelColor: string;
    glow: string;
  }
> = {
  insight: {
    label: "INSIGHT",
    icon: "◈",
    border: "border-comet-blue/30",
    bg: "bg-comet-blue-glow",
    labelColor: "text-comet-blue",
    glow: "shadow-glow-blue-sm",
  },
  warning: {
    label: "WARNING",
    icon: "⚠",
    border: "border-gold-400/30",
    bg: "bg-gold-glow",
    labelColor: "text-gold-400",
    glow: "shadow-glow-gold",
  },
  result: {
    label: "RESULT",
    icon: "✦",
    border: "border-violet-400/30",
    bg: "bg-violet-glow",
    labelColor: "text-violet-400",
    glow: "shadow-glow-violet",
  },
  note: {
    label: "NOTE",
    icon: "◎",
    border: "border-ink-600/30",
    bg: "bg-white/2",
    labelColor: "text-ink-400",
    glow: "",
  },
  definition: {
    label: "DEFINITION",
    icon: "◇",
    border: "border-comet-blue/20",
    bg: "bg-comet-blue-glow",
    labelColor: "text-comet-blue",
    glow: "shadow-glow-blue-sm",
  },
};

export default function Callout({ type = "insight", title, children }: CalloutProps) {
  const config = CALLOUT_CONFIG[type];

  return (
    <div
      className={clsx(
        "my-7 rounded-lg border px-5 py-4 relative overflow-hidden",
        config.border,
        config.bg,
        config.glow
      )}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(122,162,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <span className={clsx("text-xs font-mono", config.labelColor)}>
          {config.icon}
        </span>
        <span
          className={clsx(
            "text-[10px] font-semibold tracking-widest uppercase font-mono",
            config.labelColor
          )}
        >
          {title || config.label}
        </span>
      </div>

      {/* Content */}
      <div className="text-sm text-ink-200 leading-relaxed [&>p]:m-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  );
}
