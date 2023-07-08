import { Blog } from '@/server/database/typing'
import React from 'react'
import Content from './Content'
import Time from '@/ui/Time'
import { Devider } from '@/ui/Devider'
import { UIProps } from '@/utils/util.typing'
import classNames from 'classnames'
import type { OutputData } from '@editorjs/editorjs'
import markdown2obj from '@/utils/md2obj'

function Article(props: UIProps<{ data: Pick<Blog, 'title' | 'created_at' | 'content' | 'old'>; content?: OutputData }>) {
  const { data } = props

  return (
    <article className={classNames(props.className, 'px-5 pb-6 pt-3')}>
      <header className="m-1 w-full">
        <h1 className="m-0 text-3xl font-bold leading-snug">
          <span>{data.title}</span>
        </h1>
        {data.created_at && <Time className="ml-1 mt-4 block opacity-70" format="MON DD · YYYY" date={data.created_at}></Time>}
        <span className="ml-1 mt-2 block opacity-70">{Math.ceil(data.content.length / 750)} minute read</span>
      </header>
      <Devider className="my-4" />
      <div className="w-fill mt-4 flex flex-col px-[2%] py-2">
        <Content
          data={(() => {
            if (props.data.content && props.data.old) return markdown2obj(data.content)
            if (props.content) return props.content
            return JSON.parse(data.content)
          })()}
        />
      </div>
    </article>
  )
}

export default Article
