export function urlSearch(url = location.href) {
  const search = url.split('?')[1]
  if (!search) return {}
  const searchParams = new URLSearchParams(search)
  const result: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    result[key] = value
  })
  return result
}
