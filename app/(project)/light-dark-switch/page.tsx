import Head from 'next/head'
import React, { use } from 'react'
import type { Metadata } from 'next'
import LightDarkSwitch from '@/components/LightDarkSwitch'

export const metadata: Metadata = {
  title: 'light-dark-switch',
}

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="w-44">
        <LightDarkSwitch />
      </div>
      <div className="w-56 max-w-full">
        <video src="/image/theme.mp4" controls></video>
      </div>
    </div>
  )
}

export default Home
