'use client';
import { EdgeBundling } from '@/components/EdgeBundling';
import { Navbar } from '@/components/Navbar';
import { NetworkGraph } from '@/components/NetworkGraph';
import { DataTable } from '@/components/Table';
import { drawerWidth } from '@/constants';
import { AppContext, AppProvider } from '@/contexts/AppProvider';
import { DataProvider } from '@/contexts/DataProvider';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
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
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function Home() {
  const { drawerOpen } = useContext(AppContext);

  return (
    <DataProvider>
      <AppProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <Main open={drawerOpen} className={styles.main}>
            <div className={styles.gridContainer}>
              <div className={styles.splitRow}>
                <div className={styles.splitItem}>
                  <h2>Scatter Plot</h2>
                  <hr />
                  <ScatterPlot />
                </div>
                <div className={styles.splitItem}>
                  <h2>Network Graph</h2>
                  <hr />
                  <NetworkGraph />
                </div>
                <div className={styles.splitItem}>
                  <h2>Edge Bundling</h2>
                  <hr />
                  <EdgeBundling />
                </div>
              </div>
              <DataTable className={styles.fullItem} />
            </div>
          </Main>
        </Box>
      </AppProvider>
    </DataProvider>
  );
}
