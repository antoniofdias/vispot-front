import Slider from '@mui/material/Slider';

interface CustomSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (_: Event, newValue: number | number[]) => void;
}

export default function CustomSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: CustomSliderProps) {
  return (
    <>
      <h5>{label}</h5>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </>
  );
}
