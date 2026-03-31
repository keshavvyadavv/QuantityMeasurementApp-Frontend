/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        primary:   "#8b1a1a",
        "primary-hover": "#a52020",
        "dash-blue":     "#6487FF",
        "dash-accent":   "#2DD4BF",
        "dash-primary":  "#4164FF",
        "dash-bg":       "#dde8f5",
      },
      borderRadius: {
        card:  "18px",
        input: "8px",
      },
      boxShadow: {
        card: "0 20px 60px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};