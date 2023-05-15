/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import type { Metadata } from 'next'

import styles from '@/styles/Home.module.css'

export const metadata: Metadata = {
  title: "Emiya's HomePage",
  description: "This is Emiya's HomePage",
}

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Emiya's HomePage</h1>
        <h1 className={styles.description}>Creating and Coming soooooooon</h1>
      </main>
    </div>
  )
}

export default Home
