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
    "A premium knowledge platform for quantitative finance professionals.",
  keywords: ["quant finance", "volatility", "derivatives", "structured products"],
};

export const viewport: Viewport = { themeColor: "#050710" };

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
        {/* Starfield canvas */}
        <StarField />

        {/* Sidebar */}
        <Sidebar notesByCategory={notesByCategory} />

        {/* Main */}
        <div className="relative z-10 flex flex-col min-h-screen md-main" style={{ marginLeft: "260px" }}>
          <Topbar searchIndex={searchIndex} />
          <main className="flex-1 px-6 md:px-10 pb-20" style={{ paddingTop: "calc(56px + 2rem)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
