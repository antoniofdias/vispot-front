'use client'

import { useState } from 'react';
import { DataTable } from '@/components/Table'
import styles from './page.module.css'
import { Scatterplot } from '@/components/Scatterplot'
import { EdgeBundling } from '@/components/EdgeBundling';
import { mockedData } from './data'
import { data } from '@/components/Scatterplot/data'
import { TrackContext } from '@/context';

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
  )
}
