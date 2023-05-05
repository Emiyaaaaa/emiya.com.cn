import { Blog } from '@/server/database/typing'
import React from 'react'
import Content from '../Content'
import Time from './components/Time'
import './index.css'

function Article(props: { data: Blog }) {
  const { data } = props
  return (
    <div className="ml-5 mr-5 overflow-auto">
      <article>
        <header className="flex w-full justify-center">
          <h1 className="text-2xl text-main-color">{data.title}</h1>
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
          <article className="p-2">
            <Content data={JSON.parse(data.content)} />
          </article>
        </div>
      </article>
    </div>
  )
}

export default Article
