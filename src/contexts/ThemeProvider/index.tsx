'use client';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, yellow } from '@mui/material/colors';

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

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={greenTheme}>{children}</ThemeProvider>;
};
