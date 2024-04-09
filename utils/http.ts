import { RouteKey, ServerSideAPIInterface, RouteString, RequestHooks } from '@/server/route'

export type APIResult<T extends RouteKey> = PromiseReturnType<ServerSideAPIInterface[T]>

export async function postAPI<T extends RouteKey>(
  api: RouteString<T>,
  ...data: RemoveTypeFormArray<Parameters<ServerSideAPIInterface[T]>, RequestHooks>
): Promise<APIResult<T>> {
  const res = await fetch(`/api/${api}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })
  if (res.status !== 200) {
    throw new Error(`postAPI code(${res.status}): ${res.statusText}`)
  }
  return res.json().then((data) => data.data)
}

export async function getAPI<T extends RouteKey>(
  api: RouteString<T>,
  ...data: RemoveTypeFormArray<Parameters<ServerSideAPIInterface[T]>, RequestHooks>
): Promise<APIResult<T>> {
  const params = data.length > 0 ? `?params=${data.join(',')}` : ''
  const url = `/api/${api}${params}`

  return fetch(url, {}).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(new Error(`GET ${url} error, code: ${res.status} ${res.statusText}`))
    }
    return res.json().then((data) => data.data)
  })
}

export async function get<T = any>(url: string, params?: Record<string, any>, headers?: Record<string, any>) {
  const res = await fetch(`${url}?${new URLSearchParams(params)}`, { headers })
  if (!res.ok) {
    throw new Error(`get 捕获到错误：code(${res.status}) ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
