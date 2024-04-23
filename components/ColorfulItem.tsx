import { IconNextJs, IconReact, IconSvelte, IconTailwind, IconTypeScript } from '@/ui/icon'
import React, { ReactNode } from 'react'

type Languages = 'TypeScript' | 'Svelte' | 'React' | 'NextJs' | 'Tailwind'

const ItemMap: Record<
  Languages,
  {
    icon: ReactNode
    text: string
    color: string
  }
> = {
  TypeScript: {
    icon: <IconTypeScript size={24} />,
    text: 'TypeScript',
    color: 'bg-[#3178C6]',
  },
  Svelte: {
    icon: <IconSvelte size={24} />,
    text: 'Svelte',
    color: 'bg-[#FF3E00]',
  },
  React: {
    icon: <IconReact size={24} />,
    text: 'React',
    color: 'bg-[#61DAFB]',
  },
  NextJs: {
    icon: <IconNextJs size={24} />,
    text: 'Next.js',
    color: 'bg-[#ababab]',
  },
  Tailwind: {
    icon: <IconTailwind size={24} />,
    text: 'Tailwind CSS',
    color: 'bg-[#06B6D4]',
  },
}

function ColorfulItem(props: { type: Languages }) {
  const item = ItemMap[props.type]
  return (
    <div className={`flex w-max items-center rounded-md bg-opacity-20 ${item.color} px-3 py-1`}>
      <div>{item.icon}</div>
      <div className="ml-3 font-medium">{item.text}</div>
    </div>
  )
}

export default ColorfulItem
