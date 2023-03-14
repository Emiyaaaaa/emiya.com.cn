import db from './database'

export async function getTechBlogList() {
  const result = await db.selectFrom('tech_blog').selectAll().execute()
  return result
}

export async function getTechBlogDetail(id: number | string) {
  const result = await db.selectFrom('tech_blog').selectAll().where('id', '=', Number(id)).execute()
  return result?.[0]
}
