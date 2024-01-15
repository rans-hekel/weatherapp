/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#191919",
        "weather-secondary": "#31304D",
        "weather-accent": "#4F4F4F",
      },
      fontFamily: {
        inter: ["Roboto", "sans-serif"],
      },
      container: {
        padding: "3rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
