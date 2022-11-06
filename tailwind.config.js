/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          linear: 'linear-gradient(to left, hsl(249, 99%, 64%), hsl(278, 94%, 30%))',
          red: 'hsl(0, 100%, 66%)',
        },
        neutral: {
          white: 'hsl(0, 0%, 100%)',
          "light-gravish-violet": 'hsl(270, 3%, 87%)',
          "dark-gravish-violet": 'hsl(279, 6%, 55%)',
          "very-dark-violet": 'hsl(278, 68%, 11%)',
        }
      },
      fontSize: {
        body: '18px'
      },
      fontFamily: {
        family: '"Space Grotesk"'
      }
    },
  },
  plugins: [],
}
