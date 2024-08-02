'use client';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const theme = {
  token: {
    fontFamily: roboto.style.fontFamily,
  },
};

export default theme;
