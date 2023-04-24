import React from 'react'

export const metadata = {
  title: 'Emiya-editor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'development') {
    return children
  } else {
    return null
  }
}
