/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#182e3c",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
    screens: {
      'phone': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }
  
      'tablet': {'min': '768px', 'max': '1279px'},
      // => @media (min-width: 768px and max-width: 1279px) { ... }
  
      'laptop': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
  
      'desktop': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
]
}
