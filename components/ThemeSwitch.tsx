'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { IconLight, IconDark } from '@/ui/icon'

function ThemeSwitch(props?: { width?: number }) {
  // const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  // if (!mounted) {
  //   return null
  // }

  return (
    <>
      <meta name="theme-color" content="#f5f5f5" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#1c1c1c" media="(prefers-color-scheme: dark)" />
      {theme === 'dark' ? (
        <IconDark width={props?.width} onClick={toggleTheme}></IconDark>
      ) : (
        <IconLight width={props?.width} onClick={toggleTheme}></IconLight>
      )}
    </>
  )
}

export default ThemeSwitch
