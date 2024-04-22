import React from 'react'

function Header(props: { level: number; text: string; withHash?: boolean }) {
  const id = React.useMemo(() => {
    return props.text.replace(/ /g, '-').replace(/[^\w-]/g, '')
  }, [props.text])

  const hash = React.useMemo(() => `#${id}`, [id])

  return React.createElement(`h${props.level}`, { className: 'font-bold relative group' }, [
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    React.createElement('span', { key: 'span', dangerouslySetInnerHTML: { __html: props.text } }),
    props.withHash ? (
      <a key={hash} href={hash} id={`${id}`} target="_self" className="px-2 opacity-0 transition-opacity group-hover:opacity-60">
        #
      </a>
    ) : null,
  ])
}

export default Header
