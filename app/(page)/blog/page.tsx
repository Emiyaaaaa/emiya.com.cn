import React from 'react'
import { getTechBlogList } from '@/server'
import Link from 'next/link'

export default function ArticleList() {
  const data = React.use(getTechBlogList())
  return (
    <>
      {data.map((d, index) => (
        <div className="border-l-neutral-800 text-3xl text-red-300" key={index}>
          <Link href={`blog/${d.id}`}>
            <span>{d.title}</span>
          </Link>
        </div>
      ))}
    </>
  )
}
