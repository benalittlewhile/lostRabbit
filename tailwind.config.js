/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xsm': '400px',
      }
    },
    
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
