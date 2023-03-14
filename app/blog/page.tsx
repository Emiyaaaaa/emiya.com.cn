import React from 'react'
import { getTechBlogList } from '@/server'
import Link from 'next/link'

export default function ArticleList() {
  const data = React.use(getTechBlogList())
  return (
    <>
      {data.map((d, index) => (
        <div key={index}>
          <Link href={`blog/${d.id}`}>
            <h1>{d.title}</h1>
          </Link>
          <h1>{d.content}</h1>
        </div>
      ))}
    </>
  )
}
