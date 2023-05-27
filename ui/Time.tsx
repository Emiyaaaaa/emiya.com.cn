import { UIProps } from '@/utils/util.typing'
import React from 'react'

type Props = UIProps<{
  date?: Date | null
  format?: string
}>

function transformDate(date: Date, format?: string) {
  if (!format) return date.toLocaleString()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() + 1
  const minute = date.getMinutes() + 1
  const second = date.getSeconds() + 1

  const dateString = format
    .replace('YYYY', year.toString())
    .replace('YY', year.toString().slice(2))
    .replace('MON', date.toLocaleString('en-US', { month: 'long' }))
    .replace('MM', month.toString())
    .replace('DD', day.toString())
    .replace('HH', hour.toString())
    .replace('mm', minute.toString())
    .replace('ss', second.toString())

  return dateString
}

function Time(props: Props) {
  if (!props.date) return null
  return (
    <time className={props.className} dateTime={props.date.toLocaleString()}>
      {transformDate(props.date, props.format)}
    </time>
  )
}

export default Time
