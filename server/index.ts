import db from './database'

export async function getTechBlogList() {
  const result = await db.selectFrom('tech_blog' as any).selectAll().execute()
  console.log(result)
  return result
}
