import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  console.log('Home')
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
