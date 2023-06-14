'use client';
import { createTheme, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff',
    },
  },
});

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={greenTheme}>{children}</ThemeProvider>;
};
