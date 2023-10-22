import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FFA000',
    },
    text: {
      primary: '#333',
      secondary: '#666', 
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FFA000',
    },
    text: {
      primary: '#EEE', 
      secondary: '#CCC', 
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

export { lightTheme, darkTheme };
