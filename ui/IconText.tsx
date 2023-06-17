import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import './IconText.scss'
import { UIProps } from '@/utils/util.typing'
import classNames from 'classnames'

export function IconText(props: PropsWithChildren<{ icon?: string }>) {
  return (
    <>
      {props.icon && <span className="icon" style={{ backgroundImage: `url(${props.icon})` }}></span>}
      {props.children}
    </>
  )
}

export function IconLink(props: PropsWithChildren<UIProps<{ icon?: string; href: string }>>) {
  return (
    <Link
      data-component="IconLink"
      type="link"
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={classNames('relative inline-flex', props.className)}
    >
      <IconText icon={props.icon ?? props.href + '/favicon.ico'}>{props.children}</IconText>
    </Link>
  )
}
