/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d8f0ff",
          200: "#b4e4ff",
          300: "#7fd3ff",
          400: "#46b8ff",
          500: "#1b99ff",
          600: "#0a78db",
          700: "#0d60ad",
          800: "#124f8d",
          900: "#154475",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(2, 32, 71, 0.08)",
      },
    },
  },
  plugins: [],
};
