/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'farmsmarter-green': '#6A8A2C',
        'farmsmarter-darkgreen': '#2C4A1E',
        'farmsmarter-yellow': '#F5D94E',
        'farmsmarter-blue': '#4A7BA7',
        'farmsmarter-orange': '#F28C28',
        'farmsmarter-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
};