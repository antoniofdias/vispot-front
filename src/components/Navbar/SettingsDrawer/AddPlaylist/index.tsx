import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { backendApi } from '@/services/api';
import styles from './styles.module.css';

export const AddPlaylist = () => {
  const { setData, loading, setLoading, setError, setPlaylistNames } =
    useContext(DataContext);
  const { setSelectedTracks } = useContext(AppContext);
  const [inputs, setInputs] = useState([
    {
      key: 'This is Arctic Monkeys',
      value: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4BaAkp',
    },
  ]);
  const [debounceTimers, setDebounceTimers] = useState<NodeJS.Timeout[]>([]);

  const handleAddInput = () => {
    setInputs([...inputs, { key: '', value: '' }]);
  };

  const handleRemoveInput = () => {
    if (inputs.length > 1) {
      const updatedInputs = [...inputs];
      updatedInputs.pop();
      setInputs(updatedInputs);
    }
  };

  const validatePath = (path: string) => {
    let errorString = '';

    if (path.trim() === '') {
      errorString += ' the url cannot be empty';
    } else if (!path.includes('https://open.spotify.com/playlist/')) {
      errorString += ' please provide a valid Spotify url';
    }

    return errorString;
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = value;
    setInputs(updatedInputs);

    if (debounceTimers[index]) {
      clearTimeout(debounceTimers[index]);
    }

    const timerId = setTimeout(async () => {
      const updatedInputsWithName = [...inputs];
      let nameRes = '';

      if (validatePath(updatedInputs[index].value) === '') {
        nameRes = await handlePlaylistNameRequest(
          updatedInputsWithName[index].value
        );
      }

      updatedInputsWithName[index].key =
        nameRes !== '' ? nameRes : `Playlist ${index + 1}`;
      setInputs(updatedInputsWithName);

      const playlistNames = updatedInputsWithName.map(
        (playlist) => playlist.key
      );
      setPlaylistNames(playlistNames);
    }, 3000);

    const newTimers = [...debounceTimers];
    newTimers[index] = timerId;
    setDebounceTimers(newTimers);
  };

  useEffect(() => {
    return () => {
      debounceTimers.forEach((timerId) => {
        if (timerId) {
          clearTimeout(timerId);
        }
      });
    };
  }, []);

  const handlePlaylistNameRequest = async (playlistUrl: string) => {
    let playlistName = '';

    try {
      const res = await backendApi.get('/playlist_name', {
        params: {
          playlist_url: playlistUrl,
        },
      });

      if (res.status === 200) {
        playlistName = res.data.name;
      }
    } catch (error) {
      console.log(error);
    }
    return playlistName;
  };

  const handlePlaylistRequest = async (playlistUrl: string) => {
    const errorString = 'An error has occurred. Please try again later';
    setError('');

    try {
      const res = await backendApi.get('/playlist', {
        params: {
          playlist_url: playlistUrl,
        },
      });

      if (res.status === 200) {
        setData(res.data);
      } else {
        setError(errorString + res.status);
      }
    } catch (error) {
      setError(errorString);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const joinedValues = inputs
      .map((input) => input.value.split('?')[0])
      .filter((input) => input.trim() !== '')
      .join('+');

    const errorString = validatePath(joinedValues);

    if (errorString !== '') {
      setError('Invalid input:' + errorString + '.');
      return;
    }

    setLoading(true);
    setSelectedTracks(null);
    handlePlaylistRequest(joinedValues);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <TextField
          key={index}
          label={input.key === '' ? `Playlist ${index + 1}` : input.key}
          value={input.value}
          disabled={loading}
          onChange={(e) => handleInputChange(e.target.value, index)}
          className={styles.textField}
          fullWidth
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <IconButton onClick={handleAddInput} disabled={inputs.length > 4}>
          <Add />
        </IconButton>
        <IconButton onClick={handleRemoveInput} disabled={inputs.length < 2}>
          <Remove />
        </IconButton>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: '100%' }}
      >
        Submit
      </Button>
    </div>
  );
};
