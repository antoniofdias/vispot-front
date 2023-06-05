'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { DataTable } from '@/components/Table';
import { TrackContext } from '@/context';
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

  return (
    <TrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      <main className={styles.main}>
        <DataTable rows={mockedData.songs}></DataTable>
        <ScatterPlot rows={mockedData.songs} />
        <EdgeBundling data={mockedData} />
      </main>
    </TrackContext.Provider>
  );
}
