import React from 'react'

import type { Metadata } from 'next'
import { emiyaBlog } from '@/utils/contants'

interface Props {
  children: React.ReactNode
  params: {
    title: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = blog?.title ?? params.title.replace(/-/g, ' ') ?? emiyaBlog

  return {
    title: title,
    description: title,
    applicationName: emiyaBlog,
    authors: [{ name: 'Emiya', url: 'emiya.com.cn' }],
  }
}

function Layout({ params, children }: Props) {
  return <div>{children}</div>
}

export default Layout
