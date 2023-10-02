'use client';

import { EdgeBundling } from '@/components/EdgeBundling';
import { Navbar } from '@/components/Navbar';
import { NetworkGraph } from '@/components/NetworkGraph';
import { SettingsAccordion } from '@/components/SettingsAccordion';
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
            <SettingsAccordion />
            <div className={styles.splitRow}>
              <div className={styles.splitItem}>
                <h2>Scatter Plot</h2>
                <hr />
                <ScatterPlot />
              </div>
              <div className={styles.splitItem}>
                <h2>Network Graph</h2>
                <hr />
                <NetworkGraph />
              </div>
              <div className={styles.splitItem}>
                <h2>Edge Bundling</h2>
                <hr />
                <EdgeBundling />
              </div>
            </div>
            <DataTable className={styles.fullItem} />
          </div>
        </main>
      </AppProvider>
    </DataProvider>
  );
}
