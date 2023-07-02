import React from 'react'

export function svg(viewSize: number, InnerPath: JSX.Element) {
  return function Svg(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
    return (
      <svg
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="inherit"
        width={props.size ? props.size : '100%'}
        height={props.size ? props.size : '100%'}
        {...props}
      >
        {InnerPath}
      </svg>
    )
  }
}
