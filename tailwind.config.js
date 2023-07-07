/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#007cff",
            secondary: "#6fbaf7",
            accent: "#002cb8",
            neutral: "#6b7280",
            "base-100": "#f3f4f6",
            info: "#3abff8",
            success: "#36d399",
            warning: "#fbbd23",
            error: "#f87272",
          },
          mythemedark: {
            primary: "#007cff",
            secondary: "#6fbaf7",
            accent: "#002cb8",
            neutral: "#6b7280",
            "base-100": "#111827",
            info: "#3abff8",
            success: "#36d399",
            warning: "#fbbd23",
            error: "#f87272",
          },
        },
      ],
    },
  },
};
