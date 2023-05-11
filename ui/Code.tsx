'use client'
import classNames from 'classnames'
import React from 'react'
import shiki from '@/utils/shiki'
import './Code.css'

interface Props {
  className?: string
  code: string
}

export function Code(props: Props) {
  const [loading, setLoading] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (loading) return
    if (!ref.current) return
    shiki.codeToHtml(props.code, 'html').then((html) => {
      ref.current!.innerHTML = html
      setLoading(true)
    })
  }, [ref.current])
  return <div className={classNames('ui-code', props.className, {})} ref={ref}></div>
}
