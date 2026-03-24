/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        brighten: {
          '0%, 100%': { 
            backgroundColor: 'rgb(34, 34, 34)', 
            boxShadow: 'inset 2px 2px 10px black' 
          },
          '50%': { 
            backgroundColor: 'rgb(165, 165, 165)', 
            boxShadow: 'none' 
          },
        },
      },
      animation: {
        'brighten-slow': 'brighten 1.2s infinite',
      },
    },
  },
  plugins: [],
}