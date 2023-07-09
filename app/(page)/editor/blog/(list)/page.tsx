'use client'
import React from 'react'
import Link from 'next/link'
import Card from '@/components/Card'
import { postAPI, getAPI } from '@/utils/http'
import usePromise from '@/utils/hooks/usePromise'
import classNames from 'classnames'
import { Blog } from '@/server/database/typing'

export default function EditorListPage() {
  const { data } = usePromise(getAPI('getEditorBlogList'))

  const changeData = (id: number, data: Partial<Blog>) => {
    postAPI('updateBlog', id, data)
  }

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          <Card
            className={classNames({ 'opacity-40': !item.visibility })}
            title={
              <h3>
                <Link href={`/editor/blog/${item.id}`}>{item.title}</Link>
              </h3>
            }
          >
            <select defaultValue={item.visibility} onChange={(e) => changeData(item.id, { visibility: Number(e.target.value) })}>
              <option value="1">显示</option>
              <option value="0">隐藏</option>
            </select>
          </Card>
        </div>
      ))}
    </div>
  )
}
