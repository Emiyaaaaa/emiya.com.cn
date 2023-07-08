'use client'
import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import './IconLink.scss'
import { UIProps } from '@/utils/util.typing'
import classNames from 'classnames'
import { useLoadImage } from '@/utils/hooks/useLoad'

type Icon = string | React.ReactNode | Element

export function ImageIcon(props: { icon?: string }) {
  const { loaded } = useLoadImage(props.icon)
  return <span className={classNames('icon image', { loaded })} style={{ backgroundImage: `url(${props.icon})` }}></span>
}

export function IconText(props: PropsWithChildren<{ icon?: Icon }>) {
  return (
    <>
      {typeof props.icon === 'string' && <ImageIcon icon={props.icon} />}
      {typeof props.icon !== 'string' && <span className="icon">{props.icon as any}</span>}
      {props.children}
    </>
  )
}

export function IconLink(props: PropsWithChildren<UIProps<{ icon?: Icon; href: string }>>) {
  return (
    <Link
      data-component="IconLink"
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={classNames('relative inline-flex w-max', props.className)}
    >
      <IconText icon={props.icon ?? props.href + '/favicon.ico'}>{props.children}</IconText>
    </Link>
  )
}
