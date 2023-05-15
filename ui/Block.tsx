import classNames from 'classnames'
import React from 'react'

interface Props {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  v?: boolean
  h?: boolean
  center?: boolean | 'x' | 'y'
}

export function Block(props: Props) {
  return (
    <div
      className={classNames('ui-block', props.className, 'flex', {
        'flex-col': props.v,
        'flex-row': props.h,
        'justify-center': props.center === true || (props.center === 'x' && props.h) || (props.center === 'y' && props.v),
        'items-center': props.center === true || (props.center === 'x' && props.v) || (props.center === 'y' && props.h),
      })}
    >
      {props.children}
    </div>
  )
}
