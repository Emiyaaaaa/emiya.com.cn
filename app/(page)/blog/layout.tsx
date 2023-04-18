import React from 'react'
import Head from '@/components/Head'
import './index.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <Head></Head>
      {children}
    </div>
  )
}
