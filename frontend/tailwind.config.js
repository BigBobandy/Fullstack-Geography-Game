/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: "1280px",
      },
      spacing: {
        100: "25rem",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro", "forest"],
  },
};
