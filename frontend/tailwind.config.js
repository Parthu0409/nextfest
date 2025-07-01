/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#18181b',
        'dark-card': '#23232a',
        'dark-border': '#26263a',
        'blue-border': '#2563eb',
        'dark-gradient-from': '#18181b',
        'dark-gradient-to': '#23232a',
      },
    },
  },
  plugins: [],
};
