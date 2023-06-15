/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import type { Metadata } from 'next'
import { Beian } from '@/ui/Beian'
import { WakaTime, getWakaTimeStats } from '@/components/WakaTime'
import './page.scss'
import Link from 'next/link'
import { IconLink } from '@/ui/IconText'

export const metadata: Metadata = {
  title: "Emiya's HomePage",
  description: "This is Emiya's HomePage",
}

const Home = () => {
  // const wakaTimeData = React.use(getWakaTimeStats())
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile space-y-3 p-6 tracking-wide">
          <div className="mb-8 space-y-4 text-5xl font-bold">
            <p>Hello~</p>
            <p>I'm Emiya</p>
          </div>
          <div className="space-y-4 opacity-[0.85]">
            <p className="mt-5">Front-end developer / UI amateur / Looking for remote work or project</p>
            <p>
              Working for
              <IconLink href="//realsee.com">Realsee</IconLink>
              <span className="px-0">&</span>
              <IconLink href="//ke.com">BeiKe</IconLink>
            </p>
            <p>6 years of front-end development experience and 3 years of work experience</p>
            <p>Overwatch Master Player, Lúcioball Top 500</p>
            <p>This Blog using the following stack:</p>
            <ul className="space-y-2">
              <li>
                UI Library:
                <IconLink href="//react.dev/">React 18</IconLink>
              </li>
              <li>
                Language:
                <IconLink href="//typescriptlang.org" icon="//www.typescriptlang.org/favicon-32x32.png">
                  Typescript
                </IconLink>
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
                DataBase:<IconLink href="//planetscale.com/">Planetscale</IconLink>
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
      <div className="relative bottom-0 mb-2 mt-auto">
        <Beian />
      </div>
    </>
  )
}

export default Home
