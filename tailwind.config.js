/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space palette
        space: {
          950: "#07090f",
          900: "#0b0e18",
          800: "#0f1320",
          700: "#151a2c",
          600: "#1c2338",
          500: "#252d45",
        },
        // Comet glow accents
        comet: {
          blue: "#7aa2ff",
          "blue-dim": "#4a6fd4",
          "blue-glow": "rgba(122, 162, 255, 0.15)",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          glow: "rgba(167, 139, 250, 0.12)",
        },
        gold: {
          400: "#f6c177",
          500: "#e8a84f",
          glow: "rgba(246, 193, 119, 0.12)",
        },
        // Text
        ink: {
          100: "#e8ecf5",
          200: "#c5ccd8",
          400: "#9aa3b2",
          600: "#636b7e",
          800: "#3d4455",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      spacing: {
        sidebar: "272px",
        topbar: "56px",
      },
      maxWidth: {
        content: "860px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "star-drift": "starDrift 120s linear infinite",
        "comet-trail": "cometTrail 0.3s ease forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shooting-star": "shootingStar 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        starDrift: {
          from: { transform: "translateY(0px)" },
          to: { transform: "translateY(-2000px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shootingStar: {
          "0%": {
            transform: "translateX(-200px) translateY(-200px)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "30%": {
            transform: "translateX(600px) translateY(600px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(600px) translateY(600px)",
            opacity: "0",
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.06)",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(122, 162, 255, 0.15)",
        "glow-blue-sm": "0 0 10px rgba(122, 162, 255, 0.1)",
        "glow-violet": "0 0 20px rgba(167, 139, 250, 0.12)",
        "glow-gold": "0 0 20px rgba(246, 193, 119, 0.12)",
        surface:
          "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
        "surface-lg":
          "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      typography: (theme) => ({
        stella: {
          css: {
            "--tw-prose-body": theme("colors.ink.200"),
            "--tw-prose-headings": theme("colors.ink.100"),
            "--tw-prose-links": theme("colors.comet.blue"),
            "--tw-prose-code": theme("colors.comet.blue"),
            "--tw-prose-pre-bg": theme("colors.space.800"),
            "--tw-prose-borders": "rgba(255,255,255,0.06)",
            maxWidth: "none",
            fontSize: "0.9375rem",
            lineHeight: "1.75",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-display)",
              fontWeight: "600",
              letterSpacing: "-0.02em",
            },
            h1: { fontSize: "1.875rem" },
            h2: { fontSize: "1.375rem", marginTop: "2.5em" },
            h3: { fontSize: "1.125rem" },
            p: { marginTop: "1.25em", marginBottom: "1.25em" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            code: {
              backgroundColor: theme("colors.space.700"),
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.85em",
              fontFamily: "var(--font-mono)",
            },
            pre: {
              backgroundColor: theme("colors.space.800"),
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "0.5rem",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
            },
            table: {
              fontSize: "0.875em",
            },
            "thead th": {
              color: theme("colors.ink.400"),
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontSize: "0.75em",
              borderBottomColor: "rgba(255,255,255,0.08)",
            },
            "tbody tr": {
              borderBottomColor: "rgba(255,255,255,0.04)",
            },
            "tbody td": {
              color: theme("colors.ink.200"),
            },
            "tbody tr:last-child": {
              borderBottomWidth: "0",
            },
            hr: {
              borderColor: "rgba(255,255,255,0.06)",
              marginTop: "3em",
              marginBottom: "3em",
            },
            blockquote: {
              borderLeftColor: theme("colors.comet.blue"),
              color: theme("colors.ink.400"),
              fontStyle: "italic",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
