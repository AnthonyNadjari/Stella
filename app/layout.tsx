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

        {/* Deep space ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {/* Top radial glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "80%", height: "50%",
            background: "radial-gradient(ellipse at 50% 0%, rgba(122,162,255,0.07) 0%, transparent 65%)",
          }} />
          {/* Bottom-left violet nebula */}
          <div style={{
            position: "absolute", bottom: "-10%", left: "-5%",
            width: "55%", height: "55%",
            background: "radial-gradient(ellipse at 20% 80%, rgba(167,139,250,0.04) 0%, transparent 60%)",
          }} />
          {/* Right accent */}
          <div style={{
            position: "absolute", top: "30%", right: "-5%",
            width: "40%", height: "40%",
            background: "radial-gradient(ellipse at 80% 40%, rgba(122,162,255,0.04) 0%, transparent 60%)",
          }} />
        </div>

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
