import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';

import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { backendApi } from '@/services/api';
import styles from './styles.module.css';

export const AddPlaylist = () => {
  const { setData, loading, setLoading, error, setError } =
    useContext(DataContext);
  const { setSelectedTrack } = useContext(AppContext);
  const [inputs, setInputs] = useState([
    {
      key: 'This is Arctic Monkeys',
      value: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4BaAkp',
    },
  ]);

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

  const handleInputChange = (value: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = value;
    setInputs(updatedInputs);
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
      .map((input) => input.value)
      .filter((input) => input.trim() !== '')
      .join('+');

    let errorString = '';

    if (joinedValues.trim() === '') {
      errorString += ' the url cannot be empty';
    } else {
      const hasQueryParams =
        joinedValues.includes('?') || joinedValues.includes('&');
      if (
        !joinedValues.includes('https://open.spotify.com/playlist/') ||
        hasQueryParams
      ) {
        errorString += ' please provide a valid Spotify url';
        if (hasQueryParams) {
          errorString += " (check if no '?' or '&' have been pasted)";
        }
      }
    }

    if (errorString !== '') {
      setError('Invalid input:' + errorString + '.');
      return;
    }

    setLoading(true);
    setSelectedTrack(null);
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
        <IconButton onClick={handleAddInput}>
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
