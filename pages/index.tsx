import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // React.useEffect(() => {
  //   fetch('/api/getArticle?title=en-title-1')
  //     .then((a) => a.json())
  //     .then((a) => console.log(a))
  // }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Emiya's HomePage</title>
        <meta name="description" content="This is Emiya's HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Emiya's HomePage</h1>
        <h1>Building and Coming soon</h1>
      </main>
    </div>
  )
}

export default Home
