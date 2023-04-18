import React from 'react'

function Header(props: { level: number; text: string }) {
  switch (props.level) {
    case 1:
      return <h1 dangerouslySetInnerHTML={{ __html: props.text }} />
    case 2:
      return <h2 dangerouslySetInnerHTML={{ __html: props.text }} />
    case 3:
      return <h3 dangerouslySetInnerHTML={{ __html: props.text }} />
    case 4:
      return <h4 dangerouslySetInnerHTML={{ __html: props.text }} />
    case 5:
      return <h5 dangerouslySetInnerHTML={{ __html: props.text }} />
    case 6:
      return <h6 dangerouslySetInnerHTML={{ __html: props.text }} />
    default:
      return <div dangerouslySetInnerHTML={{ __html: props.text }} />
  }
}

export default Header
