/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111",
        secondary: "#4d74ff",
        tertiary: "#202020",
        slate: {
          100: "#f1f3f4",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#5B5B5B",
          90: "#141414",
        },
        backgroundImage: {},
        screens: {
          xs: "400px",
          "3xl": "1680px",
          "4xl": "2200px",
        },
      },
    },
  },
  plugins: [],
};
