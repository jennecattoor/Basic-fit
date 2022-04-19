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
    title: {
      fontSize: 38,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      lineHeight: 1
    },
    h2: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: 'bold'
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