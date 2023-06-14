import { DataContext } from '@/contexts/DataProvider';
import { Skeleton } from '@mui/material';
import { useContext } from 'react';
import { EdgeBundling } from './EdgeBundling';
import { NetworkGraph } from './NetworkGraph';

export const GraphRow = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) {
    return (
      <>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </>
    );
  }

  return data ? (
    <>
      <NetworkGraph data={data} />
      <EdgeBundling data={data} />
    </>
  ) : (
    <></>
  );
};
