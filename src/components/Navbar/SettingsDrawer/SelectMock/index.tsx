'use client';

import { DataContext } from '@/contexts/DataProvider';
import { MockKey, mocks } from '@/mocks';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useContext } from 'react';

export const SelectMock = () => {
  const { currentMock, setMock } = useContext(DataContext);

  const handleChange = (event: SelectChangeEvent) => {
    setMock(event.target.value as MockKey);
  };

  return (
    <FormControl fullWidth size="small">
      <Select value={currentMock} onChange={handleChange}>
        {Object.keys(mocks).map((key) => (
          <MenuItem key={key} value={key}>
            {key.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
