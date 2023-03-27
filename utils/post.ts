export default function post<T = Record<string, string | number>>(api: string, data: T) {
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
