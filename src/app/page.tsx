import { DataTable } from '@/components/Table'
import styles from './page.module.css'
import { Scatterplot } from '@/components/Scatterplot'
import { mockedData } from './data'
import { data } from '@/components/Scatterplot/data'

export default function Home() {
  return (
    <main className={styles.main}>
      <DataTable rows={mockedData.songs}></DataTable>
      <Scatterplot data={data} width={400} height={400}></Scatterplot>
    </main>
  )
}
