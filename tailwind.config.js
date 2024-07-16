let colors = {
   primary: 'rgba(var(--color-primary), <alpha-value>)',
   'base-100': 'rgba(var(--color-background), <alpha-value>)',
   price: 'rgba(var(--color-primary), <alpha-value>)',
   secondary: 'rgba(var(--color-secondary), <alpha-value>)',
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
         colors: {
            ...colors,
            default: '#d82324',
         },
         maxWidth: {
            container: '1200px',
         },
      },
   },
   daisyui: { themes: ['light'] },
   plugins: [require('daisyui')],
}
