'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { IconLight, IconDark } from '@/ui/icon'

function ThemeSwitch(props?: { width?: number }) {
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme, setTheme } = useTheme()

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <MetaThemeColor color={theme === 'dark' ? 'rgb(28,28,28)' : 'rgb(245,245,245)'} ease={{ duration: 200 }}></MetaThemeColor>
      {theme === 'dark' ? (
        <IconDark width={props?.width} onClick={toggleTheme}></IconDark>
      ) : (
        <IconLight width={props?.width} onClick={toggleTheme}></IconLight>
      )}
    </>
  )
}

function MetaThemeColor(props: { color: string; ease?: { duration: number /** ms */ } }) {
  const themeColorRef = React.useRef<HTMLMetaElement>(null)

  useEffect(() => {
    const meta = themeColorRef.current
    if (!meta) return
    const { ease, color: targetColor } = props
    // clear theme color
    if (!targetColor) {
      meta.setAttribute('content', '')
      return
    }
    // set theme color
    if (!ease) {
      meta.setAttribute('content', targetColor)
      return
    }
    // set theme color with ease
    const currentRGB = meta
      .getAttribute('content')
      ?.match(/\d+/g)
      ?.map((v) => parseInt(v))
    if (!currentRGB) meta.setAttribute('content', targetColor)
    const targetRGB = targetColor.match(/\d+/g)?.map((v) => parseInt(v))
    if (!targetRGB) return
    if (targetRGB.every((v, i) => v === currentRGB?.[i])) return
    const { duration } = ease
    const startTime = performance.now()
    const endTime = startTime + duration
    const startRGB = currentRGB
    const endRGB = targetRGB
    const update = () => {
      const now = performance.now()
      const progress = (now - startTime) / duration

      const currentRGB = startRGB?.map((v, i) => Math.round(v + (endRGB[i]! - v) * progress))
      // console.log(currentRGB)
      meta.setAttribute('content', `rgb(${currentRGB?.join(',')})`)
      if (now < endTime) {
        requestAnimationFrame(update)
      } else {
        meta.setAttribute('content', targetColor)
      }
    }
    requestAnimationFrame(update)
  }, [themeColorRef.current, props.color])

  return (
    <>
      <meta name="theme-color" ref={themeColorRef}></meta>
    </>
  )
}

export default ThemeSwitch
