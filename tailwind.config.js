/** @type {import('tailwindcss').Config} */

let colors = {
   primary: 'var(--color-primary)',
   'base-100': 'var(--color-background)',
   price: 'var(--color-primary)',
}

module.exports = {
   important: true,
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: colors,
      },
   },
   daisyui: {},
   plugins: [require('daisyui')],
}
