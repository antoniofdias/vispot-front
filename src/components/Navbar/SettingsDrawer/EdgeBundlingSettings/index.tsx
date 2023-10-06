import CustomSlider from '@/components/CustomSlider';
import { AppContext } from '@/contexts/AppProvider';
import { useContext } from 'react';

const formatLabel = (label: string) => {
  const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

  return formattedLabel.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const EdgeBundlingSettings = () => {
  const { edgeBundlingSignals, setEdgeBundlingSignals } =
    useContext(AppContext);

  const handleChange =
    (parameter: keyof typeof edgeBundlingSignals) =>
    (_event: Event, newValue: number | number[]) => {
      setEdgeBundlingSignals({ [parameter]: newValue as number });
    };

  const parameters = [
    { name: 'tension', min: 0, max: 1, step: 0.01 },
    { name: 'radius', min: 20, max: 400, step: 5 },
    { name: 'extent', min: 0, max: 360, step: 1 },
    { name: 'rotate', min: 0, max: 360, step: 1 },
    { name: 'textSize', min: 2, max: 20, step: 1 },
    { name: 'textOffset', min: 0, max: 10, step: 1 },
  ];

  return (
    <div>
      {parameters.map((parameter) => (
        <CustomSlider
          key={parameter.name}
          label={formatLabel(parameter.name)}
          value={
            edgeBundlingSignals[
              parameter.name as keyof typeof edgeBundlingSignals
            ] as number
          }
          min={parameter.min}
          max={parameter.max}
          step={parameter.step}
          onChange={handleChange(
            parameter.name as keyof typeof edgeBundlingSignals
          )}
        />
      ))}
    </div>
  );
};
