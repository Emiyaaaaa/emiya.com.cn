import React from 'react'
export function svg(InnerPath: JSX.Element) {
  return function Svg(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="inherit" {...props}>
        {InnerPath}
      </svg>
    )
  }
}
