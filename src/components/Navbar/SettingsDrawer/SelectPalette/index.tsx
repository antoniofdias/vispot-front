import { AppContext } from '@/contexts/AppProvider';
import { Circle } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import { DiscreteColorBar } from '../DiscreteColorbar';
import styles from './styles.module.css';

const palettes = {
  viridis: [
    '#440154',
    '#482878',
    '#3e4989',
    '#31688e',
    '#26828e',
    '#1f9e89',
    '#35b779',
    '#6ece58',
    '#b5de2b',
    '#fde725',
  ],
  cividis: [
    '#00224e',
    '#123570',
    '#3b496c',
    '#575d6d',
    '#707173',
    '#8a8678',
    '#a59c74',
    '#c3b369',
    '#e1cc55',
    '#fee838',
  ],
  jet: [
    '#00007F',
    '#0000FF',
    '#007FFF',
    '#00FFFF',
    '#7FFF7F',
    '#FFFF00',
    '#FF7F00',
    '#FF0000',
    '#7F0000',
  ],
  hot: [
    '#0a0101',
    '#0a0101',
    '#9d0706',
    '#e82204',
    '#f2620c',
    '#fba60a',
    '#ffd214',
    '#ffe06f',
    '#ffeba9',
    '#fffdf7',
  ],
};

const PaletteCircle = ({ palette }: { palette: string }) => (
  <>
    <svg width={0} height={0}>
      <linearGradient id={palette} x1={1} y1={0} x2={1} y2={1}>
        {palettes[palette as 'viridis' | 'cividis' | 'jet' | 'hot'].map(
          (color, index) => (
            <stop
              offset={`${
                (100 * (index + 1)) /
                palettes[palette as 'viridis' | 'cividis' | 'jet' | 'hot']
                  .length
              }%`}
              stopColor={color}
            />
          )
        )}
      </linearGradient>
    </svg>
    <Circle sx={{ fill: `url(#${palette})`, fontSize: 18 }} />
  </>
);

export const SelectPalette = () => {
  const { selectedPalette, setSelectedPalette } = useContext(AppContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPalette(event.target.value as typeof selectedPalette);
  };

  return (
    <>
      <Select
        labelId="color-label"
        id="select-color"
        value={selectedPalette}
        label="Color by"
        onChange={handleChange}
        fullWidth
      >
        {Object.keys(palettes).map((palette) => {
          return (
            <MenuItem key={palette} value={palette}>
              <div className={styles.menuItem}>
                <PaletteCircle palette={palette} />
                {' ' + palette}
              </div>
            </MenuItem>
          );
        })}
      </Select>
      <DiscreteColorBar
        colors={
          palettes[selectedPalette as 'viridis' | 'cividis' | 'jet' | 'hot']
        }
      />
    </>
  );
};
