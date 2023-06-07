import { createTheme } from '@mui/material';
import { blue, grey, red, yellow } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: grey[600],
    },
    error: {
      main: red.A200,
    },
    primary: {
      main: blue[400],
    },
    background: {
      default: grey[800],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: grey[700],
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundColor: grey[700],
        },
      },
    }
  },
});