import CustomizedTables from '@/components/Table'
import styles from './page.module.css'
import { data } from "@/components/Scatterplot/data";
import { Scatterplot } from '@/components/Scatterplot'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <CustomizedTables></CustomizedTables>
      <Scatterplot data={data} width={400} height={400}></Scatterplot>
    </main>
  )
}
