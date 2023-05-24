import { DataTable } from '@/components/Table'
import styles from './page.module.css'
import { Scatterplot } from '@/components/Scatterplot'
import { EdgeBundling } from '@/components/EdgeBundling';
import { mockedData } from './data'
import { data } from '@/components/Scatterplot/data'

export default function Home() {
  return (
    <main className={styles.main}>
      <Scatterplot data={data} width={400} height={400} />
      <DataTable rows={mockedData.songs}></DataTable>
      <EdgeBundling />
    </main>
  )
}
