import { Blog } from '@/server/database/typing'
import React from 'react'
import Content from '../Content'
import Time from '@/ui/Time'
import { Devider } from '@/ui/Devider'

function Article(props: { data: Blog }) {
  const { data } = props

  return (
    <article className="px-5 py-6">
      <header className="m-1 w-full">
        <h1 className="m-0 text-4xl font-bold leading-snug">
          <span>{data.title}</span>
        </h1>
        {data.updated_at && <Time className="ml-1 mt-6 block opacity-70" format="MON DD · YYYY" date={data.updated_at}></Time>}
        <span className="ml-1 mt-2 block opacity-70">{Math.ceil(data.content.length / 750)} minute read</span>
      </header>
      <Devider className="my-6" />
      <div className="w-fill mt-6 flex flex-col py-2 px-[2%]">
        <Content data={JSON.parse(data.content)} />
      </div>
    </article>
  )
}

export default Article
