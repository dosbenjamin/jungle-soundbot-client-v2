module.exports = {
  purge: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'base': '1rem',
        'lg': '1.5rem',
        'xl': '2.25rem'
      },
      colors: {
        white: '#FFF',
        grey: '#AFAFAF',
        blue: {
          225: '#3A4047',
          450: '#31353B',
          775: '#2A2F36',
          900: '#222831'
        },
        orange: '#F2A365',
        red: '#F26565',
        green: '#56C19C'
      },
      fontFamily: {
        'mono': ['Inconsolata', 'monospace']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
