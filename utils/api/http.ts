import { getHost } from '../host'

export default async function get<T = unknown>(API: string, data?: Record<string, any>) {
  // get hash
  let HASH = '?'
  if (data) {
    Object.keys(data).forEach((key) => {
      HASH += `${key}=${data[key]}&`
    })
  }
  HASH = HASH.slice(0, -1)

  // get HOST
  const HOST = getHost()

  console.log(HOST)

  const response = await fetch(`${HOST}/api/${API}${HASH}`, {
    method: 'GET',
  })
  const responseJson = (await response.json()) as {
    code: number
    data?: T | null | undefined
    error?: string | null | undefined
  }

  return responseJson
}
