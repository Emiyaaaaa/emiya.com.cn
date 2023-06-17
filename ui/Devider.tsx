import { UIProps } from '@/utils/util.typing'
import classNames from 'classnames'
import React from 'react'

export function Devider(
  props: UIProps<{
    h?: boolean
    v?: boolean
  }>,
) {
  const { h, v } = (() => {
    if (props.h && props.v) {
      throw new Error('Devider can only be horizontal or vertical')
    }
    if (!props.h && !props.v) {
      return { h: true, v: false }
    }
    return props
  })()

  return (
    <div
      data-component="Devider"
      className={classNames(props.className, 'rounded-full bg-color-font bg-opacity-10', {
        'mx-auto h-[2px] w-[90%]': h,
        'h-[90%] min-h-[1em] w-[2px]': v,
      })}
    ></div>
  )
}
