import { AppContext } from '@/contexts/AppProvider';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';

export const SelectColor = () => {
  const { selectedAttribute, setSelectedAttribute } = useContext(AppContext);

  const attributes = [
    'duration_ms',
    'danceability',
    'energy',
    'loudness',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo',
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedAttribute(event.target.value as typeof selectedAttribute);
  };

  return (
    <Select
      labelId="color-label"
      id="select-color"
      value={selectedAttribute}
      label="Color by"
      onChange={handleChange}
      fullWidth
    >
      {attributes.map((elem) => {
        return <MenuItem value={elem}>{elem}</MenuItem>;
      })}
    </Select>
  );
};
