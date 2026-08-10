/*
 * TABLE OF CONTENTS
 * 1. Module Exports - Definition of theme extensions and plugins
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  // gap-y-{n} is built dynamically at runtime in ReaderList.tsx from the
  // verticalSpacing slider (min 2, max 16, step 2 — see Header.tsx). Keep
  // this range in sync with that slider or spacing will silently stop
  // working for out-of-range values (ADR-004).
  safelist: [
    'gap-y-2', 'gap-y-4', 'gap-y-6', 'gap-y-8',
    'gap-y-10', 'gap-y-12', 'gap-y-14', 'gap-y-16',
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