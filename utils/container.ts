export function container(func: () => any | Promise<any>) {
  func()
}
