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
          <DataTable />
          <ScatterPlot />
          <NetworkGraph />
          <EdgeBundling />
        </main>
      </AppProvider>
    </DataProvider>
  );
}
