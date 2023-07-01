'use client'
import { Duration } from '@/ui/Time'
import { APIResult, getAPI } from '@/utils/http'
import React, { use } from 'react'
import './WakaTime.scss'

let wakaTimeData: APIResult<'getWakaTimeStats'> | undefined
export async function getWakaTimeStats() {
  if (!wakaTimeData) wakaTimeData = await getAPI('getWakaTimeStats')
  return wakaTimeData
}

export function WakaTime() {
  const data = use(getWakaTimeStats())
  return (
    <div className="space-y-1 text-xs">
      {data.languages.slice(0, 3).map((item, index) => (
        <div
          className="language"
          style={{
            backgroundSize: `${index === 0 ? 100 : Math.round((item.total_seconds / data.languages[0]!.total_seconds) * 100)}% 100%`,
          }}
          data-tag={item.name.toLowerCase()}
          key={index}
        >
          <span>{item.name}</span>
          <Duration second={item.total_seconds} className="float-right" format="(hh hour) (mm min)" />
        </div>
      ))}
    </div>
  )
}
