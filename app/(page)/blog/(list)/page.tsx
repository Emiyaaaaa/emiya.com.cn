import React from 'react'
import Link from 'next/link'
import Card from '@/components/Card'
import { serverSlideAPI } from '@/server/route'

export default function ArticleList() {
  const data = React.use(serverSlideAPI.getVisibleBlogList())
  return (
    <div>
      {data.map((d, index) => (
        <Link key={index} href={`/blog/${d.en_title ? d.en_title.replace(/\s/g, '-') : `untitled-${d.id}`}`}>
          <Card {...d} tags={d.tag?.split(';')}></Card>
        </Link>
      ))}
    </div>
  )
}
