import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#b0bec5',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;