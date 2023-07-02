import { useEffect, useState } from 'react'

const resultCache = new Map<any, any>()

export default function usePromise<T = any>(func: Promise<T> | (() => Promise<T>)) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (resultCache.has(func)) {
      setData(resultCache.get(func))
      setLoading(false)
      return
    } else {
      const promise = typeof func === 'function' ? func() : func
      promise.then((res) => {
        resultCache.set(func, res)
        setData(res)
        setLoading(false)
      })
    }
  }, [])

  return { data, loading }
}
