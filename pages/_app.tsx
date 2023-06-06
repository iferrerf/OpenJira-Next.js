import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../themes'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '@/context/entries'
import { SnackbarProvider } from 'notistack';
import { useState } from 'react'
import { Navbar } from '@/components/ui'



export default function App({ Component, pageProps }: AppProps) {

  const [themeMode, setThemeMode] = useState('light');
  
  const handleThemeChange = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
  };
  
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;


  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar themeMode={themeMode} handleThemeChange={handleThemeChange}/>
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
