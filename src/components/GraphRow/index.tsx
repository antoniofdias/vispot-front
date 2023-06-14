import { DataContext } from '@/contexts/DataProvider';
import { useContext } from 'react';
import { EdgeBundling } from './EdgeBundling';
import { NetworkGraph } from './NetworkGraph';

export const GraphRow = () => {
  const { data } = useContext(DataContext);

  return data ? (
    <>
      <NetworkGraph data={data} />
      <EdgeBundling data={data} />
    </>
  ) : (
    <></>
  );
};
