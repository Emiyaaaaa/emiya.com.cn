import React from 'react'

function Quote(props: { text: string; caption: string }) {
  return (
    <blockquote>
      <span>{props.text}</span>
      <span>{props.caption}</span>
    </blockquote>
  )
}

export default Quote
