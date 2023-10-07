'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { NetworkGraph } from '@/components/NetworkGraph';
import { DataTable } from '@/components/Table';
import { AppProvider } from '@/contexts/AppProvider';
import { DataProvider } from '@/contexts/DataProvider';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
const ScatterPlot = dynamic(() => import('@/components/Scatterplot'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Home() {
  return (
    <DataProvider>
      <AppProvider>
        <PersistentDrawerLeft />
        {/* <Navbar /> */}
      </AppProvider>
    </DataProvider>
  );
}

import { SettingsDrawer } from '@/components/Navbar/SettingsDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const drawerWidth = 240;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const PersistentDrawerLeft = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          // sx={{
          //   width: drawerWidth,
          //   flexShrink: 0,
          //   '& .MuiDrawer-paper': {
          //     width: drawerWidth,
          //     boxSizing: 'border-box',
          //   },
          // }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Box
            sx={{
              marginTop: 10,
            }}
          >
            <SettingsDrawer />
          </Box>
        </Drawer>
        <Main open={open} className={styles.main}>
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
    </>
  );
};
