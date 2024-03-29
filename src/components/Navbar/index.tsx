'use client';
import { SettingsDrawer } from '@/components/Navbar/SettingsDrawer';
import { drawerWidth } from '@/constants';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Image from 'next/image';
import { ResetButton } from './ResetButton';

import LogoImg from '@/assets/images/logo.png';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleOpen?: () => void;
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

export const Navbar = ({ open, handleOpen }: AppBarProps) => {
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
            onClick={handleOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <Image
              src={LogoImg}
              alt="Your Image Alt Text"
              width={15.7}
              height={25.4}
              style={{ marginRight: '0.5rem' }}
            />
            <Typography variant="h6" noWrap component="div">
              vispot
            </Typography>
          </div>
          <ResetButton />
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
        open={open}
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
