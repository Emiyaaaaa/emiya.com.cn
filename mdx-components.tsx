import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { Code } from './ui/Code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => {
      console.log(props)
      return <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
    },
    code: (props) => {
      return <Code code={props.children as string} language={props.className?.split('-')?.[1]} />
    },
    ...components,
  }
}
