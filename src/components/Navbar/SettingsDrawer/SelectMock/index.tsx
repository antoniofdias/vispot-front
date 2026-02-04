'use client';

import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useContext, useState } from 'react';

import { DataContext } from '@/contexts/DataProvider';
import { mocks } from '@/mocks';
import { backendApi } from '@/services/api';

const ALL_DATASETS = Object.keys(mocks);

export const SelectMock = () => {
  const { setData, setLoading, setError } = useContext(DataContext);

  const [selectedMocks, setSelectedMocks] = useState<string[]>(['default']);

  const fetchMockMix = async (playlists: string[]) => {
    if (!playlists.length) return;

    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      playlists.forEach((p) => params.append('playlist', p));

      const res = await backendApi.get(`/mock?${params.toString()}`);

      if (res.status === 200) {
        setData(res.data);
      } else {
        setError(`Mock request failed: ${res.status}`);
      }
    } catch (err) {
      setError('Failed to fetch mocked playlists');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedMocks>) => {
    const {
      target: { value },
    } = event;

    const newSelection = typeof value === 'string' ? value.split(',') : value;

    setSelectedMocks(newSelection);
    fetchMockMix(newSelection);
  };

  return (
    <FormControl fullWidth size="small">
      <Select
        multiple
        value={selectedMocks}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected.join(', ').toUpperCase()}
      >
        {ALL_DATASETS.map((dataset) => (
          <MenuItem key={dataset} value={dataset}>
            <Checkbox checked={selectedMocks.indexOf(dataset) > -1} />
            <ListItemText primary={dataset.toUpperCase()} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
