'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { NetworkGraph } from '@/components/NetworkGraph';
import { SearchBar } from '@/components/SearchBar';
import { DataTable } from '@/components/Table';
import { ApiResponseType } from '@/components/Table/types';
import { DataContext } from '@/contexts/DataContext';
import { TrackContext } from '@/contexts/TrackContext';
import { Replay } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { mockedData } from './data';
import styles from './page.module.css';
const ScatterPlot = dynamic(() => import('@/components/Scatterplot'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [data, setData] = useState<ApiResponseType>(mockedData);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <TrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
        <main className={styles.main}>
          <Stack direction="row" spacing={2}>
            <SearchBar />
            <Button
              onClick={() => setSelectedTrack(null)}
              variant="outlined"
              endIcon={<Replay />}
            >
              Reset
            </Button>
          </Stack>
          <DataTable rows={data.songs}></DataTable>
          <ScatterPlot rows={data.songs} />
          <NetworkGraph data={data} />
          <EdgeBundling data={data} />
        </main>
      </TrackContext.Provider>
    </DataContext.Provider>
  );
}
