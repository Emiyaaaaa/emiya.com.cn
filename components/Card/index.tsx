import React from 'react'

type CardProps = React.PropsWithChildren<{
  title: string | React.ReactNode
  description?: string
  right?: React.ReactNode
}>

function Card(props: CardProps) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="relative mb-0.5 bg-white p-6">
          {props.title instanceof String ? <h3>{props.title}</h3> : props.title}
          <p>{props.description}</p>
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
