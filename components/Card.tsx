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
          {typeof props.title === 'string' ? <div className="text-lg font-black tracking-wide">{props.title}</div> : props.title}
          <div className="mt-1 flex">
            {props.tags?.map((tag, i) => (
              <p
                className="tag-colorful-color mr-3 flex items-center capitalize text-color-tag before:mr-1 before:h-2 before:w-2 before:rounded-full before:bg-color-tag before:opacity-70 before:content-['']"
                key={i}
                data-tag={tag.toLowerCase()}
              >
                {tag}
              </p>
            ))}
          </div>
          <Time format="MON DD" className="absolute right-3 mt-1 block text-sm tracking-wide" date={props.created_at}></Time>
          {props.children}
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default Card
