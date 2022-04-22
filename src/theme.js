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
      padding: '1rem'
    },
    title: {
      fontSize: 38,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      lineHeight: 1.2,
      padding: '2rem 1rem'
    },
    h2: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      padding: '1rem'
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
      padding: '1rem'
    },
    h4: {
      fontSize: 14,
      padding: '1rem'
    }
  }
});

export default theme;