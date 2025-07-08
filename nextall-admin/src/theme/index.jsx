'use client'

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export default function ThemeProvider({ children }) {
  // Hardcode dark theme
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2065D1',
      },
      secondary: {
        main: '#3366FF',
      },
      background: {
        default: '#000000',
        paper: '#121212',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#121212',
            color: '#FFFFFF',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#121212',
          },
        },
      },
    },
  })

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}