/*
 * TABLE OF CONTENTS
 * 1. Module Exports - Definition of theme extensions and plugins
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Manual toggling via class
  theme: {
    extend: {
      colors: {
        sepia: {
          bg: '#f4ecd8',    // Warm beige background
          text: '#5b4636',  // Dark brown text
          accent: '#d6c6a8' // Darker beige for borders/accents
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}