import type { NextPage } from 'next'
import Head from 'next/head'
import React, {use} from 'react'
import { getTechBlogList } from '../server'
import db from '../server/database'
import styles from '../styles/Home.module.css'

console.log(1)
const Home: NextPage = () => {
  console.log('Home')
  const b = use(getTechBlogList())
  return (
    <div className={styles.container}>
      <Head>
        <title>Emiya's HomePage</title>
        <meta name="description" content="This is Emiya's HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Emiya's HomePage</h1>
        <h1>Creating and Coming soon {b.length}</h1>
      </main>
    </div>
  )
}

export default Home