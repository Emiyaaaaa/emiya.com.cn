/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import type { Metadata } from 'next'
import { IconLink } from '@/ui/IconLink'
import './page.scss'
import { WakaTime } from '@/components/WakaTime'
import { IconMail, IconTwitter, IconTypeScript, IconWeChat } from '@/ui/icon'
import Link from 'next/link'
import ColorfulItem from '@/components/ColorfulItem'

export const metadata: Metadata = {
  title: "Emiya's HomePage",
  description: "This is Emiya's HomePage",
}

const Home = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center">
        <div className="profile space-y-3 p-6">
          <div className="mb-8 space-y-4 text-5xl font-bold lg:text-6xl">
            <p>Hello~</p>
            <p>I'm Emiya</p>
          </div>
          <div className="text-color-font text-opacity-[0.85]">
            <p className="mt-5">
              Front-end developer / <Link href={'https://github.com/sindresorhus/type-fest'}>type-fest</Link> maintainer / Looking for
              remote work or project.
            </p>
            <h3>Work</h3>
            <p>
              Working for
              <IconLink href="//realsee.com">Realsee</IconLink>
              <span className="px-0">&</span>
              <IconLink href="//ke.com">Ke Holding</IconLink>, 6 years' development experience and 3 years' work experience.
            </p>
            <h3>Skill</h3>
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2">
                <ColorfulItem type="TypeScript" />
                <ColorfulItem type="React" />
                <ColorfulItem type="Svelte" />
                <ColorfulItem type="NextJs" />
                <ColorfulItem type="Tailwind" />
              </div>
            </div>
            <div className="mt-4 rounded-md bg-color-font bg-opacity-5 px-4 pb-7 pt-2">
              <p className="mb-2 text-sm">My top 3 languages in last 7 days</p>
              <WakaTime></WakaTime>
              <p className="float-right mt-[6px] scale-90 text-xs opacity-60">*data from wakatime</p>
            </div>
            <h3>Contant Me</h3>
            <p className="flex flex-col space-y-1">
              <IconLink href="mailto:emiya@emiya.com.cn" icon={<IconMail size={16} className="mr-1 opacity-80" />}>
                emiya@emiya.com.cn
              </IconLink>
              <IconLink href="mailto:emiyaaaaa05@gmail.com" icon={<IconMail size={16} className="mr-1 opacity-80" />}>
                emiyaaaaa05@gmail.com
              </IconLink>
              <IconLink href="//twitter.com/Em1ya05" icon={<IconTwitter className="opacity-80" />}>
                Yeami
              </IconLink>
              <IconLink href="/image/wechat.jpg" icon={<IconWeChat className="opacity-80" />}>
                Em1ya5
              </IconLink>
            </p>
            <h3>About</h3>
            {/* <p>Overwatch Master Player, Lúcioball Top 500</p> */}
            <div>
              Thanks these open-source libraries ♥:
              <ul className="ml-2 mt-2 space-y-1">
                <li>
                  Language:
                  <IconLink href="//typescriptlang.org" icon="//www.typescriptlang.org/favicon-32x32.png">
                    Typescript
                  </IconLink>
                </li>
                <li>
                  UI library:
                  <IconLink href="//react.dev/">React 18</IconLink>
                </li>
                <li>
                  Styling:
                  <IconLink href="//tailwindcss.com/" icon="//tailwindcss.com/favicons/favicon-32x32.png">
                    Tailwind CSS
                  </IconLink>
                </li>
                <li>
                  Framework:<IconLink href="//nextjs.org">Next 13</IconLink>
                </li>
                <li>
                  Deployment:
                  <IconLink href="//vercel.com/home" icon="//assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico">
                    Vercel
                  </IconLink>
                </li>
                <li>
                  Database:<IconLink href="//planetscale.com/">Planetscale</IconLink>
                  <IconLink href="//kysely.dev/" icon="//kysely.dev/img/favicon.ico">
                    Kysely
                  </IconLink>
                </li>
                <li>
                  CMS Editor:
                  <IconLink href="//editorjs.io/" icon="//editorjs.io/favicon.png">
                    Editor.js
                  </IconLink>
                </li>
                <li>
                  Analytics:
                  <IconLink href="//vercel.com/analytics" icon="//assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico">
                    Vercel Analytics
                  </IconLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative bottom-0 mb-2 mt-auto text-center">
        <a href="https://beian.miit.gov.cn/" className="text-sm text-color-font text-opacity-40">
          晋ICP备18012113号
        </a>
      </div> */}
    </div>
  )
}

export default Home
