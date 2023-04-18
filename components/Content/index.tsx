import type { OutputData } from '@editorjs/editorjs'
import React from 'react'
import Header from './components/Header'
import NestedList from './components/NestedList'
import CheckList from './components/CheckList'
import Text from './components/Text'

function Content(props: { data: OutputData }) {
  return (
    <>
      {props.data.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            return <Header {...block.data} />
          case 'paragraph':
            return <Text {...block.data}></Text>
          case 'list':
            return <NestedList {...block.data} />
          case 'delimiter':
            return <hr />
          case 'checklist':
            return <CheckList {...block.data} />
          case 'quote':
            return <blockquote>{block.data.text}</blockquote>
          case 'code':
            return <pre>{block.data.code}</pre>
          default:
            return <div>unknown block type {block.type}</div>
        }
      })}
    </>
  )
}

export default Content
