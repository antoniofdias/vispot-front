'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { Scatterplot } from '@/components/Scatterplot';
import { data } from '@/components/Scatterplot/data';
import { DataTable } from '@/components/Table';
import { TrackContext } from '@/context';
import { useState } from 'react';
import { mockedData } from './data';
import styles from './page.module.css';

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  return (
    <TrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      <main className={styles.main}>
        <DataTable rows={mockedData.songs}></DataTable>
        <Scatterplot data={data} width={400} height={400} />
        <EdgeBundling data={mockedData} />
      </main>
    </TrackContext.Provider>
  );
}
