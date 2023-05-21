import React from 'react'

function CheckList(props: { items: { checked: boolean; text: string }[]; className: string }) {
  return (
    <div className={props.className}>
      {props.items.map((item, index) => (
        <div key={`${item.text}${index}`}>
          <input type="checkbox" checked={item.checked} readOnly />
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default CheckList
