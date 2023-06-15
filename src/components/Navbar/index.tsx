'use client';
import { DataContext } from '@/contexts/DataProvider';
import { backendApi } from '@/services/api';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const Navbar = () => {
  const { setData, setLoading } = useContext(DataContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function handlePlaylistRequest(playlistUrl: string) {
    const errorMessage = 'An error has occurred. Please try again later';
    try {
      const res = await backendApi.get('/playlist', {
        params: {
          playlist_url: playlistUrl,
        },
      });

      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error(errorMessage);
      }
      setLoading(false);
      setDisabled(false);
    } catch (error) {
      toast.error(errorMessage);
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const playlistUrl = (event.target as HTMLInputElement).value;

      let errorString = '';
      if (playlistUrl.trim() === '') {
        errorString += ' the url cannot be empty';
      } else {
        const hasQueryParams =
          playlistUrl.includes('?') || playlistUrl.includes('&');
        if (
          !playlistUrl.includes('https://open.spotify.com/playlist/') ||
          hasQueryParams
        ) {
          errorString += ' please provide a valid Spotify url';
          if (hasQueryParams) {
            errorString += " (check if no '?' or '&' have been pasted)";
          }
        }
      }

      if (errorString !== '') {
        toast.error('Invalid input:' + errorString + '.');
        return;
      }

      setLoading(true);
      setDisabled(true);
      handlePlaylistRequest(playlistUrl);
    }
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const list = () => (
    <Box role="presentation">
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {/* name may go here later, idk */}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="SEARCH"
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={handleKeyPress}
                disabled={disabled}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <ToastContainer />
    </>
  );
};
