/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx}",
    "./UI/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'line': '2px', // Customize the height of the line
      },
      colors: {
        'line': '#ffbb22', // Customize the color of the line
      },
    },
  },
  plugins: [],
}

