/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "dark-bg": "#181a1b",
            foot: "#242526",
         },
      },
   },
   plugins: [require("@tailwindcss/line-clamp")],
   darkMode: "class",
};
