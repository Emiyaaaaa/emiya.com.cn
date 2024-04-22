import type React from 'react'

import { emiyaBlog } from '@/utils/contants'
import type { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: {
    title: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    applicationName: emiyaBlog,
    authors: [{ name: 'Emiya', url: 'emiya.com.cn' }],
  }
}

function Layout({ params, children }: Props) {
  return <div>{children}</div>
}

export default Layout
