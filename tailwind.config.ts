import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6E3',
        mustard: '#E6A532',
        orange: '#E86A33',
        red: '#C23B22',
        charcoal: '#1A1A1A'
      }
    }
  },
  plugins: []
} satisfies Config;
