'use client'
import { Duration } from '@/ui/Time'
import { getAPI } from '@/utils/http'
import React from 'react'
import './WakaTime.scss'
import usePromise from '@/utils/hooks/usePromise'
import classNames from 'classnames'

export function WakaTime() {
  const { data, loading } = usePromise(getAPI('getWakaTimeStats'))

  if (data && data?.languages.length <= 3) return null

  return (
    <div className="space-y-1 text-xs">
      {new Array(3).fill(null).map((_, index) => {
        const item = data?.languages[index]
        return (
          <div
            className={classNames('language', { loading })}
            style={{
              backgroundSize: item
                ? `${index === 0 ? 100 : Math.round((item.total_seconds / data.languages[0]!.total_seconds) * 100)}% 100%`
                : '0% 100%',
            }}
            data-tag={item?.name.toLowerCase()}
            key={index}
          >
            <span>{item?.name}</span>
            <Duration second={item?.total_seconds} className="float-right" format="(hh hour) (mm min)" />
          </div>
        )
      })}
    </div>
  )
}
