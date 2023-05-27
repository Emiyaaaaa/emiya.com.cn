import classNames from 'classnames'
import React from 'react'

export default function Checkbox(props: React.PropsWithChildren<{ checked?: boolean; className?: string }>) {
  return (
    <span className="flex items-center">
      <span
        className={classNames(
          'mr-2 flex h-[1.1em] w-[1.1em] items-center justify-center rounded-full border-2 border-solid border-color-main-dark',
          props.className,
          { 'bg-color-main-dark': props.checked },
        )}
      >
        {props.checked && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeWidth="2"
              d="M7 12L10.4884 15.8372C10.5677 15.9245 10.705 15.9245 10.7844 15.8372L17 9"
            ></path>
          </svg>
        )}
      </span>
      {props.children}
    </span>
  )
}
