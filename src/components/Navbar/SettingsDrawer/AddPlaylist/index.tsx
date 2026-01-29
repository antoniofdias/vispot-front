'use client';

import { Add, Remove } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import styles from './styles.module.css';

const API_DISABLED_REASON =
  'The API integration used here has been discontinued 🫤';

const API_DOCS_URL =
  'https://github.com/antoniofdias/vispot-back/blob/main/README.md';

const DisabledApiTooltip = ({ children }: { children: ReactNode }) => (
  <Tooltip
    arrow
    placement="top"
    title={
      <div>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {API_DISABLED_REASON}
        </Typography>
        <Link
          href={API_DOCS_URL}
          target="_blank"
          rel="noopener"
          underline="hover"
          color="inherit"
          sx={{ textAlign: 'right', display: 'block' }}
        >
          See more
        </Link>
      </div>
    }
  >
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </span>
  </Tooltip>
);

export const AddPlaylist = () => {
  const { setData, loading, setLoading, setError, setPlaylistNames } =
    useContext(DataContext);
  const { setSelectedTracks } = useContext(AppContext);

  const [inputs] = useState([
    {
      key: 'This is Arctic Monkeys',
      value: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4BaAkp',
    },
  ]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      {inputs.map((input, index) => (
        <TextField
          key={index}
          label={input.key}
          value={input.value}
          disabled
          className={styles.textField}
          fullWidth
        />
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <DisabledApiTooltip>
          <IconButton disabled>
            <Add />
          </IconButton>
        </DisabledApiTooltip>

        <DisabledApiTooltip>
          <IconButton disabled>
            <Remove />
          </IconButton>
        </DisabledApiTooltip>
      </div>

      <DisabledApiTooltip>
        <Button
          variant="contained"
          color="primary"
          disabled
          sx={{ width: '100%' }}
        >
          Submit
        </Button>
      </DisabledApiTooltip>
    </div>
  );
};
