export function singlePromise<T = any>(func: () => Promise<T>) {
  let promise: Promise<T> | null = null
  return async function () {
    if (!promise) {
      promise = func()
    }
    return promise
  }
}
