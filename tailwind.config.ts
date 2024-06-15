import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./lib/components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--default-font-family)'],
      },
      colors: {
        primary: {
          dark: '#002D80',
          blue: '#206DFA',
          light: '#BFD5FF',
          lighter: '#F0F5FF',
        },
        secondary: '#F5BC00',
        neutral: {
          dark: '#283040',
          normal: '#81868F',
          light: '#E0E1E3',
          lighter: '#F7F8FA',
          white: '#FFFFFF',
        },
        success: { normal: '#05B24E', lighter: '#E9FDF1' },
        error: { normal: '#DE0034', lighter: '#FEEFF2' },
        caution: { normal: '#FAA203', lighter: '#FEF9EF' },
      },
    },
  },
  plugins: [],
};
export default config;
