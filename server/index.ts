import db from './database'

export async function getTechBlogList() {
  const result = await db.selectFrom('tech_blog').selectAll().execute()
  return result
}

export async function getTechBlogDetail(id: string) {
  const result = await db.selectFrom('tech_blog').selectAll().where('id', '=', Number(id)).execute()
  return result?.[0]
}

export async function setTechBlogById(id: string, title: string, content: string) {
  const result = await db.updateTable('tech_blog').set({ title, content, update_time: new Date() }).where('id', '=', Number(id)).execute()
  return result
}
