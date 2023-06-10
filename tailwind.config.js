/** @type {import('tailwindcss').Config} */

const color = {
   primary: '#4E60FF',
}

module.exports = {
   important: true,
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {},
   },
   daisyui: {
      themes: [
         {
            light: {
               ...require('daisyui/src/colors/themes')['[data-theme=light]'],
               primary: color.primary,
               'info-content': '#606060',
            },
         },
      ],
   },
   plugins: [require('daisyui')],
}
