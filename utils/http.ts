import { RouteKey, ServerSideAPIInterface, RouteString, RequestHooks } from '@/server/route'

// type ParametersExcludeLastParamsType<T extends (...args: any) => any, LastParamsType> = T extends (
//   ...args: infer P,
//   lastParams: LastParamsType,
// ) => any
//   ? P
//   : never

export async function postAPI<T extends RouteKey>(
  api: RouteString<T>,
  ...data: RemoveTypeFormArray<Parameters<ServerSideAPIInterface[T]>, RequestHooks>
): Promise<{ data: PromiseReturnType<ServerSideAPIInterface[T]> }> {
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
  return res.json()
}

export async function getAPI<T extends RouteKey>(
  api: RouteString<T>,
  ...data: RemoveTypeFormArray<Parameters<ServerSideAPIInterface[T]>, RequestHooks>
): Promise<{ data: PromiseReturnType<ServerSideAPIInterface[T]> }> {
  const apistring = `/api/${api}?params=${data.join(',')}`
  return fetch(apistring).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(new Error(`getAPI code(${res.status}): ${res.statusText}`))
    }
    return res.json()
  })
}

export async function get<T = any>(url: string, params?: Record<string, any>, headers?: Record<string, any>) {
  const res = await fetch(`${url}?${new URLSearchParams(params)}`, { headers })
  if (!res.ok) {
    throw new Error(`get 捕获到错误：code(${res.status}) ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
