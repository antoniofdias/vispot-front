'use client';

import { GraphRow } from '@/components/GraphRow';
import { Navbar } from '@/components/Navbar';
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
          <GraphRow />
        </main>
      </AppProvider>
    </DataProvider>
  );
}
