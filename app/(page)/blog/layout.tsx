import type React from 'react'
import './index.scss'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <article className="post px-5 pb-6 pt-3">
      {children}
      {/* <header className="m-1 w-full">
        <h1 className="m-0 text-3xl font-bold leading-snug">
          <span>{data.title}</span>
        </h1>
        {data.created_at && <Time className="ml-1 mt-4 block opacity-70" format="MON DD · YYYY" date={data.created_at}></Time>}
        <span className="ml-1 mt-2 block opacity-70">{Math.ceil(data.content.length / 750)} minute read</span>
      </header>
      <Devider className="my-4" />
      <div className="w-fill mt-4 flex flex-col px-[2%] py-2">
      </div> */}
    </article>
  )
}

export default Layout
