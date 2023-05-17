import classNames from 'classnames'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  v?: boolean
  h?: boolean
  center?: boolean | 'x' | 'y'
  full?: boolean
}

export function Block(props: Props) {
  const htmlAttributes = React.useMemo(() => {
    const { children, className, v, h, center, full, ...rest } = props
    return rest
  }, [props])

  return (
    <div
      {...htmlAttributes}
      className={classNames('ui-block', props.className, 'flex', {
        'flex-col': props.v,
        'flex-row': props.h,
        'h-full w-full': props.full,
        'justify-center': props.center === true || (props.center === 'x' && props.h) || (props.center === 'y' && props.v),
        'items-center': props.center === true || (props.center === 'x' && props.v) || (props.center === 'y' && props.h),
      })}
    >
      {props.children}
    </div>
  )
}
