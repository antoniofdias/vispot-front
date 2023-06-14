import { EdgeBundling } from './EdgeBundling';
import { NetworkGraph } from './NetworkGraph';

export const GraphRow = ({ data }: any) => {
  return data ? (
    <>
      <NetworkGraph data={data} />
      <EdgeBundling data={data} />
    </>
  ) : (
    <></>
  );
};
