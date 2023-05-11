import type { OutputData } from '@editorjs/editorjs'
import React from 'react'
import Header from './components/Header'
import NestedList from './components/NestedList'
import CheckList from './components/CheckList'
import Text from './components/Text'
import { Code } from '@/ui/Code'
import './index.css'

function Content(props: { data: OutputData }) {
  return (
    <>
      {props.data.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            return <Header {...block.data} withHash />
          case 'paragraph':
            return <Text {...block.data}></Text>
          case 'image':
            return <img src={block.data.file.url} alt={block.data.caption} />
          case 'list':
            return <NestedList {...block.data} />
          case 'delimiter':
            return <hr className="my-6" />
          case 'checklist':
            return <CheckList {...block.data} />
          case 'quote':
            return <blockquote>{block.data.text}</blockquote>
          case 'code':
            return <Code className="max-w-full" code={block.data.code} />
          default:
            return <div>unknown block type {block.type}</div>
        }
      })}
    </>
  )
}

export default Content
