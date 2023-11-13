'use client';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff',
    },
    secondary: {
      main: yellow[500],
    },
  },
});

const greyTheme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      contrastText: '#fff',
    },
    secondary: {
      main: grey[500],
    },
  },
});

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={greyTheme}>{children}</ThemeProvider>;
};
