/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
        'primary': '#335E50',
        'secondary_01': '#D9DB98',
        'secondary_02': '#B3CDBC',
        'bad_plant_red': '#761E1E',
        'background': '#F8F6F2',
        'paragragh_text': '#9795B5',
      },
      backgroundImage: {
        'hero-pattern': 'url("/assets/img/hero_background.png")',
      }
    },
  },
  plugins: [],
}
