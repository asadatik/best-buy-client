/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily:{
      cinzel: ['Cinzel', 'serif'],
      inter: ['Inter', 'sans-serif'],
      nothing: ['"Nothing You Could Do"', 'cursive'],
      
    }},
  },
  plugins: [
    require('daisyui'),
  ],
}

