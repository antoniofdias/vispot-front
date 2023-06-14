'use client';

import { GraphRow } from '@/components/GraphRow';
import { SearchBar } from '@/components/SearchBar';
import { DataTable } from '@/components/Table';
import { AppProvider } from '@/contexts/AppProvider';
import { DataContext, DataProvider } from '@/contexts/DataProvider';
import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import styles from './page.module.css';
const ScatterPlot = dynamic(() => import('@/components/Scatterplot'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Home() {
  const { data } = useContext(DataContext);

  return (
    <DataProvider>
      <AppProvider>
        <main className={styles.main}>
          <Stack direction="row" spacing={2}>
            <SearchBar />
            {/* <Button
              onClick={() => setSelectedTrack(null)}
              variant="outlined"
              endIcon={<Replay />}
            >
              Reset
            </Button> */}
          </Stack>
          <DataTable rows={data.songs}></DataTable>
          <ScatterPlot rows={data.songs} />
          <GraphRow data={data} />
        </main>
      </AppProvider>
    </DataProvider>
  );
}
