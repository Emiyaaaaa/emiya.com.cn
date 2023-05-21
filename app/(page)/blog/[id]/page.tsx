import React from 'react'
import { notFound } from 'next/navigation'
import Article from '@/components/Article'
import { serverSlideAPI } from '@/server/route'
import any from '@/utils/any'

function Page({ params }: { params: { id: string } }) {
  const data = React.use(serverSlideAPI.getBlog(params.id))
  if (!data) notFound()
  return <Article data={any(data)}></Article>
}

export default Page
