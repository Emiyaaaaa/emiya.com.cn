import React from 'react'
import { notFound } from 'next/navigation'
import Article from '@/components/Article'
import { serverSlideAPI } from '@/server/route'
import any from '@/utils/any'
import type { Metadata } from 'next'
import { emiyaBlog } from '@/utils/contants'

interface Props {
  params: {
    title: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const blog = await serverSlideAPI.getBlogByTitle(params.title)
  const title = blog?.title ?? params.title.replace(/-/g, ' ') ?? emiyaBlog

  return {
    title: title,
    description: title,
    applicationName: emiyaBlog,
    authors: [{ name: 'Emiya', url: 'emiya.com.cn' }],
  }
}

function Page({ params }: Props) {
  const data = React.use(serverSlideAPI.getBlogByTitle(params.title))
  if (!data) notFound()
  return <Article data={any(data)}></Article>
}

export default Page
