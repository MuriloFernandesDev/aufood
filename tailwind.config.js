/** @type {import('tailwindcss').Config} */

const color = {
   primary: '#da3b3b',
   background: '#fff',
   price: '#da3b3b',
}

module.exports = {
   important: true,
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            price: color.price,
            'base-100': color.background,
         },
      },
   },
   daisyui: {
      themes: [
         {
            light: {
               ...require('daisyui/src/colors/themes')['[data-theme=light]'],
               primary: color.primary,
               'base-100': color.background,
               price: color.price,
            },
         },
      ],
   },
   plugins: [require('daisyui')],
}
