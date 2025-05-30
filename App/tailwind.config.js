/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        dark: {
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    },
  },darkMode: 'class',
  plugins: [],
}
// tailwind.config.js
// module.exports = {
//   darkMode: 'class',
//   // ... rest of your config
// }
