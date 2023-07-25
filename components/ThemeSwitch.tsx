'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { IconLight, IconDark } from '@/ui/icon'

function ThemeSwitch(props?: { width?: number }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme: theme, setTheme } = useTheme()
  const { width } = props ?? {}

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  if (!mounted) return <IconLight width={width}></IconLight>

  return (
    <>
      <meta name="theme-color" content={theme === 'dark' ? '#1c1c1c' : '#f5f5f5'}></meta>
      {theme === 'dark' ? (
        <IconDark width={width} onClick={toggleTheme}></IconDark>
      ) : (
        <IconLight width={width} onClick={toggleTheme}></IconLight>
      )}
    </>
  )
}

export default ThemeSwitch
