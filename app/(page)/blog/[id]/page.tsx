import React from 'react'
import { serverSlideAPI } from '@/server/route'
import { notFound } from 'next/navigation'
import Content from '@/components/Content'
import Article from '@/components/Article'
import { Blog } from '@/server/database/typing'

function Page({ params }: { params: { id: string } }) {
  const data = React.use(serverSlideAPI.getBlog(params.id))
  if (!data) notFound()
  return <Article data={data as any}></Article>
}

export default Page
