let colors = {
   primary: 'var(--color-primary)',
   'base-100': 'var(--color-background)',
   price: 'var(--color-primary)',
   secondary: 'var(--color-secondary)',
   'secondary-opacity-70': 'rgba(var(--color-secondary-rgb), 0.7)',
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
         maxWidth: {
            container: '1200px',
         },
      },
   },
   daisyui: { themes: ['light'] },
   plugins: [require('daisyui')],
}
