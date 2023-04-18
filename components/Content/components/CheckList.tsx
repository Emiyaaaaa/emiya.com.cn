import React from 'react'

function CheckList(props: { items: { checked: boolean; text: string }[] }) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <li key={`${item.text}${index}`}>
          <input type="checkbox" checked={item.checked} readOnly />
          {item.text}
        </li>
      ))}
    </ul>
  )
}

export default CheckList
