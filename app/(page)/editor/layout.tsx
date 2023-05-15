import React from 'react'
import './index.css'

export const metadata = {
  title: 'Emiya-editor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // return children
  if (process.env.NODE_ENV === 'development') {
    return children
  } else {
    return null
  }
}
