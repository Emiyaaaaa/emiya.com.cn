import { APIResult, getAPI } from '@/utils/http'
import React from 'react'

let wakaTimeData: APIResult<'getWakaTimeStats'> | undefined
export async function getWakaTimeStats() {
  if (!wakaTimeData) {
    wakaTimeData = await getAPI('getWakaTimeStats')
  }
  return wakaTimeData
}

export function WakaTime() {
  // const data = getWakaTimeStats()
  return <div data-component="wakaTime"></div>
}
