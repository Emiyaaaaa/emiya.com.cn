import type { ServerSideAPIInterface, RouteKey, RouteString } from '@/server/route'

export async function post<T extends RouteKey>(
  api: RouteString<T>,
  ...data: Parameters<ServerSideAPIInterface[T]>
): Promise<ReturnType<ServerSideAPIInterface[T]>> {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
  if (!res.ok) {
    throw new Error(`post 捕获到错误： ${res.statusText}`)
  }
  return res.json()
}

export async function get<T extends RouteKey>(
  api: RouteString<T>,
  ...data: Parameters<ServerSideAPIInterface[T]>
): Promise<{ data: PromiseResult<ReturnType<ServerSideAPIInterface[T]>> }> {
  const apistring = `${api}?data=${data.join(',')}`
  return fetch(apistring).then((res) => {
    if (!res.ok) {
      throw new Error(`get 捕获到错误：code(${res.status}) ${res.statusText}`)
    }
    return res.json()
  })
}
