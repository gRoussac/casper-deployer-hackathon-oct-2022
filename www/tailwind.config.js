module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        casper: '#FF473E',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        casper: '#FF473E',
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
