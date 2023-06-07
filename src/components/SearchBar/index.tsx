import { DataContext } from '@/contexts/DataContext';
import { backendApi } from '@/services/api';
import { Search } from '@mui/icons-material';
import { Button, Input, Stack } from '@mui/material';
import { useContext, useState } from 'react';

export const SearchBar = () => {
  const { setData } = useContext(DataContext);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleChange = (event: any) => {
    setPlaylistUrl(event.target.value);
  };

  async function handlePlaylistRequest() {
    const res = await backendApi.get('/playlist', {
      params: {
        playlist_url: playlistUrl,
      },
    });
    setData(res.data);
  }
  return (
    <Stack direction="row" spacing={2}>
      <Input value={playlistUrl} onChange={handleChange} />
      <Button
        onClick={handlePlaylistRequest}
        variant="contained"
        endIcon={<Search />}
      >
        Search
      </Button>
    </Stack>
  );
};
