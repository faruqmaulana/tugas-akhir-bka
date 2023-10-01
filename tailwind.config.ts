import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "469px",
        "3xl": "1600px",
      },
      backgroundImage: {
        "button-gradient":
          "linear-gradient(180deg, #FEFEFE 0%, #F5F6FA 100%) 0% 0%",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        black: {
          DEFAULT: "#17244B",
        },
        primary: {
          DEFAULT: "#2564AD",
          100: "#C2DAF8",
          200: "#9BBDE5",
          300: "#749FD3",
          400: "#4C82C0",
          500: "#2564AD",
          600: "#005EB8",
          700: "#13529B",
          800: "#154681",
          900: "#0E3A6E",
        },
        secondary: {
          DEFAULT: "#FFB859",
          100: "#F3D3BB",
          200: "#F3BF99",
          300: "#F4AC76",
          400: "#F49854",
          500: "#F67712",
          600: "#E47725",
          700: "#D46919",
          800: "#C35C0C",
          900: "#B34E00",
        },
        charcoal: {
          100: "#F0F5F7",
          200: "#E7ECEE",
          300: "#E0E6E8",
          400: "#D3D9DC",
          500: "#ABB3BA",
          600: "#ADB7C2",
          700: "#747B97",
          800: "#5D6171",
          900: "#424E5D",
          1000: "#20222B",
        },
        aqua: {
          DEFAULT: "#11ACED",
          100: "#31A6F4",
          200: "#3BA0F8",
        },
        tosca: {
          100: "#94EEE2",
          200: "#77E5D6",
          300: "#5ADBCA",
          400: "#3CD2BD",
          500: "#1FC8B1",
          600: "#17AA96",
          700: "#108D7C",
          800: "#086F61",
          900: "#005146",
        },
        danger: {
          DEFAULT: "#EF4D4D",
          100: "#FFC0C0",
          200: "#FBA3A3",
          300: "#F78787",
          400: "#F36A6A",
          500: "#EF4D4D",
          600: "#D23A3A",
          700: "#B52727",
          800: "#971313",
          900: "#7A0000",
        },
        gold: {
          DEFAULT: "#DFA021",
        },
        dashboard: {
          aside: "#ef4444",
          link: "#A0C9F9",
          disabledText: "#C1C3C9",
        },
        breadcrumb: {
          light: "#8B949F",
          dark: "#575A5E",
        },
        login: {
          border: "#E9E9F0",
        },
        table: {
          auditText: "#4D4F5C",
          body: "#F8F8FA",
          border: "#E7E8EE",
          head: "#F5F6FA",
          activeLink: "#1F5A9F",
          statusActive: "#42C997",
          statusInActive: "#929EAF",
          statusInArranging: "#3BA0F8",
          statusReplaced: "#96B4CE",
          statusReprocess: "#C68F50",
          statusReswab: "#AC80D8",
          overdue: "#D43030",
          statusInvalid: "#F8CA8D",
        },
        button: {
          cancel: "#787F8E",
          cancelDarker: "#4E586C",
          rackGray: "#D5D7E2",
          rackDarkGray: "#B7B9C7",
        },
        widget: {
          regular: "#636F7B",
          primary: "#31A6F4",
          secondary: "#F48431",
          tertiary: "#1F5A9F",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
