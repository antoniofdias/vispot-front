import { AppContext } from '@/contexts/AppProvider';
import { Circle } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import styles from './styles.module.css';

const PaletteCircle = ({ palette }: any) => (
  <>
    <svg width={0} height={0}>
      <linearGradient id="viridis" x1={1} y1={0} x2={1} y2={1}>
        <stop offset="0%" stop-color="rgb(253, 231, 37)" />
        <stop offset="25%" stop-color="#fde725" />
        <stop offset="50%" stop-color="rgb(94, 201, 98)" />
        <stop offset="75%" stop-color="#5ec962" />
        <stop offset="100%" stop-color="rgb(33, 145, 140)" />
      </linearGradient>
      <linearGradient id="cividis" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgb(33, 145, 140)" />
        <stop offset="25%" stop-color="#21918c" />
        <stop offset="50%" stop-color="rgb(59, 82, 139)" />
        <stop offset="75%" stop-color="#3b528b" />
        <stop offset="100%" stop-color="rgb(68, 1, 84)" />
      </linearGradient>
      <linearGradient id="jet" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00007F" />
        <stop offset="12.5%" stop-color="#0000FF" />
        <stop offset="25%" stop-color="#007FFF" />
        <stop offset="37.5%" stop-color="#00FFFF" />
        <stop offset="50%" stop-color="#7FFF7F" />
        <stop offset="62.5%" stop-color="#FFFF00" />
        <stop offset="75%" stop-color="#FF7F00" />
        <stop offset="87.5%" stop-color="#FF0000" />
        <stop offset="100%" stop-color="#7F0000" />
      </linearGradient>
      <linearGradient id="hot" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgb(252, 255, 164)" />
        <stop offset="25%" stop-color="#fcffa4" />
        <stop offset="50%" stop-color="rgb(249, 142, 9)" />
        <stop offset="75%" stop-color="#f98e09" />
        <stop offset="100%" stop-color="rgb(188, 55, 84)" />
      </linearGradient>
    </svg>
    <Circle sx={{ fill: `url(#${palette})`, fontSize: 18 }} />
  </>
);

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
        return (
          <MenuItem value={palette}>
            <div className={styles.menuItem}>
              <PaletteCircle palette={palette} />
              {' ' + palette}
            </div>
          </MenuItem>
        );
      })}
    </Select>
  );
};
