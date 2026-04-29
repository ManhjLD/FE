/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002045",
        secondary: "#0061a5",
        orange: "#ed8936",
        surface: "#faf9fd"
      }
    }
  },
  plugins: []
};