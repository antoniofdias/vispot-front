'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { Navbar } from '@/components/Navbar';
import { NetworkGraph } from '@/components/NetworkGraph';
import { DataTable } from '@/components/Table';
import { AppProvider } from '@/contexts/AppProvider';
import { DataProvider } from '@/contexts/DataProvider';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
const ScatterPlot = dynamic(() => import('@/components/Scatterplot'), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Home() {
  return (
    <DataProvider>
      <AppProvider>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.gridContainer}>
            <DataTable className={styles.fullItem} />
            <div className={styles.splitRow}>
              <ScatterPlot />
              <NetworkGraph />
              <EdgeBundling />
            </div>
          </div>
        </main>
      </AppProvider>
    </DataProvider>
  );
}
