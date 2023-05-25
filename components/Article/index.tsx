import { Blog } from '@/server/database/typing'
import React from 'react'
import Content from '../Content'
import Time from '@/ui/Time'
import { Block } from '@/ui/Block'

function Article(props: { data: Blog }) {
  const { data } = props

  return (
    <div className="flex-1">
      <Block v center="x" className="h-full w-full">
        <div className="w-full max-w-[51rem] overflow-auto">
          <article className="px-5 py-6">
            <header className="flex w-full">
              <h1 className="m-1 text-4xl font-extrabold">{data.title}</h1>
            </header>
            <div className="w-fill m-2 mt-6">
              {/* <address>{data.author}</address> */}
              <section className="text-xs text-gray-600">
                {data.updated_at && (
                  <div>
                    <span className="mr-1">最后修改于</span>
                    <Time date={data.updated_at}></Time>
                  </div>
                )}
                <div className="mt-2">作者：Emiya</div>
              </section>
              <hr className="my-6" />
              <article className="py-2">
                <Content data={JSON.parse(data.content)} />
              </article>
            </div>
          </article>
        </div>
      </Block>
    </div>
  )
}

export default Article
