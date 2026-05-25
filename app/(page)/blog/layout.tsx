import type React from 'react'
import './index.scss'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return <div className="post px-5 pb-6 pt-3">{children}</div>
}

export default Layout
