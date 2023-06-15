import { IconArticle, IconGithub, IconHome } from '@/ui/icon'
import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import { Devider } from '@/ui/Devider'

function Head(props?: { title?: string }) {
  return (
    <div className="p-5">
      <div className="flex items-center">
        <Link href="">
          <div className="pointer-events-none select-none font-black opacity-90">{props?.title ?? "Emiya's Blog"}</div>
        </Link>
        <div className="ml-auto flex items-center space-x-5 opacity-90">
          <Link href="">
            <IconHome width={24}></IconHome>
          </Link>
          <Link href="/blog">
            <IconArticle width={23}></IconArticle>
          </Link>
          <Devider className="h-[20px]" v></Devider>
          <Link href="https://github.com/Emiyaaaaa" target="_blank">
            <IconGithub width={22}></IconGithub>
          </Link>
          <ThemeSwitch width={22}></ThemeSwitch>
        </div>
      </div>
    </div>
  )
}

export default Head
