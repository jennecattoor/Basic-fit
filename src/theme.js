import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fe7100',
    },
    secondary: {
      main: '#4e4e4e',
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    body: {
      fontWeight: 'initial',
      fontSize: 'initial',
    },
    h1: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 14,
      textTransform: 'uppercase'
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    h4: {
      fontSize: 14
    }
  }
});

export default theme;