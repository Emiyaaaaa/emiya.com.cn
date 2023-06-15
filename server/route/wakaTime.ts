import { stream2Object } from '@/utils/stream2String'

interface WakaTimeStats {
  status: 'ok' | 'error'
  total_seconds: number
  languages: Array<{
    name: string
    percent: number
    text: string
    total_seconds: number
  }>
}

export async function getWakaTimeStats(): Promise<WakaTimeStats> {
  return fetch('https://wakatime.com/api/v1/users/Emiyaaaaa/stats', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => stream2Object(response.body))
    .then((data) => data.data)
}

export default {
  getWakaTimeStats,
}
