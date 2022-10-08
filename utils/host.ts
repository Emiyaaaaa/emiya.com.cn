export function getHost() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://emiya.com.cn'
  } else {
    return 'http://localhost:3000'
  }
}
