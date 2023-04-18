import React from 'react'

function Text(props: { text: string }) {
  return <p dangerouslySetInnerHTML={{ __html: props.text }}></p>
}

export default Text
