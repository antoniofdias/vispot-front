import { AppContext } from '@/contexts/AppProvider';
import { DataContext } from '@/contexts/DataProvider';
import { Skeleton, Slider } from '@mui/material';
import { useContext } from 'react';
import { EdgeBundling } from './EdgeBundling';
import { NetworkGraph } from './NetworkGraph';

export const GraphRow = () => {
  const { data, loading } = useContext(DataContext);
  const { correlationRange, setCorrelationRange } = useContext(AppContext);

  if (loading) {
    return (
      <>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </>
    );
  }

  const handleChange = (_: Event, newRange: number | number[]) => {
    setCorrelationRange(newRange as number[]);
  };

  return data ? (
    <>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={correlationRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={0.1}
        max={1}
        min={0}
      />
      <NetworkGraph />
      <EdgeBundling />
    </>
  ) : (
    <></>
  );
};
