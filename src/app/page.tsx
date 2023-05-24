'use client'

import { DataTable } from '@/components/Table'
import styles from './page.module.css'
import { Scatterplot } from '@/components/Scatterplot'
import { EdgeBundling } from '@/components/EdgeBundling';
import { mockedData } from './data'
import { data } from '@/components/Scatterplot/data'
import flare from '@/components/EdgeBundling/flare.json'
import flareDependencies from '@/components/EdgeBundling/flare-dependencies.json'
// import { useEffect, useState } from 'react';
// import { backendApi } from '@/services/api';

export default function Home() {
  // const [sampleText, setSampleText] = useState([]);
  // useEffect(() => {
  //   backendApi.get('/playlist', {
  //     params: {
  //       playlist_url: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4BaAkp',
  //     },
  //   })
  //   .then(res => setSampleText(res.data))
  //   .catch(error => {
  //     // Handle error
  //     console.error(error);
  //   });
  // }, []);

  return (
    <main className={styles.main}>
      {/* <h1>{JSON.stringify(sampleText)}</h1> */}
      <DataTable rows={mockedData.songs}></DataTable>
      <Scatterplot data={data} width={400} height={400} />
      <EdgeBundling flare={flare} flareDependencies={flareDependencies} />
    </main>
  )
}
