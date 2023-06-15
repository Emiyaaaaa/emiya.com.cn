import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import './IconText.scss'

export function IconText(props: PropsWithChildren<{ icon?: string }>) {
  return (
    <>
      {props.icon && <span className="icon" style={{ backgroundImage: `url(${props.icon})` }}></span>}
      {props.children}
    </>
  )
}

export function IconLink(props: PropsWithChildren<{ icon?: string; href: string }>) {
  return (
    <Link
      data-component="IconLink"
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className="relative inline-flex underline decoration-color-font-80 decoration-dashed underline-offset-[3px]"
    >
      <IconText icon={props.icon ?? props.href + '/favicon.ico'}>{props.children}</IconText>
    </Link>
  )
}
