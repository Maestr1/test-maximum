import './globals.css';
import {ThemeProvider} from '@mui/material/styles';
import theme from '@/app/theme';



export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>)
}
