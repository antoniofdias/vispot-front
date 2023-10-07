'use client';
import { SettingsDrawer } from '@/components/Navbar/SettingsDrawer';
import { drawerWidth } from '@/constants';
import { AppContext } from '@/contexts/AppProvider';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

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

export const Navbar = () => {
  const { selectedTrack, setSelectedTrack, drawerOpen, setDrawerOpen } =
    useContext(AppContext);

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            vispot
          </Typography>
          <Button
            disabled={selectedTrack === null}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSelectedTrack(null);
            }}
          >
            Reset selection
          </Button>
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
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <SettingsDrawer />
        </Box>
      </Drawer>
    </>
  );
};
