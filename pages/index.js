import Head from 'next/head'
import styles from './styles.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Clima</title>
        <meta
          name="description"
          content="Website que exibe o clima de uma cidade escolhida"
        />
        <link rel="icon" href="/sun.png" />
      </Head>
      <main className={`${styles.body}`}></main>
    </div>
  )
}
