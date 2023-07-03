import type { OutputData } from '@editorjs/editorjs'
import React from 'react'
import Header from './components/Header'
import NestedList from './components/NestedList'
import CheckList from './components/CheckList'
import Text from './components/Text'
import { Code } from '@/ui/Code'
import './index.scss'
import any from '@/utils/any'
import { Devider } from '@/ui/Devider'

function Content(props: { data: OutputData }) {
  return (
    <div className="content">
      {props.data.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            return <Header {...block.data} withHash />
          case 'paragraph':
            return <Text {...block.data}></Text>
          case 'image':
            return (
              <div className="img">
                <img src={block.data.file.url} alt={block.data.caption} />
                <caption>{block.data.caption}</caption>
              </div>
            )
          case 'list':
            return <NestedList {...block.data} />
          case 'delimiter':
            return <Devider />
          case 'checklist':
            return <CheckList {...block.data} />
          case 'quote':
            return (
              <blockquote>
                <span>{block.data.text}</span>
                <span>{block.data.caption}</span>
              </blockquote>
            )
          case 'code':
            return <Code className="max-w-full" code={block.data.code} language={any(block.data.language)} />
          default:
            return <div>unknown block type {block.type}</div>
        }
      })}
    </div>
  )
}

export default Content
