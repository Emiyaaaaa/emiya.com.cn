import React from 'react'

type NestedListItems = NestedListItem[]
interface NestedListItem {
  content: string
  items?: NestedListItems
}

function ListWrapper(props: { style: 'ordered' | 'unordered'; children: React.ReactNode }) {
  const { style, children } = props
  switch (style) {
    case 'ordered':
      return <ol>{children}</ol>
    case 'unordered':
      return <ul>{children}</ul>
  }
}

function NestedList(props: { style: 'ordered' | 'unordered'; items: NestedListItems }) {
  const { style, items } = props
  return (
    <ListWrapper style={style}>
      {items.map((item, index) => (
        <li key={`${item.content}${index}`}>
          {item.content}
          {item.items && <NestedList style={style} items={item.items} />}
        </li>
      ))}
    </ListWrapper>
  )
}

export default NestedList
