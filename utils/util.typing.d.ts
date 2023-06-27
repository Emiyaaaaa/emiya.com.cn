export type UIProps<T extends Record<string, unknown> = unknown> = T & {
  className?: string
  width?: string | number
  height?: string | number
}
