'use client';
import { EdgeBundling } from '@/components/EdgeBundling';
import { Navbar } from '@/components/Navbar';
import { NetworkGraph } from '@/components/NetworkGraph';
import { DataTable } from '@/components/Table';
import { drawerWidth } from '@/constants';
import { AppProvider } from '@/contexts/AppProvider';
import { DataContext, DataProvider } from '@/contexts/DataProvider';
import { Alert, Box, CssBaseline, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import styles from './page.module.css';
const ScatterPlot = dynamic(() => import('@/components/Scatterplot'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  width: '100vw',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: `calc(100vw - ${drawerWidth}px)`,
  }),
}));

const Body = () => {
  const { error, setError } = useContext(DataContext);
  const [drawerOpen, setDrawerOpen] = useState(
    typeof window !== 'undefined' && window.innerWidth > 992
  );
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    setSnackBarOpen(error !== '');
  }, [error]);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
    setError('');
  };

  const splitItems = [
    { title: 'Dimensionality Reduction', component: <ScatterPlot /> },
    { title: 'Network Graph', component: <NetworkGraph /> },
    { title: 'Edge Bundling', component: <EdgeBundling /> },
  ];

  const hasFullWidthWithDrawer = () =>
    drawerOpen ? styles.splitItemFullWidthDrawer : styles.splitItemFullWidth;

  return (
    <>
      <Navbar open={drawerOpen} handleOpen={toggleDrawerOpen} />
      <Main open={drawerOpen} className={styles.main}>
        <Snackbar
          open={snackBarOpen}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <div className={styles.gridContainer}>
          <div className={styles.splitRow}>
            {splitItems.map((item) => (
              <div
                className={`${styles.splitItem} ${hasFullWidthWithDrawer()}`}
                key={item.title}
              >
                <h2>{item.title}</h2>
                <hr />
                {item.component}
              </div>
            ))}
          </div>
          <DataTable
            className={`${styles.fullItem} ${hasFullWidthWithDrawer()}`}
          />
        </div>
      </Main>
    </>
  );
};

export default function Home() {
  return (
    <DataProvider>
      <AppProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Body />
        </Box>
      </AppProvider>
    </DataProvider>
  );
}
