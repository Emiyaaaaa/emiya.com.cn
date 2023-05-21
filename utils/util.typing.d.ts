declare global {
  type PromiseResult<T> = T extends Promise<infer U> ? U : T
  type PromiseReturnType<T> = PromiseResult<ReturnType<T>>
  type RemoveTypeFormArray<T extends unknown[], P> = T extends []
    ? []
    : T extends [infer H, ...infer R]
    ? H extends P
      ? RemoveType<R, P>
      : [H, ...RemoveType<R, P>]
    : T
}

export {}
