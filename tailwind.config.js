module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          50: "#f4fbff",
          100: "#e5f7ff",
          200: "#c8efff",
          300: "#8edcff",
          400: "#5fc4ff",
          500: "#38bdf8",
          600: "#0ea5e9",
          700: "#0784b8",
          800: "#075f91",
          900: "#0b4d74",
          950: "#062a3e",
        },
      },
    },
  },
  plugins: [],
};
