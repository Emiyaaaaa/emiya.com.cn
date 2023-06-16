import React from 'react'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Head from '@/components/Head'
import '@/tailwind.theme.scss'
import './layout.scss'
import { Providers } from './Providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#1a5d8d"></meta>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <base target="_blank"></base>
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex h-full w-full flex-col">
            <Head />
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
