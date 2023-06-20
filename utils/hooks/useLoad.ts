import { useEffect, useState } from 'react'

export function useLoadImage(url?: string) {
  if (!url) return { loaded: false, error: false }

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return
    const onLoad = () => setLoaded(true)
    const onError = () => setError(true)

    const img = new Image()
    img.src = url
    img.onload = onLoad
    img.onerror = onError
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [url])

  return { loaded, error }
}
