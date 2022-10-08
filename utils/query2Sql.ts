export function sql2Query(sql: string) {
  return sql.replace(/(\s|^)(\w)/g, (L: string, L2: string, L3: string) => {
    const a = L2 === ' ' ? '-' : ''
    return `${a}${L3.toUpperCase()}`
  })
}

export function query2Sql(query: string) {
  return query.replace(/-([A-Z|\d])/g, ' $1')
}
