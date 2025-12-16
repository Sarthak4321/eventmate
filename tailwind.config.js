/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: "#000000",
      accent: "#6D28D9",
    },
  },
},
  plugins: [],
};
