import { AppContext } from '@/contexts/AppProvider';
import { Slider } from '@mui/material';
import { useContext } from 'react';

export const CorrelationSlider = () => {
  const { correlationRange, setCorrelationRange } = useContext(AppContext);

  const handleChange = (_: Event, newRange: number | number[]) => {
    setCorrelationRange(newRange as number[]);
  };

  return (
    <div style={{ width: 500 }}>
      <Slider
        getAriaLabel={() => 'Correlation range'}
        value={correlationRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={0.1}
        max={1}
        min={0}
      />
    </div>
  );
};
