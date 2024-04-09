import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { Code } from './ui/Code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: (props) => {
      return <Code code={props.children as string} language={props.className?.split('-')?.[1]} />
    },
    ...components,
  }
}
