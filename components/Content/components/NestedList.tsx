import React from 'react'

type NestedListItems = NestedListItem[]
interface NestedListItem {
  content: string
  items?: NestedListItems
}

function ListWrapper(props: { style: 'ordered' | 'unordered'; children: React.ReactNode; className?: string }) {
  const { style, children } = props
  switch (style) {
    case 'ordered':
      return <ol className={props.className}>{children}</ol>
    case 'unordered':
      return <ul className={props.className}>{children}</ul>
  }
}

function NestedList(props: { style: 'ordered' | 'unordered'; items: NestedListItems; className?: string }) {
  const { style, items } = props
  return (
    <ListWrapper style={style} className={props.className}>
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
