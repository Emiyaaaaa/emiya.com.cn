import classNames from 'classnames'
import React from 'react'

function CheckList(props: { items: { checked: boolean; text: string }[]; className: string }) {
  return (
    <ul className={classNames(props.className, 'checklist')}>
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
