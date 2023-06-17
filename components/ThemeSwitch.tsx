'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { IconLight, IconDark } from '@/ui/icon'

function ThemeSwitch(props?: { width?: number }) {
  const { resolvedTheme: theme, setTheme } = useTheme()

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  return (
    <>
      <meta name="theme-color" content={theme === 'dark' ? '#1c1c1c' : '#f5f5f5'}></meta>
      {theme === 'dark' ? (
        <IconDark width={props?.width} onClick={toggleTheme}></IconDark>
      ) : (
        <IconLight width={props?.width} onClick={toggleTheme}></IconLight>
      )}
    </>
  )
}

export default ThemeSwitch
