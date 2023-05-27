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
        <div className="relative mb-0.5 p-6">
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
          <Time format="MON DD · YYYY" className="mt-1 block text-sm tracking-wide" date={props.created_at}></Time>
          {props.children}
          {props.right && (
            <div className="absolute right-6 top-0 h-full">
              <div className="flex h-full items-center">{props.right}</div>
            </div>
          )}
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default Card
