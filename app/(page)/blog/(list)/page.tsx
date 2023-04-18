import React from 'react'
import { serverSlideAPI } from '@/server/route'
import Link from 'next/link'
import Card from '@/app/component/Card'

export default function ArticleList() {
  const data = React.use(serverSlideAPI.getBlogList())
  return (
    <div>
      {data.map((d, index) => (
        <Link key={index} href={`/blog/${d.id}`}>
          <Card title={d.title}></Card>
        </Link>
      ))}
    </div>
  )
}
