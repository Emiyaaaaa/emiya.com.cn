/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import React, { use } from 'react'
import type { Metadata } from 'next'

import styles from '../styles/Home.module.css'

export const metadata: Metadata = {
  title: "Emiya's HomePage",
}

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="This is Emiya's HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Emiya's HomePage</h1>
        <h1>Creating and Coming soooooooon</h1>
      </main>
    </div>
  )
}

export default Home
