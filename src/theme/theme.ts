/**
 * App Theme Design Tokens
 * Contains color palettes, typography configuration, and layout sizing.
 * Aligns with CSS variables configured in `src/app/globals.css` and TailwindCSS v4 theme declarations.
 */

export const theme = {
  colors: {
    // Primary/Secondary Brand Accents
    primary: {
      default: "#2563eb", // Indigo Primary
      rgb: "37, 99, 235",
    },
    secondary: {
      default: "#7c3aed", // Purple Secondary
      rgb: "124, 58, 237",
    },

    // Core Layout Backgrounds & Foregrounds
    light: {
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#f8fafc",
      cardBorder: "#e2e8f0",
      navBg: "rgba(255, 255, 255, 0.7)",
      selectionBg: "rgba(37, 99, 235, 0.15)",
      glow1: "rgba(37, 99, 235, 0.1)",
      glow2: "rgba(124, 58, 237, 0.1)",
    },
    dark: {
      background: "#090d16",
      foreground: "#f1f5f9",
      card: "#0f172a",
      cardBorder: "#1e293b",
      navBg: "rgba(9, 13, 22, 0.7)",
      selectionBg: "rgba(124, 58, 237, 0.3)",
      glow1: "rgba(37, 99, 235, 0.15)",
      glow2: "rgba(124, 58, 237, 0.15)",
    },

    // UI Accent Theme Variations (matching ThemeCustomizer configs)
    accents: [
      {
        id: "classic-indigo",
        name: "Classic Indigo",
        primary: "#2563eb",
        secondary: "#7c3aed",
        primaryRgb: "37, 99, 235",
        secondaryRgb: "124, 58, 237",
      },
      {
        id: "emerald-teal",
        name: "Emerald Teal",
        primary: "#059669",
        secondary: "#0d9488",
        primaryRgb: "5, 150, 105",
        secondaryRgb: "13, 148, 136",
      },
      {
        id: "cyber-sunset",
        name: "Cyber Sunset",
        primary: "#e11d48",
        secondary: "#d97706",
        primaryRgb: "225, 29, 72",
        secondaryRgb: "217, 119, 6",
      },
      {
        id: "neon-cyber",
        name: "Neon Cyber",
        primary: "#0891b2",
        secondary: "#c026d3",
        primaryRgb: "8, 145, 178",
        secondaryRgb: "192, 38, 211",
      },
    ],
  },

  // Typography Settings
  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
      mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    fontSizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },
    lineHeights: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
  },
};

export default theme;
