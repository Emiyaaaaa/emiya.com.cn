import React from 'react'

function transformDate(date: Date) {
  // transform date to y/m/d h:m:s
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function Time({ date }: { date: Date }) {
  return <time dateTime={date.toLocaleString()}>{transformDate(date)}</time>
}

export default Time
