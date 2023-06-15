export type UIProps<T extends Record<string, unknown> = unknown> = T &
  React.HTMLAttributes<Element> & {
    className?: string
    width?: string | number
    height?: string | number
  }
