import type { MDXComponents } from 'mdx/types'
import React from 'react'
import Header from './components/Content/Header'
import { Title } from './components/Content/Title'
import { Code } from './ui/Code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return <Title>{children}</Title>
    },
    h2: ({ children }) => {
      return <Header level={2} text={children as string} withHash />
    },
    h3: ({ children }) => {
      return <Header level={3} text={children as string} withHash />
    },
    h4: ({ children }) => {
      return <Header level={4} text={children as string} withHash />
    },
    h5: ({ children }) => {
      return <Header level={5} text={children as string} withHash />
    },
    h6: ({ children }) => {
      return <Header level={6} text={children as string} withHash />
    },
    code: (props) => {
      return <Code code={props.children as string} language={props.className?.split('-')?.[1]} />
    },
    ...components,
  }
}
