import React from 'react'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/app/index.css'
import '@/components/index.css'
import Head from '@/components/Head'
import { Beian } from '@/components/Beian'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      </head>
      <body>
        <div className="flex h-full w-full flex-col">
          <Head />
          {children}
          <div className="relative bottom-0 mb-2 mt-auto">
            <Beian />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
