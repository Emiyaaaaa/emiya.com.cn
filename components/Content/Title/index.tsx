import React from 'react'

export function Title(props: { children: React.ReactNode | string }) {
  return (
    <header className="m-1 mb-4 w-full">
      <h1 className="m-0 text-3xl font-bold leading-snug">
        <span>{props.children}</span>
      </h1>
      {/* {data.created_at && <Time className="ml-1 mt-4 block opacity-70" format="MON DD · YYYY" date={data.created_at}></Time>} */}
      {/* <span className="ml-1 mt-2 block opacity-70">{Math.ceil(data.content.length / 750)} minute read</span> */}
    </header>
  )
}
