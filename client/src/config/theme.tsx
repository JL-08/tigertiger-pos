import { Theme, extendTheme } from '@mui/joy';

export const appTheme: Theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#eeeae8',
          '100': '#dcd5d1',
          '200': '#cbc0ba',
          '300': '#b9aba3',
          '400': '#a8968c',
          '500': '#978175',
          '600': '#856c5e',
          '700': '#745747',
          '800': '#624230',
          '900': '#512d19',
        },
        // @ts-expect-error: define new color token
        secondary: {
          '50': '#fef2e9',
          '100': '#fde6d3',
          '200': '#fcd9bd',
          '300': '#fbcda7',
          '400': '#fac091',
          '500': '#f8b37b',
          '600': '#f7a765',
          '700': '#f69a4f',
          '800': '#f58e39',
          '900': '#f48123',
        },
        yellow: {
          '50': '#fff9ee',
          '100': '#ffe5b273',
          '200': '#ffeecd',
          '300': '#ffe8bc',
          '400': '#ffe2ac',
          '500': '#ffdc9b',
          '600': '#ffd68a',
          '700': '#ffd179',
          '800': '#ffcb69',
          '900': '#ffc558',
        },
      },
    },
  },
  fontFamily: {
    body: "'Poppins', sans-serif",
    display: "'Poppins', sans-serif",
  },
});
