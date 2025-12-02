import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          orange: '#FB8B24', // Golden Orange
          yellow: '#FFC43D', // Golden Yellow
          peach: '#FFB88C', // Kept for compatibility but might not use
          light: '#FFF8E7', // Cream background
          lighter: '#FFFCF5', // Lighter cream
          accent: '#E36414', // Deep orange for interactions
          text: '#4A3F35', // Warm dark text
        },
        neutral: {
          dark: '#4A3F35', // Matches warm text
          gray: '#8D8177', // Warm gray
          light: '#FFFBF0', // Warm white
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

