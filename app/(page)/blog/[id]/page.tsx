import React from 'react'
import { serverSlideAPI } from '@/server/route'
import { notFound } from 'next/navigation'
import Article from '@/components/Article'

function Page({ params }: { params: { id: string } }) {
  const data = React.use(serverSlideAPI.getBlog(params.id))
  if (!data) notFound()
  return <Article data={data as any}></Article>
}

export default Page
