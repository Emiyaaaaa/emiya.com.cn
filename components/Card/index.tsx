import React from 'react'

interface CardProps {
  title: string
  description?: string
}

function Card(props: CardProps) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="mb-0.5 bg-white p-6">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default Card
