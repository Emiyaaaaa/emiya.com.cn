import React from 'react'

function Header(props: { level: number; text: string; withHash?: boolean }) {
  const id = React.useMemo(() => {
    return props.text.replace(/ /g, '-').replace(/[^\w-]/g, '')
  }, [props.text])

  const hash = React.useMemo(() => `#${id}`, [id])

  return React.createElement(`h${props.level}`, { className: 'font-bold relative group' }, [
    React.createElement('span', { key: 'span', dangerouslySetInnerHTML: { __html: props.text } }),
    props.withHash ? (
      <a key={hash} href={hash} id={`${id}`} className="float-left -ml-[1.5em] px-[0.5em] opacity-0 group-hover:opacity-60">
        #
      </a>
    ) : null,
  ])
}

export default Header
