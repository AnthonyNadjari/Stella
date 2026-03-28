import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { getNotesByCategory, getSearchIndex } from "@/lib/notes";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: {
    default: "STELLA — Quantitative Finance Knowledge",
    template: "%s · STELLA",
  },
  description:
    "A premium knowledge platform for quantitative finance professionals. Notes on volatility, equity derivatives, rates, and structured products.",
  keywords: ["quant finance", "volatility", "derivatives", "structured products"],
};

export const viewport: Viewport = { themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const notesByCategory = getNotesByCategory();
  const searchIndex = getSearchIndex();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-body)" }}>
        {/* Animated star field — hidden in light mode via CSS var */}
        <StarField />

        {/* Ambient radial glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(122,162,255,0.06) 0%, transparent 65%)",
          }}
        />

        {/* Sidebar */}
        <Sidebar notesByCategory={notesByCategory} />

        {/* Main area */}
        <div
          className="relative z-10 flex flex-col min-h-screen md-main"
          style={{ marginLeft: "272px" }}
        >
          <Topbar searchIndex={searchIndex} />

          <main
            className="flex-1 px-6 md:px-12 pb-20"
            style={{ paddingTop: "calc(56px + 2.5rem)" }}
          >
            <div style={{ maxWidth: 880, margin: "0 auto" }}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
