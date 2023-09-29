'use client';

import { CorrelationSlider } from '@/components/CorrelationSlider';
import { EdgeBundling } from '@/components/EdgeBundling';
import { Navbar } from '@/components/Navbar';
import { NetworkGraph } from '@/components/NetworkGraph';
import { SelectColor } from '@/components/SelectColor';
import { SelectPalette } from '@/components/SelectPalette';
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
            <div className={styles.settingsRow}>
              <div className={styles.settingsItem}>
                <h2>Color by</h2>
                <SelectColor />
              </div>
              <div className={styles.settingsItem}>
                <h2>Palette</h2>
                <SelectPalette />
              </div>
              <div className={`${styles.settingsItem} ${styles.slider}`}>
                <h2>Correlation</h2>
                <CorrelationSlider />
              </div>
            </div>
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
