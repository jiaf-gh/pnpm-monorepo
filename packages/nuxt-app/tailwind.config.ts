import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { poppins: ['Poppins'] },
      colors: { primary: { DEFAULT: '#333' } },
    },
  },
  plugins: [],
}