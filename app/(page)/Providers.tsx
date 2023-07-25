// app/providers.jsx

'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

export function Providers(props: React.PropsWithChildren) {
  return <ThemeProvider defaultTheme="dark">{props.children}</ThemeProvider>
}
