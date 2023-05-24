import Checkbox from '@/ui/Checkbox'
import classNames from 'classnames'
import React from 'react'

function CheckList(props: { items: { checked: boolean; text: string }[]; className: string }) {
  return (
    <ul className={classNames(props.className, 'checklist')}>
      {props.items.map((item, index) => (
        <li key={`${item.text}${index}`}>
          <Checkbox checked={item.checked}>
            <span>{item.text}</span>
          </Checkbox>
        </li>
      ))}
    </ul>
  )
}

export default CheckList
