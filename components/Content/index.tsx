import type { OutputData } from '@editorjs/editorjs'
import React from 'react'
import Header from './components/Header'
import NestedList from './components/NestedList'
import CheckList from './components/CheckList'
import Text from './components/Text'
import { Code } from '@/ui/Code'
import './index.scss'
import any from '@/utils/any'
import Quote from './components/Quote'
import { Devider } from '@/ui/Devider'
import Image from 'next/image'

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
            return <Image src={block.data.file.url} alt={block.data.caption} />
          case 'list':
            return <NestedList {...block.data} />
          case 'delimiter':
            return <Devider />
          case 'checklist':
            return <CheckList {...block.data} />
          case 'quote':
            return <Quote {...block.data} />
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
