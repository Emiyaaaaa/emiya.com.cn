import { useEffect, useState } from 'react'

export function useTimeout(time: number) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setDone(true), time)
    return () => clearTimeout(timeout)
  }, [time])

  return done
}
