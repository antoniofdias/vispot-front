import { AppContext } from '@/contexts/AppProvider';
import { Slider } from '@mui/material';
import { useContext } from 'react';

export const CorrelationSlider = () => {
  const { correlationRange, setCorrelationRange } = useContext(AppContext);

  const marks: { value: number; label?: string }[] = [];

  marks.push({ value: 0, label: '0' });

  for (let i = 0.1; i < 1; i += 0.1) {
    const obj = { value: i };
    marks.push(obj);
  }

  marks.push({ value: 1.0, label: '1.0' });

  const handleChange = (_: Event, newRange: number | number[]) => {
    setCorrelationRange(newRange as number[]);
  };

  return (
    <Slider
      getAriaLabel={() => 'Correlation range'}
      value={correlationRange}
      onChange={handleChange}
      valueLabelDisplay="auto"
      step={0.1}
      max={1}
      min={0}
      marks={marks}
    />
  );
};
