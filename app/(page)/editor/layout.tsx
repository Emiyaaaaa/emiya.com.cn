import React from 'react'

export const metadata = {
  title: 'Emiya-editor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children

  // if (process.env.NODE_ENV === 'development' || location.search.includes('preview')) {
  //   return children
  // } else {
  //   return null
  // }
}
