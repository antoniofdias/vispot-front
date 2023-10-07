import { Add, Remove } from '@mui/icons-material';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';

import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { backendApi } from '@/services/api';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

export const AddPlaylist = () => {
  const { setData, loading, setLoading } = useContext(DataContext);
  const { setSelectedTrack } = useContext(AppContext);
  const [inputs, setInputs] = useState(['']);

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveInput = () => {
    if (inputs.length > 1) {
      const updatedInputs = [...inputs];
      updatedInputs.pop(); // Remove the last input field
      setInputs(updatedInputs);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handlePlaylistRequest = async (playlistUrl: string) => {
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
    } catch (error) {
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const joinedValues = inputs
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
      toast.error('Invalid input:' + errorString + '.');
      return;
    }

    //TODO integrate with multiple playlist requests
    if (joinedValues.includes('+')) {
      alert(`Joined values: ${joinedValues}`);
    } else {
      setLoading(true);
      setSelectedTrack(null);
      handlePlaylistRequest(joinedValues);
    }
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <TextField
          key={index}
          label={`Playlist ${index + 1}`}
          value={input}
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
