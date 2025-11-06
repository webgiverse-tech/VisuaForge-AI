import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom VisuaForge AI colors
        'vf-blue': '#00BFFF', // Electric Blue
        'vf-purple': '#8A2BE2', // Neon Violet
        'vf-dark': '#0A0A0A', // Deep Black
        'vf-gray': '#A0A0A0', // Lighter Dark Gray for subtle elements (changed from #2C2C2C)
        'vf-glow-blue': 'rgba(0, 191, 255, 0.6)',
        'vf-glow-purple': 'rgba(138, 43, 226, 0.6)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "particle-move": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(20vw, 20vh) scale(1.2)" },
          "50%": { transform: "translate(40vw, -10vh) scale(0.8)" },
          "75%": { transform: "translate(-30vw, 15vh) scale(1.1)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "scanner-pulse": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "scanner-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px var(--vf-glow-blue), 0 0 10px var(--vf-glow-purple)" },
          "50%": { boxShadow: "0 0 10px var(--vf-glow-purple), 0 0 20px var(--vf-glow-blue)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "particle-move": "particle-move 30s infinite ease-in-out alternate",
        "scanner-pulse": "scanner-pulse 2s infinite ease-in-out",
        "scanner-line": "scanner-line 1.5s infinite linear",
        "glow": "glow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;