import './globals.css';
import theme from '@/app/theme';
import { ConfigProvider } from 'antd';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
