export function getHost() {
  return 'http://localhost:3000'
  if (process.env.NODE_ENV === 'production') {
    return 'https://emiya.com.cn'
  } else {
    return 'http://localhost:3000'
  }
}
