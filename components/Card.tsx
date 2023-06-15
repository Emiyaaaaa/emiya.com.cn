import { Devider } from '@/ui/Devider'
import Time from '@/ui/Time'
import React from 'react'

type CardProps = React.PropsWithChildren<{
  title: string | React.ReactNode
  description?: string
  tags?: string[]
  created_at?: Date | null
  right?: React.ReactNode
}>

function Card(props: CardProps) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="relative mb-0.5 flex flex-col justify-center p-6">
          {typeof props.title === 'string' ? <h1 className="m-0 text-lg font-black tracking-wide">{props.title}</h1> : props.title}
          <div className="mt-1 flex">
            {props.tags?.map((tag, i) => (
              <p
                className="tag-colorful-color mr-3 flex items-center font-semibold capitalize text-color-tag before:mr-1 before:h-2 before:w-2 before:rounded-full before:bg-color-tag before:opacity-70 before:content-['']"
                key={i}
                data-tag={tag.toLowerCase()}
              >
                {tag}
              </p>
            ))}
          </div>
          {props.children}
          <Time
            format="MON DD, YYYY"
            className="right-3 mt-1 block text-sm font-semibold tracking-wide opacity-60"
            date={props.created_at}
          ></Time>
        </div>
      </div>
      <Devider className="bg-opacity-10"></Devider>
    </>
  )
}

export default Card
