import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./shared/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./entities/**/*.{ts,tsx}",
    "./kernel/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    screens: {
      lg: { raw: "screen and (max-width: 1366px)" },
      md: { raw: "screen and (max-width: 1024px)" },
      sm: { raw: "screen and (max-width: 767px)" },
      xs: { raw: "screen and (max-width: 500px)" },
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    fontWeight: {
      normal: "400",
      medium: "600",
      bold: "700",
    },
    fontSize: {
      "0": ["0", "0"],
      xs: ["clamp(1.2rem, 0.875vw, 1.4rem)", "2rem"],
      base: ["clamp(1.4rem, 1vw, 1.6rem)", "2.4rem"],
      lg: ["1,8rem", "2.2rem"],
      xl: ["2rem", "2.8rem"],
      "2xl": ["2.4rem", "2.6rem"],
      "3xl": ["clamp(3rem, 2vw, 3.2rem)", "3.4rem"],
      heading: ["3.4rem", "3.6rem"],
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
