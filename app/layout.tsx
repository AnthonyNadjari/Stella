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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('stella-theme');document.documentElement.classList.add(t==='light'?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-body)" }}>
        {/* Animated star field — hidden in light mode via CSS var */}
        <StarField />

        {/* Deep space ambient glows — hidden in light mode */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" style={{ opacity: "var(--star-opacity)" }}>
          {/* Top blue nebula */}
          <div style={{
            position: "absolute", top: "-5%", left: "30%",
            width: "70%", height: "55%",
            background: "radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.09) 0%, transparent 65%)",
          }} />
          {/* Bottom-left violet nebula */}
          <div style={{
            position: "absolute", bottom: "-10%", left: "10%",
            width: "50%", height: "55%",
            background: "radial-gradient(ellipse at 20% 85%, rgba(192,132,252,0.06) 0%, transparent 58%)",
          }} />
          {/* Right gold comet haze */}
          <div style={{
            position: "absolute", top: "25%", right: "0",
            width: "35%", height: "45%",
            background: "radial-gradient(ellipse at 90% 40%, rgba(251,191,36,0.04) 0%, transparent 55%)",
          }} />
        </div>

        {/* Sidebar */}
        <Sidebar notesByCategory={notesByCategory} />

        {/* Main area */}
        <div
          className="relative z-10 flex flex-col min-h-screen md-main"
          style={{ marginLeft: "260px" }}
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
