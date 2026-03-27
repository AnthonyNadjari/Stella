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
    "A premium knowledge platform for quantitative finance professionals. Explore structured notes on volatility, equity derivatives, rates, and more.",
  keywords: ["quant finance", "volatility", "derivatives", "structured products", "knowledge base"],
};

export const viewport: Viewport = {
  themeColor: "#07090f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const notesByCategory = getNotesByCategory();
  const searchIndex = getSearchIndex();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="font-body bg-space-950 text-ink-100 antialiased"
      >
        {/* Cosmic background */}
        <StarField />

        {/* Background radial glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(122,162,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Layout */}
        <Sidebar notesByCategory={notesByCategory} />

        <div
          className="relative z-10 flex flex-col min-h-screen"
          style={{ marginLeft: "272px" }}
        >
          <Topbar searchIndex={searchIndex} />

          <main
            className="flex-1 px-6 md:px-12 pb-16"
            style={{ paddingTop: "calc(56px + 2.5rem)" }}
          >
            <div className="max-w-content mx-auto">{children}</div>
          </main>
        </div>

        {/* Mobile: no sidebar margin */}
        <style>{`
          @media (max-width: 767px) {
            .relative.z-10.flex { margin-left: 0 !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
