import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Circle } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import { ColoredSquare } from './ColoredSquare';
import { DiscreteColorBar } from './DiscreteColorbar';
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
  plasma: [
    '#380499',
    '#6100a6',
    '#6100a6',
    '#a92395',
    '#c43f7e',
    '#db5b67',
    '#ed7b51',
    '#fa9d3a',
    '#fdc626',
    '#f0f623',
  ],
  copper: [
    '#19100a',
    '#382316',
    '#563622',
    '#754a2f',
    '#955e3c',
    '#b47248',
    '#d48655',
    '#f49a62',
    '#ffaf6f',
    '#ffc57d',
  ],
};

const PaletteCircle = ({ palette }: { palette: string }) => (
  <>
    <svg width={0} height={0}>
      <linearGradient id={palette} x1={1} y1={0} x2={1} y2={1}>
        {palettes[
          palette as 'viridis' | 'cividis' | 'jet' | 'hot' | 'plasma' | 'copper'
        ].map((color, index) => (
          <stop
            key={index}
            offset={`${
              (100 * (index + 1)) /
              palettes[
                palette as
                  | 'viridis'
                  | 'cividis'
                  | 'jet'
                  | 'hot'
                  | 'plasma'
                  | 'copper'
              ].length
            }%`}
            stopColor={color}
          />
        ))}
      </linearGradient>
    </svg>
    <Circle sx={{ fill: `url(#${palette})`, fontSize: 18 }} />
  </>
);

export const SelectPalette = () => {
  const {
    selectedAttribute,
    selectedPalette,
    setSelectedPalette,
    hasMoreThanOnePlaylist,
  } = useContext(AppContext);
  const { playlistNames } = useContext(DataContext);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPalette(event.target.value as typeof selectedPalette);
  };

  return (
    <>
      {selectedAttribute === 'playlist' && hasMoreThanOnePlaylist ? (
        <>
          <h5>Labels</h5>
          {playlistNames.map((playlistName, index) => (
            <div className={styles.menuItem}>
              <ColoredSquare index={index} />
              <p>{playlistName}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <h5>Palette</h5>
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
      )}
    </>
  );
};
