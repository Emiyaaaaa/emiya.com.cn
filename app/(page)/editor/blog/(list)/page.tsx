'use client'
import React from 'react'
import Link from 'next/link'
import Card from '@/components/Card'
import { postAPI, getAPI } from '@/utils/http'
import { ServerSideAPIInterface } from '@/server/route'

export default function EditorListPage() {
  const [data, setData] = React.useState<PromiseReturnType<ServerSideAPIInterface['getEditorBlogList']>>([])

  React.useEffect(() => {
    getAPI('getEditorBlogList').then((res) => setData(res))
  }, [])

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <Card
            title={
              <h3>
                <Link href={`/editor/blog/${item.id}`}>{item.title}</Link>
              </h3>
            }
          >
            <select defaultValue={item.visibility} onChange={(e) => postAPI('updateBlog', item.id, { visibility: Number(e.target.value) })}>
              <option value="1">显示</option>
              <option value="0">隐藏</option>
            </select>
          </Card>
        </div>
      ))}
    </div>
  )
}
