import { Devider } from '@/ui/Devider'
import Time from '@/ui/Time'
import React from 'react'
import './Card.scss'
import { UIProps } from '@/utils/util.typing'
import classNames from 'classnames'

type CardProps = UIProps<
  React.PropsWithChildren<{
    title: string | React.ReactNode
    description?: string
    tags?: string[]
    created_at?: Date | null
    right?: React.ReactNode
  }>
>

function Card(props: CardProps) {
  return (
    <>
      <div className={classNames('overflow-hidden', props.className)}>
        <div className="relative mb-0.5 flex flex-col justify-center p-6">
          {typeof props.title === 'string' ? <h1 className="m-0 text-lg font-black tracking-wide">{props.title}</h1> : props.title}
          <div className="mt-1 flex flex-wrap">
            {props.tags?.map((tag, i) => (
              <p className="tag mr-4" key={i} data-tag={tag.toLowerCase()}>
                {tag}
              </p>
            ))}
          </div>
          {props.children}
          <Time
            format="MON DD · YYYY"
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
