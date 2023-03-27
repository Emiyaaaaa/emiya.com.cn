import React, { use } from 'react'
import { getTechBlogDetail } from '@/server'
import { notFound } from 'next/navigation'

function Article({ params }: { params: { id: string } }) {
  const data = use(getTechBlogDetail(params.id))
  if (!data) notFound()
  return (
    <>
      <h1>{data.title}</h1>
      <h1>{data.content}</h1>
    </>
  )
}

export default Article
