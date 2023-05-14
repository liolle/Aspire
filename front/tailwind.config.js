/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      
      colors: {
        'blk': {
          100:'#404040',
          200:'#171717',
          300: '#0a0a0a'
        } ,
        'wht': '#FAFAFA',
        'blue': '#14213D',
        'orange': '#FCA311',
        'gray': '#a3a3a3'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
    
  },
  plugins: [],
}
