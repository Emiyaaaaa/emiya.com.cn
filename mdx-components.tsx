import React from 'react'
import type { MDXComponents } from 'mdx/types'
import { Code } from './ui/Code'
import { Title } from './components/Content/Title'
import Header from './components/Content/Header'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return <Title>{children}</Title>
    },
    h2: ({ children }) => {
      return <Header level={2} text={children as string} withHash></Header>
    },
    h3: ({ children }) => {
      return <Header level={3} text={children as string} withHash></Header>
    },
    h4: ({ children }) => {
      return <Header level={4} text={children as string} withHash></Header>
    },
    h5: ({ children }) => {
      return <Header level={5} text={children as string} withHash></Header>
    },
    h6: ({ children }) => {
      return <Header level={6} text={children as string} withHash></Header>
    },
    code: (props) => {
      return <Code code={props.children as string} language={props.className?.split('-')?.[1]} />
    },
    ...components,
  }
}
