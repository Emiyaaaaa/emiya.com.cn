export function getCookie(name: string) {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (!key) continue
    if (key.trim() === name) {
      return value
    }
  }
  return ''
}
