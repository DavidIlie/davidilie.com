module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background': "url('/images/background_later.gif')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
