import { AppContext } from '@/contexts/AppProvider';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';

export const SelectPalette = () => {
  const { selectedPalette, setSelectedPalette } = useContext(AppContext);

  const palettes = ['viridis', 'cividis', 'jet', 'hot'];

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPalette(event.target.value as typeof selectedPalette);
  };

  return (
    <Select
      labelId="color-label"
      id="select-color"
      value={selectedPalette}
      label="Color by"
      onChange={handleChange}
    >
      {palettes.map((palette) => {
        return <MenuItem value={palette}>{palette}</MenuItem>;
      })}
    </Select>
  );
};
